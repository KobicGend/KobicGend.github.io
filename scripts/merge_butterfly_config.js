/**
 * Hexo Configuration Merger Script
 * 功能：自动读取 custom_configs/ 下的所有 .yml 文件并深度合并到主题配置中。
 * Hexo 启动时，自动扫描并加载博客根目录下 scripts/ 文件夹内的所有 .js 文件。
 */

const fs = require('fs');              // 引入模块：内置的文件系统模块，用于读写文件
const path = require('path');          // 引入模块：内置的路径模块，用于处理文件路径
const yaml = require('js-yaml');       // 引入模块：js-yaml，用于解析 YAML 文件
const _ = require('lodash');           // 引入模块：一个极其常用的工具库（相当于 Python 的 itertools + functional tools 集合）。_ 是它的惯用变量名。

hexo.extend.filter.register('before_generate', function () {
  // 定义自定义配置文件的目录路径
  const configDir = path.join(hexo.base_dir, 'custom_configs');

  // 检查目录是否存在，不存在则直接跳过
  if (!fs.existsSync(configDir)) {
    return;
  }

  // 读取目录下所有文件
  const files = fs.readdirSync(configDir);
  
  // 遍历并合并配置
  files.forEach(file => {
    // 只处理 .yml 或 .yaml 文件
    if (path.extname(file) !== '.yml' && path.extname(file) !== '.yaml') {
      return;
    }

    const filePath = path.join(configDir, file);
    
    try {
      // 读取文件内容
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // 解析 YAML
      const fileConfig = yaml.load(fileContent);

      // 如果文件不为空，则进行深度合并 (Deep Merge)
      // 使用 lodash 的 merge 确保嵌套属性不会被暴力覆盖
      if (fileConfig) {
        hexo.theme.config = _.merge(hexo.theme.config, fileConfig);
        // 如果想在控制台看到加载日志，可以取消下面这行的注释
        // console.log(`[Config Merger] Loaded: ${file}`);
      }
    } catch (e) {
      console.error(`[Config Merger] Error parsing ${file}:`, e);
    }
  });
  return;
});