const digits = '0123456789ABCDEF';
const DECIMAL_PRECISION = 32;

/**
 * 根据输入的值和进制，将其转换为其他进制并更新到对应输入框中
 * @param {string} input - 用户输入的值
 * @param {number} fromBase - 输入值的进制
 */
function convertAll(input, fromBase) {
    if (input === '') {
        document.getElementById('bin').value = '';
        document.getElementById('oct').value = '';
        document.getElementById('dec').value = '';
        document.getElementById('hex').value = '';
        document.getElementById('bcd').value = ''; 
        return;
    }

    // 处理 BCD 输入
    if (fromBase === 11) {
        const decValue = bcdToDec(input);
        input = decValue;
        fromBase = 10;
    }

    const [integerPart, fractionalPart] = input.split('.');
    const haveDot = input.includes('.');

    // 使用字符串处理整数部分转换
    const binInt = integerConvertToBaseString(integerPart, fromBase, 2);
    const octInt = integerConvertToBaseString(integerPart, fromBase, 8);
    const decInt = integerConvertToBaseString(integerPart, fromBase, 10);
    const hexInt = integerConvertToBaseString(integerPart, fromBase, 16);
    const bcdInt = decToBCD(decInt); 

    // 使用字符串处理小数部分转换
    const binFrac = fractionalPart ? fractionalConvertToBaseString(fractionalPart, fromBase, 2) : '';
    const octFrac = fractionalPart ? fractionalConvertToBaseString(fractionalPart, fromBase, 8) : '';
    const decFrac = fractionalPart ? fractionalConvertToBaseString(fractionalPart, fromBase, 10) : '';
    const hexFrac = fractionalPart ? fractionalConvertToBaseString(fractionalPart, fromBase, 16) : '';
    const bcdFrac = fractionalPart ? decFractionToBCD(decFrac) : ''; 

    document.getElementById('bin').value = binInt + (haveDot ? '.' : '') + binFrac;
    document.getElementById('oct').value = octInt + (haveDot ? '.' : '') + octFrac;
    document.getElementById('dec').value = decInt + (haveDot ? '.' : '') + decFrac;
    document.getElementById('hex').value = hexInt + (haveDot ? '.' : '') + hexFrac;
    document.getElementById('bcd').value = bcdInt + (haveDot ? '.' : '') + bcdFrac; 
}

// 新增字符串处理的整数转换函数
function integerConvertToBaseString(valueStr, fromBase, toBase) {
    if (fromBase === toBase) return valueStr;
    if (valueStr === '0') return '0';
    
    // 先转换为十进制字符串作为中间结果
    let decStr = '0';
    
    for (let i = 0; i < valueStr.length; i++) {
        const digit = digits.indexOf(valueStr[i].toUpperCase());
        decStr = addStrings(multiplyStringByNumber(decStr, fromBase), digit.toString());
    }

    // 然后从十进制转换为目标进制
    return decToBaseString(decStr, toBase);
}

// 新增字符串处理的小数转换函数
function fractionalConvertToBaseString(fracStr, fromBase, toBase, precision = DECIMAL_PRECISION) {
    if (fromBase === toBase) return fracStr;
    if (fracStr === '') return '';
    
    // 先转换为十进制小数字符串
    let decFrac = convertFractionTodecString(fracStr, fromBase);
    
    // 然后从十进制小数转换为目标进制
    return decFractionToBaseString(decFrac, toBase, precision);
}

/**
 * 验证输入的内容，只保留合法的字符
 * @param {HTMLInputElement} inputElement - 输入框元素
 * @param {number} base - 输入值的进制
 */
function validateInput(inputElement, base) {
    let validChars;
    switch (base) {
        case 2:
            validChars = /[01.]/g;
            break;
        case 8:
            validChars = /[0-7.]/g;
            break;
        case 10:
            validChars = /[0-9.]/g;
            break;
        case 16:
            validChars = /[0-9a-fA-F.]/g;
            break;
        case 11: 
            validChars = /[01.]/g;
            break;
        default:
            return;
    }
    let inputValue = inputElement.value;
    let validValue = inputValue.match(validChars)?.join('') || '';
    inputElement.value = validValue;
}

// 将十进制字符串转为目标进制字符串
function decToBaseString(decStr, toBase) {
    if (decStr === '0') return '0';
    
    let result = '';
    let num = decStr;
    
    while (greaterThan(num, '0')) {
        const division = divideStringByNumber(num, toBase);
        const remainder = division.remainder;
        result = digits[remainder] + result;
        num = division.quotient;
    }
    
    return result;
}

// 将任意进制小数字符串转为十进制小数字符串
function convertFractionTodecString(fracStr, fromBase) {
    let result = '0';
    let basePower = fromBase;

    for (let i = 0; i < fracStr.length; i++) {
        const digit = digits.indexOf(fracStr[i].toUpperCase());
        const numerator = digit.toString();
        const denominator = basePower.toString();
        const fraction = divideFractionStrings(numerator, denominator);
        result = addFractionStrings(result, fraction);
        basePower *= fromBase;
    }

    // 处理结果可能出现的前导零
    result = result.replace(/^0+/, '');
    return result === '' ? '0' : result;
}

// 将十进制小数字符串转为目标进制小数字符串
function decFractionToBaseString(decFrac, toBase, precision = DECIMAL_PRECISION) {
    let result = '';
    let fraction = parseFloat('0.' + decFrac);

    for (let i = 0; i < precision && fraction > 0; i++) {
        fraction *= toBase;
        const digit = Math.floor(fraction);
        result += digits[digit];
        fraction -= digit;
    }

    return result;
}

// 字符串数字运算辅助函数
// 字符串加法
function addStrings(a, b) {
    let i = a.length - 1;
    let j = b.length - 1;
    let carry = 0;
    let result = '';
    
    while (i >= 0 || j >= 0 || carry > 0) {
        const digitA = i >= 0 ? parseInt(a[i--]) : 0;
        const digitB = j >= 0 ? parseInt(b[j--]) : 0;
        const sum = digitA + digitB + carry;
        result = (sum % 10) + result;
        carry = Math.floor(sum / 10);
    }
    
    return result;
}

// 字符串减法 (a >= b)
function subtractStrings(a, b) {
    if (a === b) return '0';
    
    let i = a.length - 1;
    let j = b.length - 1;
    let borrow = 0;
    let result = '';
    
    while (i >= 0) {
        const digitA = parseInt(a[i--]) - borrow;
        const digitB = j >= 0 ? parseInt(b[j--]) : 0;
        borrow = digitA < digitB ? 1 : 0;
        const diff = digitA + borrow * 10 - digitB;
        result = diff + result;
    }
    
    // 移除前导零
    return result.replace(/^0+/, '') || '0';
}

// 字符串乘以数字
function multiplyStringByNumber(str, num) {
    if (num === 0) return '0';
    if (num === 1) return str;
    
    let result = '0';
    for (let i = 0; i < num; i++) {
        result = addStrings(result, str);
    }
    return result;
}

// 字符串除以数字返回商和余数
function divideStringByNumber(str, num) {
    let quotient = '';
    let remainder = 0;
    
    for (let i = 0; i < str.length; i++) {
        const digit = parseInt(str[i]);
        const temp = remainder * 10 + digit;
        quotient += Math.floor(temp / num);
        remainder = temp % num;
    }
    
    // 移除前导零
    quotient = quotient.replace(/^0+/, '') || '0';
    return { quotient, remainder };
}

// 比较两个字符串数字大小 (a > b)
function greaterThan(a, b) {
    if (a.length !== b.length) {
        return a.length > b.length;
    }
    return a > b;
}

// 小数加法 (格式为 "0.xxx")
function addFractionStrings(a, b) {
    // 对齐小数位数
    const maxLength = Math.max(a.length, b.length);
    a = a.padEnd(maxLength, '0');
    b = b.padEnd(maxLength, '0');
    
    let carry = 0;
    let result = '';
    
    for (let i = maxLength - 1; i >= 0; i--) {
        const digitA = parseInt(a[i]) || 0;
        const digitB = parseInt(b[i]) || 0;
        const sum = digitA + digitB + carry;
        result = (sum % 10) + result;
        carry = Math.floor(sum / 10);
    }
    
    // 处理进位
    if (carry > 0) {
        result = carry + result;
    }
    
    return result;
}

// 小数除法 (a / b, 格式为 "0.xxx")
function divideFractionStrings(a, b) {
    let numerator = parseInt(a);
    const denominator = parseInt(b);
    let result = '0';
    
    if (denominator === 0) return '0';
    if (numerator === 0) return '0';
    
    // 转换为小数运算
    numerator *= 10;
    let precision = 8;
    
    while (precision-- > 0 && numerator > 0) {
        const digit = Math.floor(numerator / denominator);
        result += digit;
        numerator = (numerator % denominator) * 10;
    }
    
    return '0.' + result.substring(1);
}

// 十进制转 8421 BCD 码
function decToBCD(decStr) {
    let bcd = '';
    for (let i = 0; i < decStr.length; i++) {
        const digit = parseInt(decStr[i]);
        const bcdDigit = digit.toString(2).padStart(4, '0');
        bcd += bcdDigit;
    }
    return bcd;
}

// 十进制小数转 8421 BCD 码
function decFractionToBCD(decFrac) {
    let bcd = '';
    for (let i = 0; i < decFrac.length; i++) {
        const digit = parseInt(decFrac[i]);
        const bcdDigit = digit.toString(2).padStart(4, '0');
        bcd += bcdDigit;
    }
    return bcd;
}

// 新增：8421 BCD 码转换为十进制
function bcdToDec(bcdStr) {
    const [integerPart, fractionalPart] = bcdStr.split('.');
    let decInt = '';
    let decFrac = '';

    if (integerPart) {
        // 处理整数部分不足 4 位的情况，在前面补 0
        const paddedInt = integerPart.padStart(Math.ceil(integerPart.length / 4) * 4, '0');
        for (let i = 0; i < paddedInt.length; i += 4) {
            const bcdDigit = paddedInt.slice(i, i + 4);
            decInt += parseInt(bcdDigit, 2);
        }
    }

    if (fractionalPart) {
        // 处理小数部分不足 4 位的情况，在后面补 0
        const paddedFrac = fractionalPart.padEnd(Math.ceil(fractionalPart.length / 4) * 4, '0');
        for (let i = 0; i < paddedFrac.length; i += 4) {
            const bcdDigit = paddedFrac.slice(i, i + 4);
            decFrac += parseInt(bcdDigit, 2);
        }
    }

    return decInt + (fractionalPart? '.' + decFrac : '');
}