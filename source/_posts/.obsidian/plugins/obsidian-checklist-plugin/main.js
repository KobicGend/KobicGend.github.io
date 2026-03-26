'use strict';

var obsidian = require('obsidian');
var punycode = require('punycode');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var punycode__default = /*#__PURE__*/_interopDefaultLegacy(punycode);

const TODO_VIEW_TYPE = "todo";
const LOCAL_SORT_OPT = {
    numeric: true,
    ignorePunctuation: true,
};

const DEFAULT_SETTINGS = {
    todoPageName: "todo",
    showChecked: false,
    groupBy: "page",
    sortDirection: "old->new",
    ignoreFiles: "",
    includeFiles: "",
    lookAndFeel: "classic",
    _collapsedSections: [],
};
class TodoSettingTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        let { containerEl } = this;
        this.containerEl.empty();
        this.containerEl.createEl("h3", {
            text: "General Settings",
        });
        new obsidian.Setting(containerEl)
            .setName("Tag name")
            .setDesc("e.g. #todo. Leave empty to capture all")
            .addText((text) => text
            .setPlaceholder("todo")
            .setValue(this.plugin.getSettingValue("todoPageName"))
            .onChange(async (value) => {
            await this.plugin.updateSettings({ todoPageName: value });
        }));
        new obsidian.Setting(containerEl).setName("Show Completed?").addToggle((toggle) => {
            toggle.setValue(this.plugin.getSettingValue("showChecked"));
            toggle.onChange(async (value) => {
                await this.plugin.updateSettings({ showChecked: value });
            });
        });
        new obsidian.Setting(containerEl).setName("Group By").addDropdown((dropdown) => {
            dropdown.addOption("page", "Page");
            dropdown.addOption("tag", "Tag");
            dropdown.setValue(this.plugin.getSettingValue("groupBy"));
            dropdown.onChange(async (value) => {
                await this.plugin.updateSettings({ groupBy: value });
            });
        });
        new obsidian.Setting(containerEl).setName("Group Sort").addDropdown((dropdown) => {
            dropdown.addOption("new->old", "New -> Old");
            dropdown.addOption("old->new", "Old -> New");
            dropdown.addOption("a->z", "A -> Z");
            dropdown.addOption("z->a", "Z -> A");
            dropdown.setValue(this.plugin.getSettingValue("sortDirection"));
            dropdown.onChange(async (value) => {
                await this.plugin.updateSettings({ sortDirection: value });
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Ignore Files")
            .setDesc("Ignore files that contain this text anywhere in the filepath. (e.g. 'template' to ignore template.md and templates/file.md)")
            .addText((text) => text.setValue(this.plugin.getSettingValue("ignoreFiles")).onChange(async (value) => {
            await this.plugin.updateSettings({ ignoreFiles: value });
        }));
        new obsidian.Setting(containerEl)
            .setName("Include Files")
            .setDesc("Only search files whose path begins with this value (e.g. 'tasks' would search tasks/file.md and tasks_folder/file.md and not other_sub/file.md or file.md)")
            .addText((text) => text.setValue(this.plugin.getSettingValue("includeFiles")).onChange(async (value) => {
            await this.plugin.updateSettings({ includeFiles: value });
        }));
        new obsidian.Setting(containerEl).setName("Look and Feel").addDropdown((dropdown) => {
            dropdown.addOption("classic", "Classic");
            dropdown.addOption("compact", "Compact");
            dropdown.setValue(this.plugin.getSettingValue("lookAndFeel"));
            dropdown.onChange(async (value) => {
                await this.plugin.updateSettings({ lookAndFeel: value });
            });
        });
    }
}

function noop() { }
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function null_to_empty(value) {
    return value == null ? '' : value;
}

function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text$1(data) {
    return document.createTextNode(data);
}
function space() {
    return text$1(' ');
}
function empty$1() {
    return text$1('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function children(element) {
    return Array.from(element.childNodes);
}
function set_data(text, data) {
    data = '' + data;
    if (text.wholeText !== data)
        text.data = data;
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}

let current_component;
function set_current_component(component) {
    current_component = component;
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}
function create_component(block) {
    block && block.c();
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : options.context || []),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false
    };
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        flush();
    }
    set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var Aacute = "Á";
var aacute = "á";
var Abreve = "Ă";
var abreve = "ă";
var ac = "∾";
var acd = "∿";
var acE = "∾̳";
var Acirc = "Â";
var acirc = "â";
var acute = "´";
var Acy = "А";
var acy = "а";
var AElig = "Æ";
var aelig = "æ";
var af = "⁡";
var Afr = "𝔄";
var afr = "𝔞";
var Agrave = "À";
var agrave = "à";
var alefsym = "ℵ";
var aleph = "ℵ";
var Alpha = "Α";
var alpha = "α";
var Amacr = "Ā";
var amacr = "ā";
var amalg = "⨿";
var amp = "&";
var AMP = "&";
var andand = "⩕";
var And = "⩓";
var and = "∧";
var andd = "⩜";
var andslope = "⩘";
var andv = "⩚";
var ang = "∠";
var ange = "⦤";
var angle = "∠";
var angmsdaa = "⦨";
var angmsdab = "⦩";
var angmsdac = "⦪";
var angmsdad = "⦫";
var angmsdae = "⦬";
var angmsdaf = "⦭";
var angmsdag = "⦮";
var angmsdah = "⦯";
var angmsd = "∡";
var angrt = "∟";
var angrtvb = "⊾";
var angrtvbd = "⦝";
var angsph = "∢";
var angst = "Å";
var angzarr = "⍼";
var Aogon = "Ą";
var aogon = "ą";
var Aopf = "𝔸";
var aopf = "𝕒";
var apacir = "⩯";
var ap = "≈";
var apE = "⩰";
var ape = "≊";
var apid = "≋";
var apos = "'";
var ApplyFunction = "⁡";
var approx = "≈";
var approxeq = "≊";
var Aring = "Å";
var aring = "å";
var Ascr = "𝒜";
var ascr = "𝒶";
var Assign = "≔";
var ast = "*";
var asymp = "≈";
var asympeq = "≍";
var Atilde = "Ã";
var atilde = "ã";
var Auml = "Ä";
var auml = "ä";
var awconint = "∳";
var awint = "⨑";
var backcong = "≌";
var backepsilon = "϶";
var backprime = "‵";
var backsim = "∽";
var backsimeq = "⋍";
var Backslash = "∖";
var Barv = "⫧";
var barvee = "⊽";
var barwed = "⌅";
var Barwed = "⌆";
var barwedge = "⌅";
var bbrk = "⎵";
var bbrktbrk = "⎶";
var bcong = "≌";
var Bcy = "Б";
var bcy = "б";
var bdquo = "„";
var becaus = "∵";
var because = "∵";
var Because = "∵";
var bemptyv = "⦰";
var bepsi = "϶";
var bernou = "ℬ";
var Bernoullis = "ℬ";
var Beta = "Β";
var beta = "β";
var beth = "ℶ";
var between = "≬";
var Bfr = "𝔅";
var bfr = "𝔟";
var bigcap = "⋂";
var bigcirc = "◯";
var bigcup = "⋃";
var bigodot = "⨀";
var bigoplus = "⨁";
var bigotimes = "⨂";
var bigsqcup = "⨆";
var bigstar = "★";
var bigtriangledown = "▽";
var bigtriangleup = "△";
var biguplus = "⨄";
var bigvee = "⋁";
var bigwedge = "⋀";
var bkarow = "⤍";
var blacklozenge = "⧫";
var blacksquare = "▪";
var blacktriangle = "▴";
var blacktriangledown = "▾";
var blacktriangleleft = "◂";
var blacktriangleright = "▸";
var blank = "␣";
var blk12 = "▒";
var blk14 = "░";
var blk34 = "▓";
var block$1 = "█";
var bne = "=⃥";
var bnequiv = "≡⃥";
var bNot = "⫭";
var bnot = "⌐";
var Bopf = "𝔹";
var bopf = "𝕓";
var bot = "⊥";
var bottom = "⊥";
var bowtie = "⋈";
var boxbox = "⧉";
var boxdl = "┐";
var boxdL = "╕";
var boxDl = "╖";
var boxDL = "╗";
var boxdr = "┌";
var boxdR = "╒";
var boxDr = "╓";
var boxDR = "╔";
var boxh = "─";
var boxH = "═";
var boxhd = "┬";
var boxHd = "╤";
var boxhD = "╥";
var boxHD = "╦";
var boxhu = "┴";
var boxHu = "╧";
var boxhU = "╨";
var boxHU = "╩";
var boxminus = "⊟";
var boxplus = "⊞";
var boxtimes = "⊠";
var boxul = "┘";
var boxuL = "╛";
var boxUl = "╜";
var boxUL = "╝";
var boxur = "└";
var boxuR = "╘";
var boxUr = "╙";
var boxUR = "╚";
var boxv = "│";
var boxV = "║";
var boxvh = "┼";
var boxvH = "╪";
var boxVh = "╫";
var boxVH = "╬";
var boxvl = "┤";
var boxvL = "╡";
var boxVl = "╢";
var boxVL = "╣";
var boxvr = "├";
var boxvR = "╞";
var boxVr = "╟";
var boxVR = "╠";
var bprime = "‵";
var breve = "˘";
var Breve = "˘";
var brvbar = "¦";
var bscr = "𝒷";
var Bscr = "ℬ";
var bsemi = "⁏";
var bsim = "∽";
var bsime = "⋍";
var bsolb = "⧅";
var bsol = "\\";
var bsolhsub = "⟈";
var bull = "•";
var bullet = "•";
var bump = "≎";
var bumpE = "⪮";
var bumpe = "≏";
var Bumpeq = "≎";
var bumpeq = "≏";
var Cacute = "Ć";
var cacute = "ć";
var capand = "⩄";
var capbrcup = "⩉";
var capcap = "⩋";
var cap = "∩";
var Cap = "⋒";
var capcup = "⩇";
var capdot = "⩀";
var CapitalDifferentialD = "ⅅ";
var caps = "∩︀";
var caret = "⁁";
var caron = "ˇ";
var Cayleys = "ℭ";
var ccaps = "⩍";
var Ccaron = "Č";
var ccaron = "č";
var Ccedil = "Ç";
var ccedil = "ç";
var Ccirc = "Ĉ";
var ccirc = "ĉ";
var Cconint = "∰";
var ccups = "⩌";
var ccupssm = "⩐";
var Cdot = "Ċ";
var cdot = "ċ";
var cedil = "¸";
var Cedilla = "¸";
var cemptyv = "⦲";
var cent = "¢";
var centerdot = "·";
var CenterDot = "·";
var cfr = "𝔠";
var Cfr = "ℭ";
var CHcy = "Ч";
var chcy = "ч";
var check = "✓";
var checkmark = "✓";
var Chi = "Χ";
var chi = "χ";
var circ = "ˆ";
var circeq = "≗";
var circlearrowleft = "↺";
var circlearrowright = "↻";
var circledast = "⊛";
var circledcirc = "⊚";
var circleddash = "⊝";
var CircleDot = "⊙";
var circledR = "®";
var circledS = "Ⓢ";
var CircleMinus = "⊖";
var CirclePlus = "⊕";
var CircleTimes = "⊗";
var cir = "○";
var cirE = "⧃";
var cire = "≗";
var cirfnint = "⨐";
var cirmid = "⫯";
var cirscir = "⧂";
var ClockwiseContourIntegral = "∲";
var CloseCurlyDoubleQuote = "”";
var CloseCurlyQuote = "’";
var clubs = "♣";
var clubsuit = "♣";
var colon = ":";
var Colon = "∷";
var Colone = "⩴";
var colone = "≔";
var coloneq = "≔";
var comma = ",";
var commat = "@";
var comp = "∁";
var compfn = "∘";
var complement = "∁";
var complexes = "ℂ";
var cong = "≅";
var congdot = "⩭";
var Congruent = "≡";
var conint = "∮";
var Conint = "∯";
var ContourIntegral = "∮";
var copf = "𝕔";
var Copf = "ℂ";
var coprod = "∐";
var Coproduct = "∐";
var copy = "©";
var COPY = "©";
var copysr = "℗";
var CounterClockwiseContourIntegral = "∳";
var crarr = "↵";
var cross = "✗";
var Cross = "⨯";
var Cscr = "𝒞";
var cscr = "𝒸";
var csub = "⫏";
var csube = "⫑";
var csup = "⫐";
var csupe = "⫒";
var ctdot = "⋯";
var cudarrl = "⤸";
var cudarrr = "⤵";
var cuepr = "⋞";
var cuesc = "⋟";
var cularr = "↶";
var cularrp = "⤽";
var cupbrcap = "⩈";
var cupcap = "⩆";
var CupCap = "≍";
var cup = "∪";
var Cup = "⋓";
var cupcup = "⩊";
var cupdot = "⊍";
var cupor = "⩅";
var cups = "∪︀";
var curarr = "↷";
var curarrm = "⤼";
var curlyeqprec = "⋞";
var curlyeqsucc = "⋟";
var curlyvee = "⋎";
var curlywedge = "⋏";
var curren = "¤";
var curvearrowleft = "↶";
var curvearrowright = "↷";
var cuvee = "⋎";
var cuwed = "⋏";
var cwconint = "∲";
var cwint = "∱";
var cylcty = "⌭";
var dagger = "†";
var Dagger = "‡";
var daleth = "ℸ";
var darr = "↓";
var Darr = "↡";
var dArr = "⇓";
var dash = "‐";
var Dashv = "⫤";
var dashv = "⊣";
var dbkarow = "⤏";
var dblac = "˝";
var Dcaron = "Ď";
var dcaron = "ď";
var Dcy = "Д";
var dcy = "д";
var ddagger = "‡";
var ddarr = "⇊";
var DD = "ⅅ";
var dd = "ⅆ";
var DDotrahd = "⤑";
var ddotseq = "⩷";
var deg = "°";
var Del = "∇";
var Delta = "Δ";
var delta = "δ";
var demptyv = "⦱";
var dfisht = "⥿";
var Dfr = "𝔇";
var dfr = "𝔡";
var dHar = "⥥";
var dharl = "⇃";
var dharr = "⇂";
var DiacriticalAcute = "´";
var DiacriticalDot = "˙";
var DiacriticalDoubleAcute = "˝";
var DiacriticalGrave = "`";
var DiacriticalTilde = "˜";
var diam = "⋄";
var diamond = "⋄";
var Diamond = "⋄";
var diamondsuit = "♦";
var diams = "♦";
var die = "¨";
var DifferentialD = "ⅆ";
var digamma = "ϝ";
var disin = "⋲";
var div = "÷";
var divide = "÷";
var divideontimes = "⋇";
var divonx = "⋇";
var DJcy = "Ђ";
var djcy = "ђ";
var dlcorn = "⌞";
var dlcrop = "⌍";
var dollar = "$";
var Dopf = "𝔻";
var dopf = "𝕕";
var Dot = "¨";
var dot = "˙";
var DotDot = "⃜";
var doteq = "≐";
var doteqdot = "≑";
var DotEqual = "≐";
var dotminus = "∸";
var dotplus = "∔";
var dotsquare = "⊡";
var doublebarwedge = "⌆";
var DoubleContourIntegral = "∯";
var DoubleDot = "¨";
var DoubleDownArrow = "⇓";
var DoubleLeftArrow = "⇐";
var DoubleLeftRightArrow = "⇔";
var DoubleLeftTee = "⫤";
var DoubleLongLeftArrow = "⟸";
var DoubleLongLeftRightArrow = "⟺";
var DoubleLongRightArrow = "⟹";
var DoubleRightArrow = "⇒";
var DoubleRightTee = "⊨";
var DoubleUpArrow = "⇑";
var DoubleUpDownArrow = "⇕";
var DoubleVerticalBar = "∥";
var DownArrowBar = "⤓";
var downarrow = "↓";
var DownArrow = "↓";
var Downarrow = "⇓";
var DownArrowUpArrow = "⇵";
var DownBreve = "̑";
var downdownarrows = "⇊";
var downharpoonleft = "⇃";
var downharpoonright = "⇂";
var DownLeftRightVector = "⥐";
var DownLeftTeeVector = "⥞";
var DownLeftVectorBar = "⥖";
var DownLeftVector = "↽";
var DownRightTeeVector = "⥟";
var DownRightVectorBar = "⥗";
var DownRightVector = "⇁";
var DownTeeArrow = "↧";
var DownTee = "⊤";
var drbkarow = "⤐";
var drcorn = "⌟";
var drcrop = "⌌";
var Dscr = "𝒟";
var dscr = "𝒹";
var DScy = "Ѕ";
var dscy = "ѕ";
var dsol = "⧶";
var Dstrok = "Đ";
var dstrok = "đ";
var dtdot = "⋱";
var dtri = "▿";
var dtrif = "▾";
var duarr = "⇵";
var duhar = "⥯";
var dwangle = "⦦";
var DZcy = "Џ";
var dzcy = "џ";
var dzigrarr = "⟿";
var Eacute = "É";
var eacute = "é";
var easter = "⩮";
var Ecaron = "Ě";
var ecaron = "ě";
var Ecirc = "Ê";
var ecirc = "ê";
var ecir = "≖";
var ecolon = "≕";
var Ecy = "Э";
var ecy = "э";
var eDDot = "⩷";
var Edot = "Ė";
var edot = "ė";
var eDot = "≑";
var ee = "ⅇ";
var efDot = "≒";
var Efr = "𝔈";
var efr = "𝔢";
var eg = "⪚";
var Egrave = "È";
var egrave = "è";
var egs = "⪖";
var egsdot = "⪘";
var el = "⪙";
var Element = "∈";
var elinters = "⏧";
var ell = "ℓ";
var els = "⪕";
var elsdot = "⪗";
var Emacr = "Ē";
var emacr = "ē";
var empty = "∅";
var emptyset = "∅";
var EmptySmallSquare = "◻";
var emptyv = "∅";
var EmptyVerySmallSquare = "▫";
var emsp13 = " ";
var emsp14 = " ";
var emsp = " ";
var ENG = "Ŋ";
var eng = "ŋ";
var ensp = " ";
var Eogon = "Ę";
var eogon = "ę";
var Eopf = "𝔼";
var eopf = "𝕖";
var epar = "⋕";
var eparsl = "⧣";
var eplus = "⩱";
var epsi = "ε";
var Epsilon = "Ε";
var epsilon = "ε";
var epsiv = "ϵ";
var eqcirc = "≖";
var eqcolon = "≕";
var eqsim = "≂";
var eqslantgtr = "⪖";
var eqslantless = "⪕";
var Equal = "⩵";
var equals = "=";
var EqualTilde = "≂";
var equest = "≟";
var Equilibrium = "⇌";
var equiv = "≡";
var equivDD = "⩸";
var eqvparsl = "⧥";
var erarr = "⥱";
var erDot = "≓";
var escr = "ℯ";
var Escr = "ℰ";
var esdot = "≐";
var Esim = "⩳";
var esim = "≂";
var Eta = "Η";
var eta = "η";
var ETH = "Ð";
var eth = "ð";
var Euml = "Ë";
var euml = "ë";
var euro = "€";
var excl = "!";
var exist = "∃";
var Exists = "∃";
var expectation = "ℰ";
var exponentiale = "ⅇ";
var ExponentialE = "ⅇ";
var fallingdotseq = "≒";
var Fcy = "Ф";
var fcy = "ф";
var female = "♀";
var ffilig = "ﬃ";
var fflig = "ﬀ";
var ffllig = "ﬄ";
var Ffr = "𝔉";
var ffr = "𝔣";
var filig = "ﬁ";
var FilledSmallSquare = "◼";
var FilledVerySmallSquare = "▪";
var fjlig = "fj";
var flat = "♭";
var fllig = "ﬂ";
var fltns = "▱";
var fnof = "ƒ";
var Fopf = "𝔽";
var fopf = "𝕗";
var forall = "∀";
var ForAll = "∀";
var fork = "⋔";
var forkv = "⫙";
var Fouriertrf = "ℱ";
var fpartint = "⨍";
var frac12 = "½";
var frac13 = "⅓";
var frac14 = "¼";
var frac15 = "⅕";
var frac16 = "⅙";
var frac18 = "⅛";
var frac23 = "⅔";
var frac25 = "⅖";
var frac34 = "¾";
var frac35 = "⅗";
var frac38 = "⅜";
var frac45 = "⅘";
var frac56 = "⅚";
var frac58 = "⅝";
var frac78 = "⅞";
var frasl = "⁄";
var frown = "⌢";
var fscr = "𝒻";
var Fscr = "ℱ";
var gacute = "ǵ";
var Gamma = "Γ";
var gamma = "γ";
var Gammad = "Ϝ";
var gammad = "ϝ";
var gap = "⪆";
var Gbreve = "Ğ";
var gbreve = "ğ";
var Gcedil = "Ģ";
var Gcirc = "Ĝ";
var gcirc = "ĝ";
var Gcy = "Г";
var gcy = "г";
var Gdot = "Ġ";
var gdot = "ġ";
var ge = "≥";
var gE = "≧";
var gEl = "⪌";
var gel = "⋛";
var geq = "≥";
var geqq = "≧";
var geqslant = "⩾";
var gescc = "⪩";
var ges = "⩾";
var gesdot = "⪀";
var gesdoto = "⪂";
var gesdotol = "⪄";
var gesl = "⋛︀";
var gesles = "⪔";
var Gfr = "𝔊";
var gfr = "𝔤";
var gg = "≫";
var Gg = "⋙";
var ggg = "⋙";
var gimel = "ℷ";
var GJcy = "Ѓ";
var gjcy = "ѓ";
var gla = "⪥";
var gl = "≷";
var glE = "⪒";
var glj = "⪤";
var gnap = "⪊";
var gnapprox = "⪊";
var gne = "⪈";
var gnE = "≩";
var gneq = "⪈";
var gneqq = "≩";
var gnsim = "⋧";
var Gopf = "𝔾";
var gopf = "𝕘";
var grave = "`";
var GreaterEqual = "≥";
var GreaterEqualLess = "⋛";
var GreaterFullEqual = "≧";
var GreaterGreater = "⪢";
var GreaterLess = "≷";
var GreaterSlantEqual = "⩾";
var GreaterTilde = "≳";
var Gscr = "𝒢";
var gscr = "ℊ";
var gsim = "≳";
var gsime = "⪎";
var gsiml = "⪐";
var gtcc = "⪧";
var gtcir = "⩺";
var gt = ">";
var GT = ">";
var Gt = "≫";
var gtdot = "⋗";
var gtlPar = "⦕";
var gtquest = "⩼";
var gtrapprox = "⪆";
var gtrarr = "⥸";
var gtrdot = "⋗";
var gtreqless = "⋛";
var gtreqqless = "⪌";
var gtrless = "≷";
var gtrsim = "≳";
var gvertneqq = "≩︀";
var gvnE = "≩︀";
var Hacek = "ˇ";
var hairsp = " ";
var half = "½";
var hamilt = "ℋ";
var HARDcy = "Ъ";
var hardcy = "ъ";
var harrcir = "⥈";
var harr = "↔";
var hArr = "⇔";
var harrw = "↭";
var Hat = "^";
var hbar = "ℏ";
var Hcirc = "Ĥ";
var hcirc = "ĥ";
var hearts = "♥";
var heartsuit = "♥";
var hellip = "…";
var hercon = "⊹";
var hfr = "𝔥";
var Hfr = "ℌ";
var HilbertSpace = "ℋ";
var hksearow = "⤥";
var hkswarow = "⤦";
var hoarr = "⇿";
var homtht = "∻";
var hookleftarrow = "↩";
var hookrightarrow = "↪";
var hopf = "𝕙";
var Hopf = "ℍ";
var horbar = "―";
var HorizontalLine = "─";
var hscr = "𝒽";
var Hscr = "ℋ";
var hslash = "ℏ";
var Hstrok = "Ħ";
var hstrok = "ħ";
var HumpDownHump = "≎";
var HumpEqual = "≏";
var hybull = "⁃";
var hyphen = "‐";
var Iacute = "Í";
var iacute = "í";
var ic = "⁣";
var Icirc = "Î";
var icirc = "î";
var Icy = "И";
var icy = "и";
var Idot = "İ";
var IEcy = "Е";
var iecy = "е";
var iexcl = "¡";
var iff = "⇔";
var ifr = "𝔦";
var Ifr = "ℑ";
var Igrave = "Ì";
var igrave = "ì";
var ii = "ⅈ";
var iiiint = "⨌";
var iiint = "∭";
var iinfin = "⧜";
var iiota = "℩";
var IJlig = "Ĳ";
var ijlig = "ĳ";
var Imacr = "Ī";
var imacr = "ī";
var image$1 = "ℑ";
var ImaginaryI = "ⅈ";
var imagline = "ℐ";
var imagpart = "ℑ";
var imath = "ı";
var Im = "ℑ";
var imof = "⊷";
var imped = "Ƶ";
var Implies = "⇒";
var incare = "℅";
var infin = "∞";
var infintie = "⧝";
var inodot = "ı";
var intcal = "⊺";
var int = "∫";
var Int = "∬";
var integers = "ℤ";
var Integral = "∫";
var intercal = "⊺";
var Intersection = "⋂";
var intlarhk = "⨗";
var intprod = "⨼";
var InvisibleComma = "⁣";
var InvisibleTimes = "⁢";
var IOcy = "Ё";
var iocy = "ё";
var Iogon = "Į";
var iogon = "į";
var Iopf = "𝕀";
var iopf = "𝕚";
var Iota = "Ι";
var iota = "ι";
var iprod = "⨼";
var iquest = "¿";
var iscr = "𝒾";
var Iscr = "ℐ";
var isin = "∈";
var isindot = "⋵";
var isinE = "⋹";
var isins = "⋴";
var isinsv = "⋳";
var isinv = "∈";
var it = "⁢";
var Itilde = "Ĩ";
var itilde = "ĩ";
var Iukcy = "І";
var iukcy = "і";
var Iuml = "Ï";
var iuml = "ï";
var Jcirc = "Ĵ";
var jcirc = "ĵ";
var Jcy = "Й";
var jcy = "й";
var Jfr = "𝔍";
var jfr = "𝔧";
var jmath = "ȷ";
var Jopf = "𝕁";
var jopf = "𝕛";
var Jscr = "𝒥";
var jscr = "𝒿";
var Jsercy = "Ј";
var jsercy = "ј";
var Jukcy = "Є";
var jukcy = "є";
var Kappa = "Κ";
var kappa = "κ";
var kappav = "ϰ";
var Kcedil = "Ķ";
var kcedil = "ķ";
var Kcy = "К";
var kcy = "к";
var Kfr = "𝔎";
var kfr = "𝔨";
var kgreen = "ĸ";
var KHcy = "Х";
var khcy = "х";
var KJcy = "Ќ";
var kjcy = "ќ";
var Kopf = "𝕂";
var kopf = "𝕜";
var Kscr = "𝒦";
var kscr = "𝓀";
var lAarr = "⇚";
var Lacute = "Ĺ";
var lacute = "ĺ";
var laemptyv = "⦴";
var lagran = "ℒ";
var Lambda = "Λ";
var lambda = "λ";
var lang = "⟨";
var Lang = "⟪";
var langd = "⦑";
var langle = "⟨";
var lap = "⪅";
var Laplacetrf = "ℒ";
var laquo = "«";
var larrb = "⇤";
var larrbfs = "⤟";
var larr = "←";
var Larr = "↞";
var lArr = "⇐";
var larrfs = "⤝";
var larrhk = "↩";
var larrlp = "↫";
var larrpl = "⤹";
var larrsim = "⥳";
var larrtl = "↢";
var latail = "⤙";
var lAtail = "⤛";
var lat = "⪫";
var late = "⪭";
var lates = "⪭︀";
var lbarr = "⤌";
var lBarr = "⤎";
var lbbrk = "❲";
var lbrace = "{";
var lbrack = "[";
var lbrke = "⦋";
var lbrksld = "⦏";
var lbrkslu = "⦍";
var Lcaron = "Ľ";
var lcaron = "ľ";
var Lcedil = "Ļ";
var lcedil = "ļ";
var lceil = "⌈";
var lcub = "{";
var Lcy = "Л";
var lcy = "л";
var ldca = "⤶";
var ldquo = "“";
var ldquor = "„";
var ldrdhar = "⥧";
var ldrushar = "⥋";
var ldsh = "↲";
var le = "≤";
var lE = "≦";
var LeftAngleBracket = "⟨";
var LeftArrowBar = "⇤";
var leftarrow = "←";
var LeftArrow = "←";
var Leftarrow = "⇐";
var LeftArrowRightArrow = "⇆";
var leftarrowtail = "↢";
var LeftCeiling = "⌈";
var LeftDoubleBracket = "⟦";
var LeftDownTeeVector = "⥡";
var LeftDownVectorBar = "⥙";
var LeftDownVector = "⇃";
var LeftFloor = "⌊";
var leftharpoondown = "↽";
var leftharpoonup = "↼";
var leftleftarrows = "⇇";
var leftrightarrow = "↔";
var LeftRightArrow = "↔";
var Leftrightarrow = "⇔";
var leftrightarrows = "⇆";
var leftrightharpoons = "⇋";
var leftrightsquigarrow = "↭";
var LeftRightVector = "⥎";
var LeftTeeArrow = "↤";
var LeftTee = "⊣";
var LeftTeeVector = "⥚";
var leftthreetimes = "⋋";
var LeftTriangleBar = "⧏";
var LeftTriangle = "⊲";
var LeftTriangleEqual = "⊴";
var LeftUpDownVector = "⥑";
var LeftUpTeeVector = "⥠";
var LeftUpVectorBar = "⥘";
var LeftUpVector = "↿";
var LeftVectorBar = "⥒";
var LeftVector = "↼";
var lEg = "⪋";
var leg = "⋚";
var leq = "≤";
var leqq = "≦";
var leqslant = "⩽";
var lescc = "⪨";
var les = "⩽";
var lesdot = "⩿";
var lesdoto = "⪁";
var lesdotor = "⪃";
var lesg = "⋚︀";
var lesges = "⪓";
var lessapprox = "⪅";
var lessdot = "⋖";
var lesseqgtr = "⋚";
var lesseqqgtr = "⪋";
var LessEqualGreater = "⋚";
var LessFullEqual = "≦";
var LessGreater = "≶";
var lessgtr = "≶";
var LessLess = "⪡";
var lesssim = "≲";
var LessSlantEqual = "⩽";
var LessTilde = "≲";
var lfisht = "⥼";
var lfloor = "⌊";
var Lfr = "𝔏";
var lfr = "𝔩";
var lg = "≶";
var lgE = "⪑";
var lHar = "⥢";
var lhard = "↽";
var lharu = "↼";
var lharul = "⥪";
var lhblk = "▄";
var LJcy = "Љ";
var ljcy = "љ";
var llarr = "⇇";
var ll = "≪";
var Ll = "⋘";
var llcorner = "⌞";
var Lleftarrow = "⇚";
var llhard = "⥫";
var lltri = "◺";
var Lmidot = "Ŀ";
var lmidot = "ŀ";
var lmoustache = "⎰";
var lmoust = "⎰";
var lnap = "⪉";
var lnapprox = "⪉";
var lne = "⪇";
var lnE = "≨";
var lneq = "⪇";
var lneqq = "≨";
var lnsim = "⋦";
var loang = "⟬";
var loarr = "⇽";
var lobrk = "⟦";
var longleftarrow = "⟵";
var LongLeftArrow = "⟵";
var Longleftarrow = "⟸";
var longleftrightarrow = "⟷";
var LongLeftRightArrow = "⟷";
var Longleftrightarrow = "⟺";
var longmapsto = "⟼";
var longrightarrow = "⟶";
var LongRightArrow = "⟶";
var Longrightarrow = "⟹";
var looparrowleft = "↫";
var looparrowright = "↬";
var lopar = "⦅";
var Lopf = "𝕃";
var lopf = "𝕝";
var loplus = "⨭";
var lotimes = "⨴";
var lowast = "∗";
var lowbar = "_";
var LowerLeftArrow = "↙";
var LowerRightArrow = "↘";
var loz = "◊";
var lozenge = "◊";
var lozf = "⧫";
var lpar = "(";
var lparlt = "⦓";
var lrarr = "⇆";
var lrcorner = "⌟";
var lrhar = "⇋";
var lrhard = "⥭";
var lrm = "‎";
var lrtri = "⊿";
var lsaquo = "‹";
var lscr = "𝓁";
var Lscr = "ℒ";
var lsh = "↰";
var Lsh = "↰";
var lsim = "≲";
var lsime = "⪍";
var lsimg = "⪏";
var lsqb = "[";
var lsquo = "‘";
var lsquor = "‚";
var Lstrok = "Ł";
var lstrok = "ł";
var ltcc = "⪦";
var ltcir = "⩹";
var lt = "<";
var LT = "<";
var Lt = "≪";
var ltdot = "⋖";
var lthree = "⋋";
var ltimes = "⋉";
var ltlarr = "⥶";
var ltquest = "⩻";
var ltri = "◃";
var ltrie = "⊴";
var ltrif = "◂";
var ltrPar = "⦖";
var lurdshar = "⥊";
var luruhar = "⥦";
var lvertneqq = "≨︀";
var lvnE = "≨︀";
var macr = "¯";
var male = "♂";
var malt = "✠";
var maltese = "✠";
var map = "↦";
var mapsto = "↦";
var mapstodown = "↧";
var mapstoleft = "↤";
var mapstoup = "↥";
var marker = "▮";
var mcomma = "⨩";
var Mcy = "М";
var mcy = "м";
var mdash = "—";
var mDDot = "∺";
var measuredangle = "∡";
var MediumSpace = " ";
var Mellintrf = "ℳ";
var Mfr = "𝔐";
var mfr = "𝔪";
var mho = "℧";
var micro = "µ";
var midast = "*";
var midcir = "⫰";
var mid = "∣";
var middot = "·";
var minusb = "⊟";
var minus = "−";
var minusd = "∸";
var minusdu = "⨪";
var MinusPlus = "∓";
var mlcp = "⫛";
var mldr = "…";
var mnplus = "∓";
var models = "⊧";
var Mopf = "𝕄";
var mopf = "𝕞";
var mp = "∓";
var mscr = "𝓂";
var Mscr = "ℳ";
var mstpos = "∾";
var Mu = "Μ";
var mu = "μ";
var multimap = "⊸";
var mumap = "⊸";
var nabla = "∇";
var Nacute = "Ń";
var nacute = "ń";
var nang = "∠⃒";
var nap = "≉";
var napE = "⩰̸";
var napid = "≋̸";
var napos = "ŉ";
var napprox = "≉";
var natural = "♮";
var naturals = "ℕ";
var natur = "♮";
var nbsp = " ";
var nbump = "≎̸";
var nbumpe = "≏̸";
var ncap = "⩃";
var Ncaron = "Ň";
var ncaron = "ň";
var Ncedil = "Ņ";
var ncedil = "ņ";
var ncong = "≇";
var ncongdot = "⩭̸";
var ncup = "⩂";
var Ncy = "Н";
var ncy = "н";
var ndash = "–";
var nearhk = "⤤";
var nearr = "↗";
var neArr = "⇗";
var nearrow = "↗";
var ne = "≠";
var nedot = "≐̸";
var NegativeMediumSpace = "​";
var NegativeThickSpace = "​";
var NegativeThinSpace = "​";
var NegativeVeryThinSpace = "​";
var nequiv = "≢";
var nesear = "⤨";
var nesim = "≂̸";
var NestedGreaterGreater = "≫";
var NestedLessLess = "≪";
var NewLine = "\n";
var nexist = "∄";
var nexists = "∄";
var Nfr = "𝔑";
var nfr = "𝔫";
var ngE = "≧̸";
var nge = "≱";
var ngeq = "≱";
var ngeqq = "≧̸";
var ngeqslant = "⩾̸";
var nges = "⩾̸";
var nGg = "⋙̸";
var ngsim = "≵";
var nGt = "≫⃒";
var ngt = "≯";
var ngtr = "≯";
var nGtv = "≫̸";
var nharr = "↮";
var nhArr = "⇎";
var nhpar = "⫲";
var ni = "∋";
var nis = "⋼";
var nisd = "⋺";
var niv = "∋";
var NJcy = "Њ";
var njcy = "њ";
var nlarr = "↚";
var nlArr = "⇍";
var nldr = "‥";
var nlE = "≦̸";
var nle = "≰";
var nleftarrow = "↚";
var nLeftarrow = "⇍";
var nleftrightarrow = "↮";
var nLeftrightarrow = "⇎";
var nleq = "≰";
var nleqq = "≦̸";
var nleqslant = "⩽̸";
var nles = "⩽̸";
var nless = "≮";
var nLl = "⋘̸";
var nlsim = "≴";
var nLt = "≪⃒";
var nlt = "≮";
var nltri = "⋪";
var nltrie = "⋬";
var nLtv = "≪̸";
var nmid = "∤";
var NoBreak = "⁠";
var NonBreakingSpace = " ";
var nopf = "𝕟";
var Nopf = "ℕ";
var Not = "⫬";
var not = "¬";
var NotCongruent = "≢";
var NotCupCap = "≭";
var NotDoubleVerticalBar = "∦";
var NotElement = "∉";
var NotEqual = "≠";
var NotEqualTilde = "≂̸";
var NotExists = "∄";
var NotGreater = "≯";
var NotGreaterEqual = "≱";
var NotGreaterFullEqual = "≧̸";
var NotGreaterGreater = "≫̸";
var NotGreaterLess = "≹";
var NotGreaterSlantEqual = "⩾̸";
var NotGreaterTilde = "≵";
var NotHumpDownHump = "≎̸";
var NotHumpEqual = "≏̸";
var notin = "∉";
var notindot = "⋵̸";
var notinE = "⋹̸";
var notinva = "∉";
var notinvb = "⋷";
var notinvc = "⋶";
var NotLeftTriangleBar = "⧏̸";
var NotLeftTriangle = "⋪";
var NotLeftTriangleEqual = "⋬";
var NotLess = "≮";
var NotLessEqual = "≰";
var NotLessGreater = "≸";
var NotLessLess = "≪̸";
var NotLessSlantEqual = "⩽̸";
var NotLessTilde = "≴";
var NotNestedGreaterGreater = "⪢̸";
var NotNestedLessLess = "⪡̸";
var notni = "∌";
var notniva = "∌";
var notnivb = "⋾";
var notnivc = "⋽";
var NotPrecedes = "⊀";
var NotPrecedesEqual = "⪯̸";
var NotPrecedesSlantEqual = "⋠";
var NotReverseElement = "∌";
var NotRightTriangleBar = "⧐̸";
var NotRightTriangle = "⋫";
var NotRightTriangleEqual = "⋭";
var NotSquareSubset = "⊏̸";
var NotSquareSubsetEqual = "⋢";
var NotSquareSuperset = "⊐̸";
var NotSquareSupersetEqual = "⋣";
var NotSubset = "⊂⃒";
var NotSubsetEqual = "⊈";
var NotSucceeds = "⊁";
var NotSucceedsEqual = "⪰̸";
var NotSucceedsSlantEqual = "⋡";
var NotSucceedsTilde = "≿̸";
var NotSuperset = "⊃⃒";
var NotSupersetEqual = "⊉";
var NotTilde = "≁";
var NotTildeEqual = "≄";
var NotTildeFullEqual = "≇";
var NotTildeTilde = "≉";
var NotVerticalBar = "∤";
var nparallel = "∦";
var npar = "∦";
var nparsl = "⫽⃥";
var npart = "∂̸";
var npolint = "⨔";
var npr = "⊀";
var nprcue = "⋠";
var nprec = "⊀";
var npreceq = "⪯̸";
var npre = "⪯̸";
var nrarrc = "⤳̸";
var nrarr = "↛";
var nrArr = "⇏";
var nrarrw = "↝̸";
var nrightarrow = "↛";
var nRightarrow = "⇏";
var nrtri = "⋫";
var nrtrie = "⋭";
var nsc = "⊁";
var nsccue = "⋡";
var nsce = "⪰̸";
var Nscr = "𝒩";
var nscr = "𝓃";
var nshortmid = "∤";
var nshortparallel = "∦";
var nsim = "≁";
var nsime = "≄";
var nsimeq = "≄";
var nsmid = "∤";
var nspar = "∦";
var nsqsube = "⋢";
var nsqsupe = "⋣";
var nsub = "⊄";
var nsubE = "⫅̸";
var nsube = "⊈";
var nsubset = "⊂⃒";
var nsubseteq = "⊈";
var nsubseteqq = "⫅̸";
var nsucc = "⊁";
var nsucceq = "⪰̸";
var nsup = "⊅";
var nsupE = "⫆̸";
var nsupe = "⊉";
var nsupset = "⊃⃒";
var nsupseteq = "⊉";
var nsupseteqq = "⫆̸";
var ntgl = "≹";
var Ntilde = "Ñ";
var ntilde = "ñ";
var ntlg = "≸";
var ntriangleleft = "⋪";
var ntrianglelefteq = "⋬";
var ntriangleright = "⋫";
var ntrianglerighteq = "⋭";
var Nu = "Ν";
var nu = "ν";
var num = "#";
var numero = "№";
var numsp = " ";
var nvap = "≍⃒";
var nvdash = "⊬";
var nvDash = "⊭";
var nVdash = "⊮";
var nVDash = "⊯";
var nvge = "≥⃒";
var nvgt = ">⃒";
var nvHarr = "⤄";
var nvinfin = "⧞";
var nvlArr = "⤂";
var nvle = "≤⃒";
var nvlt = "<⃒";
var nvltrie = "⊴⃒";
var nvrArr = "⤃";
var nvrtrie = "⊵⃒";
var nvsim = "∼⃒";
var nwarhk = "⤣";
var nwarr = "↖";
var nwArr = "⇖";
var nwarrow = "↖";
var nwnear = "⤧";
var Oacute = "Ó";
var oacute = "ó";
var oast = "⊛";
var Ocirc = "Ô";
var ocirc = "ô";
var ocir = "⊚";
var Ocy = "О";
var ocy = "о";
var odash = "⊝";
var Odblac = "Ő";
var odblac = "ő";
var odiv = "⨸";
var odot = "⊙";
var odsold = "⦼";
var OElig = "Œ";
var oelig = "œ";
var ofcir = "⦿";
var Ofr = "𝔒";
var ofr = "𝔬";
var ogon = "˛";
var Ograve = "Ò";
var ograve = "ò";
var ogt = "⧁";
var ohbar = "⦵";
var ohm = "Ω";
var oint = "∮";
var olarr = "↺";
var olcir = "⦾";
var olcross = "⦻";
var oline = "‾";
var olt = "⧀";
var Omacr = "Ō";
var omacr = "ō";
var Omega = "Ω";
var omega = "ω";
var Omicron = "Ο";
var omicron = "ο";
var omid = "⦶";
var ominus = "⊖";
var Oopf = "𝕆";
var oopf = "𝕠";
var opar = "⦷";
var OpenCurlyDoubleQuote = "“";
var OpenCurlyQuote = "‘";
var operp = "⦹";
var oplus = "⊕";
var orarr = "↻";
var Or = "⩔";
var or = "∨";
var ord = "⩝";
var order = "ℴ";
var orderof = "ℴ";
var ordf = "ª";
var ordm = "º";
var origof = "⊶";
var oror = "⩖";
var orslope = "⩗";
var orv = "⩛";
var oS = "Ⓢ";
var Oscr = "𝒪";
var oscr = "ℴ";
var Oslash = "Ø";
var oslash = "ø";
var osol = "⊘";
var Otilde = "Õ";
var otilde = "õ";
var otimesas = "⨶";
var Otimes = "⨷";
var otimes = "⊗";
var Ouml = "Ö";
var ouml = "ö";
var ovbar = "⌽";
var OverBar = "‾";
var OverBrace = "⏞";
var OverBracket = "⎴";
var OverParenthesis = "⏜";
var para = "¶";
var parallel = "∥";
var par = "∥";
var parsim = "⫳";
var parsl = "⫽";
var part = "∂";
var PartialD = "∂";
var Pcy = "П";
var pcy = "п";
var percnt = "%";
var period = ".";
var permil = "‰";
var perp = "⊥";
var pertenk = "‱";
var Pfr = "𝔓";
var pfr = "𝔭";
var Phi = "Φ";
var phi = "φ";
var phiv = "ϕ";
var phmmat = "ℳ";
var phone = "☎";
var Pi = "Π";
var pi = "π";
var pitchfork = "⋔";
var piv = "ϖ";
var planck = "ℏ";
var planckh = "ℎ";
var plankv = "ℏ";
var plusacir = "⨣";
var plusb = "⊞";
var pluscir = "⨢";
var plus = "+";
var plusdo = "∔";
var plusdu = "⨥";
var pluse = "⩲";
var PlusMinus = "±";
var plusmn = "±";
var plussim = "⨦";
var plustwo = "⨧";
var pm = "±";
var Poincareplane = "ℌ";
var pointint = "⨕";
var popf = "𝕡";
var Popf = "ℙ";
var pound = "£";
var prap = "⪷";
var Pr = "⪻";
var pr = "≺";
var prcue = "≼";
var precapprox = "⪷";
var prec = "≺";
var preccurlyeq = "≼";
var Precedes = "≺";
var PrecedesEqual = "⪯";
var PrecedesSlantEqual = "≼";
var PrecedesTilde = "≾";
var preceq = "⪯";
var precnapprox = "⪹";
var precneqq = "⪵";
var precnsim = "⋨";
var pre = "⪯";
var prE = "⪳";
var precsim = "≾";
var prime = "′";
var Prime = "″";
var primes = "ℙ";
var prnap = "⪹";
var prnE = "⪵";
var prnsim = "⋨";
var prod = "∏";
var Product = "∏";
var profalar = "⌮";
var profline = "⌒";
var profsurf = "⌓";
var prop = "∝";
var Proportional = "∝";
var Proportion = "∷";
var propto = "∝";
var prsim = "≾";
var prurel = "⊰";
var Pscr = "𝒫";
var pscr = "𝓅";
var Psi = "Ψ";
var psi = "ψ";
var puncsp = " ";
var Qfr = "𝔔";
var qfr = "𝔮";
var qint = "⨌";
var qopf = "𝕢";
var Qopf = "ℚ";
var qprime = "⁗";
var Qscr = "𝒬";
var qscr = "𝓆";
var quaternions = "ℍ";
var quatint = "⨖";
var quest = "?";
var questeq = "≟";
var quot = "\"";
var QUOT = "\"";
var rAarr = "⇛";
var race = "∽̱";
var Racute = "Ŕ";
var racute = "ŕ";
var radic = "√";
var raemptyv = "⦳";
var rang = "⟩";
var Rang = "⟫";
var rangd = "⦒";
var range = "⦥";
var rangle = "⟩";
var raquo = "»";
var rarrap = "⥵";
var rarrb = "⇥";
var rarrbfs = "⤠";
var rarrc = "⤳";
var rarr = "→";
var Rarr = "↠";
var rArr = "⇒";
var rarrfs = "⤞";
var rarrhk = "↪";
var rarrlp = "↬";
var rarrpl = "⥅";
var rarrsim = "⥴";
var Rarrtl = "⤖";
var rarrtl = "↣";
var rarrw = "↝";
var ratail = "⤚";
var rAtail = "⤜";
var ratio = "∶";
var rationals = "ℚ";
var rbarr = "⤍";
var rBarr = "⤏";
var RBarr = "⤐";
var rbbrk = "❳";
var rbrace = "}";
var rbrack = "]";
var rbrke = "⦌";
var rbrksld = "⦎";
var rbrkslu = "⦐";
var Rcaron = "Ř";
var rcaron = "ř";
var Rcedil = "Ŗ";
var rcedil = "ŗ";
var rceil = "⌉";
var rcub = "}";
var Rcy = "Р";
var rcy = "р";
var rdca = "⤷";
var rdldhar = "⥩";
var rdquo = "”";
var rdquor = "”";
var rdsh = "↳";
var real = "ℜ";
var realine = "ℛ";
var realpart = "ℜ";
var reals = "ℝ";
var Re = "ℜ";
var rect = "▭";
var reg = "®";
var REG = "®";
var ReverseElement = "∋";
var ReverseEquilibrium = "⇋";
var ReverseUpEquilibrium = "⥯";
var rfisht = "⥽";
var rfloor = "⌋";
var rfr = "𝔯";
var Rfr = "ℜ";
var rHar = "⥤";
var rhard = "⇁";
var rharu = "⇀";
var rharul = "⥬";
var Rho = "Ρ";
var rho = "ρ";
var rhov = "ϱ";
var RightAngleBracket = "⟩";
var RightArrowBar = "⇥";
var rightarrow = "→";
var RightArrow = "→";
var Rightarrow = "⇒";
var RightArrowLeftArrow = "⇄";
var rightarrowtail = "↣";
var RightCeiling = "⌉";
var RightDoubleBracket = "⟧";
var RightDownTeeVector = "⥝";
var RightDownVectorBar = "⥕";
var RightDownVector = "⇂";
var RightFloor = "⌋";
var rightharpoondown = "⇁";
var rightharpoonup = "⇀";
var rightleftarrows = "⇄";
var rightleftharpoons = "⇌";
var rightrightarrows = "⇉";
var rightsquigarrow = "↝";
var RightTeeArrow = "↦";
var RightTee = "⊢";
var RightTeeVector = "⥛";
var rightthreetimes = "⋌";
var RightTriangleBar = "⧐";
var RightTriangle = "⊳";
var RightTriangleEqual = "⊵";
var RightUpDownVector = "⥏";
var RightUpTeeVector = "⥜";
var RightUpVectorBar = "⥔";
var RightUpVector = "↾";
var RightVectorBar = "⥓";
var RightVector = "⇀";
var ring = "˚";
var risingdotseq = "≓";
var rlarr = "⇄";
var rlhar = "⇌";
var rlm = "‏";
var rmoustache = "⎱";
var rmoust = "⎱";
var rnmid = "⫮";
var roang = "⟭";
var roarr = "⇾";
var robrk = "⟧";
var ropar = "⦆";
var ropf = "𝕣";
var Ropf = "ℝ";
var roplus = "⨮";
var rotimes = "⨵";
var RoundImplies = "⥰";
var rpar = ")";
var rpargt = "⦔";
var rppolint = "⨒";
var rrarr = "⇉";
var Rrightarrow = "⇛";
var rsaquo = "›";
var rscr = "𝓇";
var Rscr = "ℛ";
var rsh = "↱";
var Rsh = "↱";
var rsqb = "]";
var rsquo = "’";
var rsquor = "’";
var rthree = "⋌";
var rtimes = "⋊";
var rtri = "▹";
var rtrie = "⊵";
var rtrif = "▸";
var rtriltri = "⧎";
var RuleDelayed = "⧴";
var ruluhar = "⥨";
var rx = "℞";
var Sacute = "Ś";
var sacute = "ś";
var sbquo = "‚";
var scap = "⪸";
var Scaron = "Š";
var scaron = "š";
var Sc = "⪼";
var sc = "≻";
var sccue = "≽";
var sce = "⪰";
var scE = "⪴";
var Scedil = "Ş";
var scedil = "ş";
var Scirc = "Ŝ";
var scirc = "ŝ";
var scnap = "⪺";
var scnE = "⪶";
var scnsim = "⋩";
var scpolint = "⨓";
var scsim = "≿";
var Scy = "С";
var scy = "с";
var sdotb = "⊡";
var sdot = "⋅";
var sdote = "⩦";
var searhk = "⤥";
var searr = "↘";
var seArr = "⇘";
var searrow = "↘";
var sect = "§";
var semi = ";";
var seswar = "⤩";
var setminus = "∖";
var setmn = "∖";
var sext = "✶";
var Sfr = "𝔖";
var sfr = "𝔰";
var sfrown = "⌢";
var sharp = "♯";
var SHCHcy = "Щ";
var shchcy = "щ";
var SHcy = "Ш";
var shcy = "ш";
var ShortDownArrow = "↓";
var ShortLeftArrow = "←";
var shortmid = "∣";
var shortparallel = "∥";
var ShortRightArrow = "→";
var ShortUpArrow = "↑";
var shy = "­";
var Sigma = "Σ";
var sigma = "σ";
var sigmaf = "ς";
var sigmav = "ς";
var sim = "∼";
var simdot = "⩪";
var sime = "≃";
var simeq = "≃";
var simg = "⪞";
var simgE = "⪠";
var siml = "⪝";
var simlE = "⪟";
var simne = "≆";
var simplus = "⨤";
var simrarr = "⥲";
var slarr = "←";
var SmallCircle = "∘";
var smallsetminus = "∖";
var smashp = "⨳";
var smeparsl = "⧤";
var smid = "∣";
var smile = "⌣";
var smt = "⪪";
var smte = "⪬";
var smtes = "⪬︀";
var SOFTcy = "Ь";
var softcy = "ь";
var solbar = "⌿";
var solb = "⧄";
var sol = "/";
var Sopf = "𝕊";
var sopf = "𝕤";
var spades = "♠";
var spadesuit = "♠";
var spar = "∥";
var sqcap = "⊓";
var sqcaps = "⊓︀";
var sqcup = "⊔";
var sqcups = "⊔︀";
var Sqrt = "√";
var sqsub = "⊏";
var sqsube = "⊑";
var sqsubset = "⊏";
var sqsubseteq = "⊑";
var sqsup = "⊐";
var sqsupe = "⊒";
var sqsupset = "⊐";
var sqsupseteq = "⊒";
var square = "□";
var Square = "□";
var SquareIntersection = "⊓";
var SquareSubset = "⊏";
var SquareSubsetEqual = "⊑";
var SquareSuperset = "⊐";
var SquareSupersetEqual = "⊒";
var SquareUnion = "⊔";
var squarf = "▪";
var squ = "□";
var squf = "▪";
var srarr = "→";
var Sscr = "𝒮";
var sscr = "𝓈";
var ssetmn = "∖";
var ssmile = "⌣";
var sstarf = "⋆";
var Star = "⋆";
var star = "☆";
var starf = "★";
var straightepsilon = "ϵ";
var straightphi = "ϕ";
var strns = "¯";
var sub = "⊂";
var Sub = "⋐";
var subdot = "⪽";
var subE = "⫅";
var sube = "⊆";
var subedot = "⫃";
var submult = "⫁";
var subnE = "⫋";
var subne = "⊊";
var subplus = "⪿";
var subrarr = "⥹";
var subset = "⊂";
var Subset = "⋐";
var subseteq = "⊆";
var subseteqq = "⫅";
var SubsetEqual = "⊆";
var subsetneq = "⊊";
var subsetneqq = "⫋";
var subsim = "⫇";
var subsub = "⫕";
var subsup = "⫓";
var succapprox = "⪸";
var succ = "≻";
var succcurlyeq = "≽";
var Succeeds = "≻";
var SucceedsEqual = "⪰";
var SucceedsSlantEqual = "≽";
var SucceedsTilde = "≿";
var succeq = "⪰";
var succnapprox = "⪺";
var succneqq = "⪶";
var succnsim = "⋩";
var succsim = "≿";
var SuchThat = "∋";
var sum = "∑";
var Sum = "∑";
var sung = "♪";
var sup1 = "¹";
var sup2 = "²";
var sup3 = "³";
var sup = "⊃";
var Sup = "⋑";
var supdot = "⪾";
var supdsub = "⫘";
var supE = "⫆";
var supe = "⊇";
var supedot = "⫄";
var Superset = "⊃";
var SupersetEqual = "⊇";
var suphsol = "⟉";
var suphsub = "⫗";
var suplarr = "⥻";
var supmult = "⫂";
var supnE = "⫌";
var supne = "⊋";
var supplus = "⫀";
var supset = "⊃";
var Supset = "⋑";
var supseteq = "⊇";
var supseteqq = "⫆";
var supsetneq = "⊋";
var supsetneqq = "⫌";
var supsim = "⫈";
var supsub = "⫔";
var supsup = "⫖";
var swarhk = "⤦";
var swarr = "↙";
var swArr = "⇙";
var swarrow = "↙";
var swnwar = "⤪";
var szlig = "ß";
var Tab = "\t";
var target = "⌖";
var Tau = "Τ";
var tau = "τ";
var tbrk = "⎴";
var Tcaron = "Ť";
var tcaron = "ť";
var Tcedil = "Ţ";
var tcedil = "ţ";
var Tcy = "Т";
var tcy = "т";
var tdot = "⃛";
var telrec = "⌕";
var Tfr = "𝔗";
var tfr = "𝔱";
var there4 = "∴";
var therefore = "∴";
var Therefore = "∴";
var Theta = "Θ";
var theta = "θ";
var thetasym = "ϑ";
var thetav = "ϑ";
var thickapprox = "≈";
var thicksim = "∼";
var ThickSpace = "  ";
var ThinSpace = " ";
var thinsp = " ";
var thkap = "≈";
var thksim = "∼";
var THORN = "Þ";
var thorn = "þ";
var tilde = "˜";
var Tilde = "∼";
var TildeEqual = "≃";
var TildeFullEqual = "≅";
var TildeTilde = "≈";
var timesbar = "⨱";
var timesb = "⊠";
var times = "×";
var timesd = "⨰";
var tint = "∭";
var toea = "⤨";
var topbot = "⌶";
var topcir = "⫱";
var top = "⊤";
var Topf = "𝕋";
var topf = "𝕥";
var topfork = "⫚";
var tosa = "⤩";
var tprime = "‴";
var trade = "™";
var TRADE = "™";
var triangle = "▵";
var triangledown = "▿";
var triangleleft = "◃";
var trianglelefteq = "⊴";
var triangleq = "≜";
var triangleright = "▹";
var trianglerighteq = "⊵";
var tridot = "◬";
var trie = "≜";
var triminus = "⨺";
var TripleDot = "⃛";
var triplus = "⨹";
var trisb = "⧍";
var tritime = "⨻";
var trpezium = "⏢";
var Tscr = "𝒯";
var tscr = "𝓉";
var TScy = "Ц";
var tscy = "ц";
var TSHcy = "Ћ";
var tshcy = "ћ";
var Tstrok = "Ŧ";
var tstrok = "ŧ";
var twixt = "≬";
var twoheadleftarrow = "↞";
var twoheadrightarrow = "↠";
var Uacute = "Ú";
var uacute = "ú";
var uarr = "↑";
var Uarr = "↟";
var uArr = "⇑";
var Uarrocir = "⥉";
var Ubrcy = "Ў";
var ubrcy = "ў";
var Ubreve = "Ŭ";
var ubreve = "ŭ";
var Ucirc = "Û";
var ucirc = "û";
var Ucy = "У";
var ucy = "у";
var udarr = "⇅";
var Udblac = "Ű";
var udblac = "ű";
var udhar = "⥮";
var ufisht = "⥾";
var Ufr = "𝔘";
var ufr = "𝔲";
var Ugrave = "Ù";
var ugrave = "ù";
var uHar = "⥣";
var uharl = "↿";
var uharr = "↾";
var uhblk = "▀";
var ulcorn = "⌜";
var ulcorner = "⌜";
var ulcrop = "⌏";
var ultri = "◸";
var Umacr = "Ū";
var umacr = "ū";
var uml = "¨";
var UnderBar = "_";
var UnderBrace = "⏟";
var UnderBracket = "⎵";
var UnderParenthesis = "⏝";
var Union = "⋃";
var UnionPlus = "⊎";
var Uogon = "Ų";
var uogon = "ų";
var Uopf = "𝕌";
var uopf = "𝕦";
var UpArrowBar = "⤒";
var uparrow = "↑";
var UpArrow = "↑";
var Uparrow = "⇑";
var UpArrowDownArrow = "⇅";
var updownarrow = "↕";
var UpDownArrow = "↕";
var Updownarrow = "⇕";
var UpEquilibrium = "⥮";
var upharpoonleft = "↿";
var upharpoonright = "↾";
var uplus = "⊎";
var UpperLeftArrow = "↖";
var UpperRightArrow = "↗";
var upsi = "υ";
var Upsi = "ϒ";
var upsih = "ϒ";
var Upsilon = "Υ";
var upsilon = "υ";
var UpTeeArrow = "↥";
var UpTee = "⊥";
var upuparrows = "⇈";
var urcorn = "⌝";
var urcorner = "⌝";
var urcrop = "⌎";
var Uring = "Ů";
var uring = "ů";
var urtri = "◹";
var Uscr = "𝒰";
var uscr = "𝓊";
var utdot = "⋰";
var Utilde = "Ũ";
var utilde = "ũ";
var utri = "▵";
var utrif = "▴";
var uuarr = "⇈";
var Uuml = "Ü";
var uuml = "ü";
var uwangle = "⦧";
var vangrt = "⦜";
var varepsilon = "ϵ";
var varkappa = "ϰ";
var varnothing = "∅";
var varphi = "ϕ";
var varpi = "ϖ";
var varpropto = "∝";
var varr = "↕";
var vArr = "⇕";
var varrho = "ϱ";
var varsigma = "ς";
var varsubsetneq = "⊊︀";
var varsubsetneqq = "⫋︀";
var varsupsetneq = "⊋︀";
var varsupsetneqq = "⫌︀";
var vartheta = "ϑ";
var vartriangleleft = "⊲";
var vartriangleright = "⊳";
var vBar = "⫨";
var Vbar = "⫫";
var vBarv = "⫩";
var Vcy = "В";
var vcy = "в";
var vdash = "⊢";
var vDash = "⊨";
var Vdash = "⊩";
var VDash = "⊫";
var Vdashl = "⫦";
var veebar = "⊻";
var vee = "∨";
var Vee = "⋁";
var veeeq = "≚";
var vellip = "⋮";
var verbar = "|";
var Verbar = "‖";
var vert = "|";
var Vert = "‖";
var VerticalBar = "∣";
var VerticalLine = "|";
var VerticalSeparator = "❘";
var VerticalTilde = "≀";
var VeryThinSpace = " ";
var Vfr = "𝔙";
var vfr = "𝔳";
var vltri = "⊲";
var vnsub = "⊂⃒";
var vnsup = "⊃⃒";
var Vopf = "𝕍";
var vopf = "𝕧";
var vprop = "∝";
var vrtri = "⊳";
var Vscr = "𝒱";
var vscr = "𝓋";
var vsubnE = "⫋︀";
var vsubne = "⊊︀";
var vsupnE = "⫌︀";
var vsupne = "⊋︀";
var Vvdash = "⊪";
var vzigzag = "⦚";
var Wcirc = "Ŵ";
var wcirc = "ŵ";
var wedbar = "⩟";
var wedge = "∧";
var Wedge = "⋀";
var wedgeq = "≙";
var weierp = "℘";
var Wfr = "𝔚";
var wfr = "𝔴";
var Wopf = "𝕎";
var wopf = "𝕨";
var wp = "℘";
var wr = "≀";
var wreath = "≀";
var Wscr = "𝒲";
var wscr = "𝓌";
var xcap = "⋂";
var xcirc = "◯";
var xcup = "⋃";
var xdtri = "▽";
var Xfr = "𝔛";
var xfr = "𝔵";
var xharr = "⟷";
var xhArr = "⟺";
var Xi = "Ξ";
var xi = "ξ";
var xlarr = "⟵";
var xlArr = "⟸";
var xmap = "⟼";
var xnis = "⋻";
var xodot = "⨀";
var Xopf = "𝕏";
var xopf = "𝕩";
var xoplus = "⨁";
var xotime = "⨂";
var xrarr = "⟶";
var xrArr = "⟹";
var Xscr = "𝒳";
var xscr = "𝓍";
var xsqcup = "⨆";
var xuplus = "⨄";
var xutri = "△";
var xvee = "⋁";
var xwedge = "⋀";
var Yacute = "Ý";
var yacute = "ý";
var YAcy = "Я";
var yacy = "я";
var Ycirc = "Ŷ";
var ycirc = "ŷ";
var Ycy = "Ы";
var ycy = "ы";
var yen = "¥";
var Yfr = "𝔜";
var yfr = "𝔶";
var YIcy = "Ї";
var yicy = "ї";
var Yopf = "𝕐";
var yopf = "𝕪";
var Yscr = "𝒴";
var yscr = "𝓎";
var YUcy = "Ю";
var yucy = "ю";
var yuml = "ÿ";
var Yuml = "Ÿ";
var Zacute = "Ź";
var zacute = "ź";
var Zcaron = "Ž";
var zcaron = "ž";
var Zcy = "З";
var zcy = "з";
var Zdot = "Ż";
var zdot = "ż";
var zeetrf = "ℨ";
var ZeroWidthSpace = "​";
var Zeta = "Ζ";
var zeta = "ζ";
var zfr = "𝔷";
var Zfr = "ℨ";
var ZHcy = "Ж";
var zhcy = "ж";
var zigrarr = "⇝";
var zopf = "𝕫";
var Zopf = "ℤ";
var Zscr = "𝒵";
var zscr = "𝓏";
var zwj = "‍";
var zwnj = "‌";
var require$$0 = {
	Aacute: Aacute,
	aacute: aacute,
	Abreve: Abreve,
	abreve: abreve,
	ac: ac,
	acd: acd,
	acE: acE,
	Acirc: Acirc,
	acirc: acirc,
	acute: acute,
	Acy: Acy,
	acy: acy,
	AElig: AElig,
	aelig: aelig,
	af: af,
	Afr: Afr,
	afr: afr,
	Agrave: Agrave,
	agrave: agrave,
	alefsym: alefsym,
	aleph: aleph,
	Alpha: Alpha,
	alpha: alpha,
	Amacr: Amacr,
	amacr: amacr,
	amalg: amalg,
	amp: amp,
	AMP: AMP,
	andand: andand,
	And: And,
	and: and,
	andd: andd,
	andslope: andslope,
	andv: andv,
	ang: ang,
	ange: ange,
	angle: angle,
	angmsdaa: angmsdaa,
	angmsdab: angmsdab,
	angmsdac: angmsdac,
	angmsdad: angmsdad,
	angmsdae: angmsdae,
	angmsdaf: angmsdaf,
	angmsdag: angmsdag,
	angmsdah: angmsdah,
	angmsd: angmsd,
	angrt: angrt,
	angrtvb: angrtvb,
	angrtvbd: angrtvbd,
	angsph: angsph,
	angst: angst,
	angzarr: angzarr,
	Aogon: Aogon,
	aogon: aogon,
	Aopf: Aopf,
	aopf: aopf,
	apacir: apacir,
	ap: ap,
	apE: apE,
	ape: ape,
	apid: apid,
	apos: apos,
	ApplyFunction: ApplyFunction,
	approx: approx,
	approxeq: approxeq,
	Aring: Aring,
	aring: aring,
	Ascr: Ascr,
	ascr: ascr,
	Assign: Assign,
	ast: ast,
	asymp: asymp,
	asympeq: asympeq,
	Atilde: Atilde,
	atilde: atilde,
	Auml: Auml,
	auml: auml,
	awconint: awconint,
	awint: awint,
	backcong: backcong,
	backepsilon: backepsilon,
	backprime: backprime,
	backsim: backsim,
	backsimeq: backsimeq,
	Backslash: Backslash,
	Barv: Barv,
	barvee: barvee,
	barwed: barwed,
	Barwed: Barwed,
	barwedge: barwedge,
	bbrk: bbrk,
	bbrktbrk: bbrktbrk,
	bcong: bcong,
	Bcy: Bcy,
	bcy: bcy,
	bdquo: bdquo,
	becaus: becaus,
	because: because,
	Because: Because,
	bemptyv: bemptyv,
	bepsi: bepsi,
	bernou: bernou,
	Bernoullis: Bernoullis,
	Beta: Beta,
	beta: beta,
	beth: beth,
	between: between,
	Bfr: Bfr,
	bfr: bfr,
	bigcap: bigcap,
	bigcirc: bigcirc,
	bigcup: bigcup,
	bigodot: bigodot,
	bigoplus: bigoplus,
	bigotimes: bigotimes,
	bigsqcup: bigsqcup,
	bigstar: bigstar,
	bigtriangledown: bigtriangledown,
	bigtriangleup: bigtriangleup,
	biguplus: biguplus,
	bigvee: bigvee,
	bigwedge: bigwedge,
	bkarow: bkarow,
	blacklozenge: blacklozenge,
	blacksquare: blacksquare,
	blacktriangle: blacktriangle,
	blacktriangledown: blacktriangledown,
	blacktriangleleft: blacktriangleleft,
	blacktriangleright: blacktriangleright,
	blank: blank,
	blk12: blk12,
	blk14: blk14,
	blk34: blk34,
	block: block$1,
	bne: bne,
	bnequiv: bnequiv,
	bNot: bNot,
	bnot: bnot,
	Bopf: Bopf,
	bopf: bopf,
	bot: bot,
	bottom: bottom,
	bowtie: bowtie,
	boxbox: boxbox,
	boxdl: boxdl,
	boxdL: boxdL,
	boxDl: boxDl,
	boxDL: boxDL,
	boxdr: boxdr,
	boxdR: boxdR,
	boxDr: boxDr,
	boxDR: boxDR,
	boxh: boxh,
	boxH: boxH,
	boxhd: boxhd,
	boxHd: boxHd,
	boxhD: boxhD,
	boxHD: boxHD,
	boxhu: boxhu,
	boxHu: boxHu,
	boxhU: boxhU,
	boxHU: boxHU,
	boxminus: boxminus,
	boxplus: boxplus,
	boxtimes: boxtimes,
	boxul: boxul,
	boxuL: boxuL,
	boxUl: boxUl,
	boxUL: boxUL,
	boxur: boxur,
	boxuR: boxuR,
	boxUr: boxUr,
	boxUR: boxUR,
	boxv: boxv,
	boxV: boxV,
	boxvh: boxvh,
	boxvH: boxvH,
	boxVh: boxVh,
	boxVH: boxVH,
	boxvl: boxvl,
	boxvL: boxvL,
	boxVl: boxVl,
	boxVL: boxVL,
	boxvr: boxvr,
	boxvR: boxvR,
	boxVr: boxVr,
	boxVR: boxVR,
	bprime: bprime,
	breve: breve,
	Breve: Breve,
	brvbar: brvbar,
	bscr: bscr,
	Bscr: Bscr,
	bsemi: bsemi,
	bsim: bsim,
	bsime: bsime,
	bsolb: bsolb,
	bsol: bsol,
	bsolhsub: bsolhsub,
	bull: bull,
	bullet: bullet,
	bump: bump,
	bumpE: bumpE,
	bumpe: bumpe,
	Bumpeq: Bumpeq,
	bumpeq: bumpeq,
	Cacute: Cacute,
	cacute: cacute,
	capand: capand,
	capbrcup: capbrcup,
	capcap: capcap,
	cap: cap,
	Cap: Cap,
	capcup: capcup,
	capdot: capdot,
	CapitalDifferentialD: CapitalDifferentialD,
	caps: caps,
	caret: caret,
	caron: caron,
	Cayleys: Cayleys,
	ccaps: ccaps,
	Ccaron: Ccaron,
	ccaron: ccaron,
	Ccedil: Ccedil,
	ccedil: ccedil,
	Ccirc: Ccirc,
	ccirc: ccirc,
	Cconint: Cconint,
	ccups: ccups,
	ccupssm: ccupssm,
	Cdot: Cdot,
	cdot: cdot,
	cedil: cedil,
	Cedilla: Cedilla,
	cemptyv: cemptyv,
	cent: cent,
	centerdot: centerdot,
	CenterDot: CenterDot,
	cfr: cfr,
	Cfr: Cfr,
	CHcy: CHcy,
	chcy: chcy,
	check: check,
	checkmark: checkmark,
	Chi: Chi,
	chi: chi,
	circ: circ,
	circeq: circeq,
	circlearrowleft: circlearrowleft,
	circlearrowright: circlearrowright,
	circledast: circledast,
	circledcirc: circledcirc,
	circleddash: circleddash,
	CircleDot: CircleDot,
	circledR: circledR,
	circledS: circledS,
	CircleMinus: CircleMinus,
	CirclePlus: CirclePlus,
	CircleTimes: CircleTimes,
	cir: cir,
	cirE: cirE,
	cire: cire,
	cirfnint: cirfnint,
	cirmid: cirmid,
	cirscir: cirscir,
	ClockwiseContourIntegral: ClockwiseContourIntegral,
	CloseCurlyDoubleQuote: CloseCurlyDoubleQuote,
	CloseCurlyQuote: CloseCurlyQuote,
	clubs: clubs,
	clubsuit: clubsuit,
	colon: colon,
	Colon: Colon,
	Colone: Colone,
	colone: colone,
	coloneq: coloneq,
	comma: comma,
	commat: commat,
	comp: comp,
	compfn: compfn,
	complement: complement,
	complexes: complexes,
	cong: cong,
	congdot: congdot,
	Congruent: Congruent,
	conint: conint,
	Conint: Conint,
	ContourIntegral: ContourIntegral,
	copf: copf,
	Copf: Copf,
	coprod: coprod,
	Coproduct: Coproduct,
	copy: copy,
	COPY: COPY,
	copysr: copysr,
	CounterClockwiseContourIntegral: CounterClockwiseContourIntegral,
	crarr: crarr,
	cross: cross,
	Cross: Cross,
	Cscr: Cscr,
	cscr: cscr,
	csub: csub,
	csube: csube,
	csup: csup,
	csupe: csupe,
	ctdot: ctdot,
	cudarrl: cudarrl,
	cudarrr: cudarrr,
	cuepr: cuepr,
	cuesc: cuesc,
	cularr: cularr,
	cularrp: cularrp,
	cupbrcap: cupbrcap,
	cupcap: cupcap,
	CupCap: CupCap,
	cup: cup,
	Cup: Cup,
	cupcup: cupcup,
	cupdot: cupdot,
	cupor: cupor,
	cups: cups,
	curarr: curarr,
	curarrm: curarrm,
	curlyeqprec: curlyeqprec,
	curlyeqsucc: curlyeqsucc,
	curlyvee: curlyvee,
	curlywedge: curlywedge,
	curren: curren,
	curvearrowleft: curvearrowleft,
	curvearrowright: curvearrowright,
	cuvee: cuvee,
	cuwed: cuwed,
	cwconint: cwconint,
	cwint: cwint,
	cylcty: cylcty,
	dagger: dagger,
	Dagger: Dagger,
	daleth: daleth,
	darr: darr,
	Darr: Darr,
	dArr: dArr,
	dash: dash,
	Dashv: Dashv,
	dashv: dashv,
	dbkarow: dbkarow,
	dblac: dblac,
	Dcaron: Dcaron,
	dcaron: dcaron,
	Dcy: Dcy,
	dcy: dcy,
	ddagger: ddagger,
	ddarr: ddarr,
	DD: DD,
	dd: dd,
	DDotrahd: DDotrahd,
	ddotseq: ddotseq,
	deg: deg,
	Del: Del,
	Delta: Delta,
	delta: delta,
	demptyv: demptyv,
	dfisht: dfisht,
	Dfr: Dfr,
	dfr: dfr,
	dHar: dHar,
	dharl: dharl,
	dharr: dharr,
	DiacriticalAcute: DiacriticalAcute,
	DiacriticalDot: DiacriticalDot,
	DiacriticalDoubleAcute: DiacriticalDoubleAcute,
	DiacriticalGrave: DiacriticalGrave,
	DiacriticalTilde: DiacriticalTilde,
	diam: diam,
	diamond: diamond,
	Diamond: Diamond,
	diamondsuit: diamondsuit,
	diams: diams,
	die: die,
	DifferentialD: DifferentialD,
	digamma: digamma,
	disin: disin,
	div: div,
	divide: divide,
	divideontimes: divideontimes,
	divonx: divonx,
	DJcy: DJcy,
	djcy: djcy,
	dlcorn: dlcorn,
	dlcrop: dlcrop,
	dollar: dollar,
	Dopf: Dopf,
	dopf: dopf,
	Dot: Dot,
	dot: dot,
	DotDot: DotDot,
	doteq: doteq,
	doteqdot: doteqdot,
	DotEqual: DotEqual,
	dotminus: dotminus,
	dotplus: dotplus,
	dotsquare: dotsquare,
	doublebarwedge: doublebarwedge,
	DoubleContourIntegral: DoubleContourIntegral,
	DoubleDot: DoubleDot,
	DoubleDownArrow: DoubleDownArrow,
	DoubleLeftArrow: DoubleLeftArrow,
	DoubleLeftRightArrow: DoubleLeftRightArrow,
	DoubleLeftTee: DoubleLeftTee,
	DoubleLongLeftArrow: DoubleLongLeftArrow,
	DoubleLongLeftRightArrow: DoubleLongLeftRightArrow,
	DoubleLongRightArrow: DoubleLongRightArrow,
	DoubleRightArrow: DoubleRightArrow,
	DoubleRightTee: DoubleRightTee,
	DoubleUpArrow: DoubleUpArrow,
	DoubleUpDownArrow: DoubleUpDownArrow,
	DoubleVerticalBar: DoubleVerticalBar,
	DownArrowBar: DownArrowBar,
	downarrow: downarrow,
	DownArrow: DownArrow,
	Downarrow: Downarrow,
	DownArrowUpArrow: DownArrowUpArrow,
	DownBreve: DownBreve,
	downdownarrows: downdownarrows,
	downharpoonleft: downharpoonleft,
	downharpoonright: downharpoonright,
	DownLeftRightVector: DownLeftRightVector,
	DownLeftTeeVector: DownLeftTeeVector,
	DownLeftVectorBar: DownLeftVectorBar,
	DownLeftVector: DownLeftVector,
	DownRightTeeVector: DownRightTeeVector,
	DownRightVectorBar: DownRightVectorBar,
	DownRightVector: DownRightVector,
	DownTeeArrow: DownTeeArrow,
	DownTee: DownTee,
	drbkarow: drbkarow,
	drcorn: drcorn,
	drcrop: drcrop,
	Dscr: Dscr,
	dscr: dscr,
	DScy: DScy,
	dscy: dscy,
	dsol: dsol,
	Dstrok: Dstrok,
	dstrok: dstrok,
	dtdot: dtdot,
	dtri: dtri,
	dtrif: dtrif,
	duarr: duarr,
	duhar: duhar,
	dwangle: dwangle,
	DZcy: DZcy,
	dzcy: dzcy,
	dzigrarr: dzigrarr,
	Eacute: Eacute,
	eacute: eacute,
	easter: easter,
	Ecaron: Ecaron,
	ecaron: ecaron,
	Ecirc: Ecirc,
	ecirc: ecirc,
	ecir: ecir,
	ecolon: ecolon,
	Ecy: Ecy,
	ecy: ecy,
	eDDot: eDDot,
	Edot: Edot,
	edot: edot,
	eDot: eDot,
	ee: ee,
	efDot: efDot,
	Efr: Efr,
	efr: efr,
	eg: eg,
	Egrave: Egrave,
	egrave: egrave,
	egs: egs,
	egsdot: egsdot,
	el: el,
	Element: Element,
	elinters: elinters,
	ell: ell,
	els: els,
	elsdot: elsdot,
	Emacr: Emacr,
	emacr: emacr,
	empty: empty,
	emptyset: emptyset,
	EmptySmallSquare: EmptySmallSquare,
	emptyv: emptyv,
	EmptyVerySmallSquare: EmptyVerySmallSquare,
	emsp13: emsp13,
	emsp14: emsp14,
	emsp: emsp,
	ENG: ENG,
	eng: eng,
	ensp: ensp,
	Eogon: Eogon,
	eogon: eogon,
	Eopf: Eopf,
	eopf: eopf,
	epar: epar,
	eparsl: eparsl,
	eplus: eplus,
	epsi: epsi,
	Epsilon: Epsilon,
	epsilon: epsilon,
	epsiv: epsiv,
	eqcirc: eqcirc,
	eqcolon: eqcolon,
	eqsim: eqsim,
	eqslantgtr: eqslantgtr,
	eqslantless: eqslantless,
	Equal: Equal,
	equals: equals,
	EqualTilde: EqualTilde,
	equest: equest,
	Equilibrium: Equilibrium,
	equiv: equiv,
	equivDD: equivDD,
	eqvparsl: eqvparsl,
	erarr: erarr,
	erDot: erDot,
	escr: escr,
	Escr: Escr,
	esdot: esdot,
	Esim: Esim,
	esim: esim,
	Eta: Eta,
	eta: eta,
	ETH: ETH,
	eth: eth,
	Euml: Euml,
	euml: euml,
	euro: euro,
	excl: excl,
	exist: exist,
	Exists: Exists,
	expectation: expectation,
	exponentiale: exponentiale,
	ExponentialE: ExponentialE,
	fallingdotseq: fallingdotseq,
	Fcy: Fcy,
	fcy: fcy,
	female: female,
	ffilig: ffilig,
	fflig: fflig,
	ffllig: ffllig,
	Ffr: Ffr,
	ffr: ffr,
	filig: filig,
	FilledSmallSquare: FilledSmallSquare,
	FilledVerySmallSquare: FilledVerySmallSquare,
	fjlig: fjlig,
	flat: flat,
	fllig: fllig,
	fltns: fltns,
	fnof: fnof,
	Fopf: Fopf,
	fopf: fopf,
	forall: forall,
	ForAll: ForAll,
	fork: fork,
	forkv: forkv,
	Fouriertrf: Fouriertrf,
	fpartint: fpartint,
	frac12: frac12,
	frac13: frac13,
	frac14: frac14,
	frac15: frac15,
	frac16: frac16,
	frac18: frac18,
	frac23: frac23,
	frac25: frac25,
	frac34: frac34,
	frac35: frac35,
	frac38: frac38,
	frac45: frac45,
	frac56: frac56,
	frac58: frac58,
	frac78: frac78,
	frasl: frasl,
	frown: frown,
	fscr: fscr,
	Fscr: Fscr,
	gacute: gacute,
	Gamma: Gamma,
	gamma: gamma,
	Gammad: Gammad,
	gammad: gammad,
	gap: gap,
	Gbreve: Gbreve,
	gbreve: gbreve,
	Gcedil: Gcedil,
	Gcirc: Gcirc,
	gcirc: gcirc,
	Gcy: Gcy,
	gcy: gcy,
	Gdot: Gdot,
	gdot: gdot,
	ge: ge,
	gE: gE,
	gEl: gEl,
	gel: gel,
	geq: geq,
	geqq: geqq,
	geqslant: geqslant,
	gescc: gescc,
	ges: ges,
	gesdot: gesdot,
	gesdoto: gesdoto,
	gesdotol: gesdotol,
	gesl: gesl,
	gesles: gesles,
	Gfr: Gfr,
	gfr: gfr,
	gg: gg,
	Gg: Gg,
	ggg: ggg,
	gimel: gimel,
	GJcy: GJcy,
	gjcy: gjcy,
	gla: gla,
	gl: gl,
	glE: glE,
	glj: glj,
	gnap: gnap,
	gnapprox: gnapprox,
	gne: gne,
	gnE: gnE,
	gneq: gneq,
	gneqq: gneqq,
	gnsim: gnsim,
	Gopf: Gopf,
	gopf: gopf,
	grave: grave,
	GreaterEqual: GreaterEqual,
	GreaterEqualLess: GreaterEqualLess,
	GreaterFullEqual: GreaterFullEqual,
	GreaterGreater: GreaterGreater,
	GreaterLess: GreaterLess,
	GreaterSlantEqual: GreaterSlantEqual,
	GreaterTilde: GreaterTilde,
	Gscr: Gscr,
	gscr: gscr,
	gsim: gsim,
	gsime: gsime,
	gsiml: gsiml,
	gtcc: gtcc,
	gtcir: gtcir,
	gt: gt,
	GT: GT,
	Gt: Gt,
	gtdot: gtdot,
	gtlPar: gtlPar,
	gtquest: gtquest,
	gtrapprox: gtrapprox,
	gtrarr: gtrarr,
	gtrdot: gtrdot,
	gtreqless: gtreqless,
	gtreqqless: gtreqqless,
	gtrless: gtrless,
	gtrsim: gtrsim,
	gvertneqq: gvertneqq,
	gvnE: gvnE,
	Hacek: Hacek,
	hairsp: hairsp,
	half: half,
	hamilt: hamilt,
	HARDcy: HARDcy,
	hardcy: hardcy,
	harrcir: harrcir,
	harr: harr,
	hArr: hArr,
	harrw: harrw,
	Hat: Hat,
	hbar: hbar,
	Hcirc: Hcirc,
	hcirc: hcirc,
	hearts: hearts,
	heartsuit: heartsuit,
	hellip: hellip,
	hercon: hercon,
	hfr: hfr,
	Hfr: Hfr,
	HilbertSpace: HilbertSpace,
	hksearow: hksearow,
	hkswarow: hkswarow,
	hoarr: hoarr,
	homtht: homtht,
	hookleftarrow: hookleftarrow,
	hookrightarrow: hookrightarrow,
	hopf: hopf,
	Hopf: Hopf,
	horbar: horbar,
	HorizontalLine: HorizontalLine,
	hscr: hscr,
	Hscr: Hscr,
	hslash: hslash,
	Hstrok: Hstrok,
	hstrok: hstrok,
	HumpDownHump: HumpDownHump,
	HumpEqual: HumpEqual,
	hybull: hybull,
	hyphen: hyphen,
	Iacute: Iacute,
	iacute: iacute,
	ic: ic,
	Icirc: Icirc,
	icirc: icirc,
	Icy: Icy,
	icy: icy,
	Idot: Idot,
	IEcy: IEcy,
	iecy: iecy,
	iexcl: iexcl,
	iff: iff,
	ifr: ifr,
	Ifr: Ifr,
	Igrave: Igrave,
	igrave: igrave,
	ii: ii,
	iiiint: iiiint,
	iiint: iiint,
	iinfin: iinfin,
	iiota: iiota,
	IJlig: IJlig,
	ijlig: ijlig,
	Imacr: Imacr,
	imacr: imacr,
	image: image$1,
	ImaginaryI: ImaginaryI,
	imagline: imagline,
	imagpart: imagpart,
	imath: imath,
	Im: Im,
	imof: imof,
	imped: imped,
	Implies: Implies,
	incare: incare,
	"in": "∈",
	infin: infin,
	infintie: infintie,
	inodot: inodot,
	intcal: intcal,
	int: int,
	Int: Int,
	integers: integers,
	Integral: Integral,
	intercal: intercal,
	Intersection: Intersection,
	intlarhk: intlarhk,
	intprod: intprod,
	InvisibleComma: InvisibleComma,
	InvisibleTimes: InvisibleTimes,
	IOcy: IOcy,
	iocy: iocy,
	Iogon: Iogon,
	iogon: iogon,
	Iopf: Iopf,
	iopf: iopf,
	Iota: Iota,
	iota: iota,
	iprod: iprod,
	iquest: iquest,
	iscr: iscr,
	Iscr: Iscr,
	isin: isin,
	isindot: isindot,
	isinE: isinE,
	isins: isins,
	isinsv: isinsv,
	isinv: isinv,
	it: it,
	Itilde: Itilde,
	itilde: itilde,
	Iukcy: Iukcy,
	iukcy: iukcy,
	Iuml: Iuml,
	iuml: iuml,
	Jcirc: Jcirc,
	jcirc: jcirc,
	Jcy: Jcy,
	jcy: jcy,
	Jfr: Jfr,
	jfr: jfr,
	jmath: jmath,
	Jopf: Jopf,
	jopf: jopf,
	Jscr: Jscr,
	jscr: jscr,
	Jsercy: Jsercy,
	jsercy: jsercy,
	Jukcy: Jukcy,
	jukcy: jukcy,
	Kappa: Kappa,
	kappa: kappa,
	kappav: kappav,
	Kcedil: Kcedil,
	kcedil: kcedil,
	Kcy: Kcy,
	kcy: kcy,
	Kfr: Kfr,
	kfr: kfr,
	kgreen: kgreen,
	KHcy: KHcy,
	khcy: khcy,
	KJcy: KJcy,
	kjcy: kjcy,
	Kopf: Kopf,
	kopf: kopf,
	Kscr: Kscr,
	kscr: kscr,
	lAarr: lAarr,
	Lacute: Lacute,
	lacute: lacute,
	laemptyv: laemptyv,
	lagran: lagran,
	Lambda: Lambda,
	lambda: lambda,
	lang: lang,
	Lang: Lang,
	langd: langd,
	langle: langle,
	lap: lap,
	Laplacetrf: Laplacetrf,
	laquo: laquo,
	larrb: larrb,
	larrbfs: larrbfs,
	larr: larr,
	Larr: Larr,
	lArr: lArr,
	larrfs: larrfs,
	larrhk: larrhk,
	larrlp: larrlp,
	larrpl: larrpl,
	larrsim: larrsim,
	larrtl: larrtl,
	latail: latail,
	lAtail: lAtail,
	lat: lat,
	late: late,
	lates: lates,
	lbarr: lbarr,
	lBarr: lBarr,
	lbbrk: lbbrk,
	lbrace: lbrace,
	lbrack: lbrack,
	lbrke: lbrke,
	lbrksld: lbrksld,
	lbrkslu: lbrkslu,
	Lcaron: Lcaron,
	lcaron: lcaron,
	Lcedil: Lcedil,
	lcedil: lcedil,
	lceil: lceil,
	lcub: lcub,
	Lcy: Lcy,
	lcy: lcy,
	ldca: ldca,
	ldquo: ldquo,
	ldquor: ldquor,
	ldrdhar: ldrdhar,
	ldrushar: ldrushar,
	ldsh: ldsh,
	le: le,
	lE: lE,
	LeftAngleBracket: LeftAngleBracket,
	LeftArrowBar: LeftArrowBar,
	leftarrow: leftarrow,
	LeftArrow: LeftArrow,
	Leftarrow: Leftarrow,
	LeftArrowRightArrow: LeftArrowRightArrow,
	leftarrowtail: leftarrowtail,
	LeftCeiling: LeftCeiling,
	LeftDoubleBracket: LeftDoubleBracket,
	LeftDownTeeVector: LeftDownTeeVector,
	LeftDownVectorBar: LeftDownVectorBar,
	LeftDownVector: LeftDownVector,
	LeftFloor: LeftFloor,
	leftharpoondown: leftharpoondown,
	leftharpoonup: leftharpoonup,
	leftleftarrows: leftleftarrows,
	leftrightarrow: leftrightarrow,
	LeftRightArrow: LeftRightArrow,
	Leftrightarrow: Leftrightarrow,
	leftrightarrows: leftrightarrows,
	leftrightharpoons: leftrightharpoons,
	leftrightsquigarrow: leftrightsquigarrow,
	LeftRightVector: LeftRightVector,
	LeftTeeArrow: LeftTeeArrow,
	LeftTee: LeftTee,
	LeftTeeVector: LeftTeeVector,
	leftthreetimes: leftthreetimes,
	LeftTriangleBar: LeftTriangleBar,
	LeftTriangle: LeftTriangle,
	LeftTriangleEqual: LeftTriangleEqual,
	LeftUpDownVector: LeftUpDownVector,
	LeftUpTeeVector: LeftUpTeeVector,
	LeftUpVectorBar: LeftUpVectorBar,
	LeftUpVector: LeftUpVector,
	LeftVectorBar: LeftVectorBar,
	LeftVector: LeftVector,
	lEg: lEg,
	leg: leg,
	leq: leq,
	leqq: leqq,
	leqslant: leqslant,
	lescc: lescc,
	les: les,
	lesdot: lesdot,
	lesdoto: lesdoto,
	lesdotor: lesdotor,
	lesg: lesg,
	lesges: lesges,
	lessapprox: lessapprox,
	lessdot: lessdot,
	lesseqgtr: lesseqgtr,
	lesseqqgtr: lesseqqgtr,
	LessEqualGreater: LessEqualGreater,
	LessFullEqual: LessFullEqual,
	LessGreater: LessGreater,
	lessgtr: lessgtr,
	LessLess: LessLess,
	lesssim: lesssim,
	LessSlantEqual: LessSlantEqual,
	LessTilde: LessTilde,
	lfisht: lfisht,
	lfloor: lfloor,
	Lfr: Lfr,
	lfr: lfr,
	lg: lg,
	lgE: lgE,
	lHar: lHar,
	lhard: lhard,
	lharu: lharu,
	lharul: lharul,
	lhblk: lhblk,
	LJcy: LJcy,
	ljcy: ljcy,
	llarr: llarr,
	ll: ll,
	Ll: Ll,
	llcorner: llcorner,
	Lleftarrow: Lleftarrow,
	llhard: llhard,
	lltri: lltri,
	Lmidot: Lmidot,
	lmidot: lmidot,
	lmoustache: lmoustache,
	lmoust: lmoust,
	lnap: lnap,
	lnapprox: lnapprox,
	lne: lne,
	lnE: lnE,
	lneq: lneq,
	lneqq: lneqq,
	lnsim: lnsim,
	loang: loang,
	loarr: loarr,
	lobrk: lobrk,
	longleftarrow: longleftarrow,
	LongLeftArrow: LongLeftArrow,
	Longleftarrow: Longleftarrow,
	longleftrightarrow: longleftrightarrow,
	LongLeftRightArrow: LongLeftRightArrow,
	Longleftrightarrow: Longleftrightarrow,
	longmapsto: longmapsto,
	longrightarrow: longrightarrow,
	LongRightArrow: LongRightArrow,
	Longrightarrow: Longrightarrow,
	looparrowleft: looparrowleft,
	looparrowright: looparrowright,
	lopar: lopar,
	Lopf: Lopf,
	lopf: lopf,
	loplus: loplus,
	lotimes: lotimes,
	lowast: lowast,
	lowbar: lowbar,
	LowerLeftArrow: LowerLeftArrow,
	LowerRightArrow: LowerRightArrow,
	loz: loz,
	lozenge: lozenge,
	lozf: lozf,
	lpar: lpar,
	lparlt: lparlt,
	lrarr: lrarr,
	lrcorner: lrcorner,
	lrhar: lrhar,
	lrhard: lrhard,
	lrm: lrm,
	lrtri: lrtri,
	lsaquo: lsaquo,
	lscr: lscr,
	Lscr: Lscr,
	lsh: lsh,
	Lsh: Lsh,
	lsim: lsim,
	lsime: lsime,
	lsimg: lsimg,
	lsqb: lsqb,
	lsquo: lsquo,
	lsquor: lsquor,
	Lstrok: Lstrok,
	lstrok: lstrok,
	ltcc: ltcc,
	ltcir: ltcir,
	lt: lt,
	LT: LT,
	Lt: Lt,
	ltdot: ltdot,
	lthree: lthree,
	ltimes: ltimes,
	ltlarr: ltlarr,
	ltquest: ltquest,
	ltri: ltri,
	ltrie: ltrie,
	ltrif: ltrif,
	ltrPar: ltrPar,
	lurdshar: lurdshar,
	luruhar: luruhar,
	lvertneqq: lvertneqq,
	lvnE: lvnE,
	macr: macr,
	male: male,
	malt: malt,
	maltese: maltese,
	"Map": "⤅",
	map: map,
	mapsto: mapsto,
	mapstodown: mapstodown,
	mapstoleft: mapstoleft,
	mapstoup: mapstoup,
	marker: marker,
	mcomma: mcomma,
	Mcy: Mcy,
	mcy: mcy,
	mdash: mdash,
	mDDot: mDDot,
	measuredangle: measuredangle,
	MediumSpace: MediumSpace,
	Mellintrf: Mellintrf,
	Mfr: Mfr,
	mfr: mfr,
	mho: mho,
	micro: micro,
	midast: midast,
	midcir: midcir,
	mid: mid,
	middot: middot,
	minusb: minusb,
	minus: minus,
	minusd: minusd,
	minusdu: minusdu,
	MinusPlus: MinusPlus,
	mlcp: mlcp,
	mldr: mldr,
	mnplus: mnplus,
	models: models,
	Mopf: Mopf,
	mopf: mopf,
	mp: mp,
	mscr: mscr,
	Mscr: Mscr,
	mstpos: mstpos,
	Mu: Mu,
	mu: mu,
	multimap: multimap,
	mumap: mumap,
	nabla: nabla,
	Nacute: Nacute,
	nacute: nacute,
	nang: nang,
	nap: nap,
	napE: napE,
	napid: napid,
	napos: napos,
	napprox: napprox,
	natural: natural,
	naturals: naturals,
	natur: natur,
	nbsp: nbsp,
	nbump: nbump,
	nbumpe: nbumpe,
	ncap: ncap,
	Ncaron: Ncaron,
	ncaron: ncaron,
	Ncedil: Ncedil,
	ncedil: ncedil,
	ncong: ncong,
	ncongdot: ncongdot,
	ncup: ncup,
	Ncy: Ncy,
	ncy: ncy,
	ndash: ndash,
	nearhk: nearhk,
	nearr: nearr,
	neArr: neArr,
	nearrow: nearrow,
	ne: ne,
	nedot: nedot,
	NegativeMediumSpace: NegativeMediumSpace,
	NegativeThickSpace: NegativeThickSpace,
	NegativeThinSpace: NegativeThinSpace,
	NegativeVeryThinSpace: NegativeVeryThinSpace,
	nequiv: nequiv,
	nesear: nesear,
	nesim: nesim,
	NestedGreaterGreater: NestedGreaterGreater,
	NestedLessLess: NestedLessLess,
	NewLine: NewLine,
	nexist: nexist,
	nexists: nexists,
	Nfr: Nfr,
	nfr: nfr,
	ngE: ngE,
	nge: nge,
	ngeq: ngeq,
	ngeqq: ngeqq,
	ngeqslant: ngeqslant,
	nges: nges,
	nGg: nGg,
	ngsim: ngsim,
	nGt: nGt,
	ngt: ngt,
	ngtr: ngtr,
	nGtv: nGtv,
	nharr: nharr,
	nhArr: nhArr,
	nhpar: nhpar,
	ni: ni,
	nis: nis,
	nisd: nisd,
	niv: niv,
	NJcy: NJcy,
	njcy: njcy,
	nlarr: nlarr,
	nlArr: nlArr,
	nldr: nldr,
	nlE: nlE,
	nle: nle,
	nleftarrow: nleftarrow,
	nLeftarrow: nLeftarrow,
	nleftrightarrow: nleftrightarrow,
	nLeftrightarrow: nLeftrightarrow,
	nleq: nleq,
	nleqq: nleqq,
	nleqslant: nleqslant,
	nles: nles,
	nless: nless,
	nLl: nLl,
	nlsim: nlsim,
	nLt: nLt,
	nlt: nlt,
	nltri: nltri,
	nltrie: nltrie,
	nLtv: nLtv,
	nmid: nmid,
	NoBreak: NoBreak,
	NonBreakingSpace: NonBreakingSpace,
	nopf: nopf,
	Nopf: Nopf,
	Not: Not,
	not: not,
	NotCongruent: NotCongruent,
	NotCupCap: NotCupCap,
	NotDoubleVerticalBar: NotDoubleVerticalBar,
	NotElement: NotElement,
	NotEqual: NotEqual,
	NotEqualTilde: NotEqualTilde,
	NotExists: NotExists,
	NotGreater: NotGreater,
	NotGreaterEqual: NotGreaterEqual,
	NotGreaterFullEqual: NotGreaterFullEqual,
	NotGreaterGreater: NotGreaterGreater,
	NotGreaterLess: NotGreaterLess,
	NotGreaterSlantEqual: NotGreaterSlantEqual,
	NotGreaterTilde: NotGreaterTilde,
	NotHumpDownHump: NotHumpDownHump,
	NotHumpEqual: NotHumpEqual,
	notin: notin,
	notindot: notindot,
	notinE: notinE,
	notinva: notinva,
	notinvb: notinvb,
	notinvc: notinvc,
	NotLeftTriangleBar: NotLeftTriangleBar,
	NotLeftTriangle: NotLeftTriangle,
	NotLeftTriangleEqual: NotLeftTriangleEqual,
	NotLess: NotLess,
	NotLessEqual: NotLessEqual,
	NotLessGreater: NotLessGreater,
	NotLessLess: NotLessLess,
	NotLessSlantEqual: NotLessSlantEqual,
	NotLessTilde: NotLessTilde,
	NotNestedGreaterGreater: NotNestedGreaterGreater,
	NotNestedLessLess: NotNestedLessLess,
	notni: notni,
	notniva: notniva,
	notnivb: notnivb,
	notnivc: notnivc,
	NotPrecedes: NotPrecedes,
	NotPrecedesEqual: NotPrecedesEqual,
	NotPrecedesSlantEqual: NotPrecedesSlantEqual,
	NotReverseElement: NotReverseElement,
	NotRightTriangleBar: NotRightTriangleBar,
	NotRightTriangle: NotRightTriangle,
	NotRightTriangleEqual: NotRightTriangleEqual,
	NotSquareSubset: NotSquareSubset,
	NotSquareSubsetEqual: NotSquareSubsetEqual,
	NotSquareSuperset: NotSquareSuperset,
	NotSquareSupersetEqual: NotSquareSupersetEqual,
	NotSubset: NotSubset,
	NotSubsetEqual: NotSubsetEqual,
	NotSucceeds: NotSucceeds,
	NotSucceedsEqual: NotSucceedsEqual,
	NotSucceedsSlantEqual: NotSucceedsSlantEqual,
	NotSucceedsTilde: NotSucceedsTilde,
	NotSuperset: NotSuperset,
	NotSupersetEqual: NotSupersetEqual,
	NotTilde: NotTilde,
	NotTildeEqual: NotTildeEqual,
	NotTildeFullEqual: NotTildeFullEqual,
	NotTildeTilde: NotTildeTilde,
	NotVerticalBar: NotVerticalBar,
	nparallel: nparallel,
	npar: npar,
	nparsl: nparsl,
	npart: npart,
	npolint: npolint,
	npr: npr,
	nprcue: nprcue,
	nprec: nprec,
	npreceq: npreceq,
	npre: npre,
	nrarrc: nrarrc,
	nrarr: nrarr,
	nrArr: nrArr,
	nrarrw: nrarrw,
	nrightarrow: nrightarrow,
	nRightarrow: nRightarrow,
	nrtri: nrtri,
	nrtrie: nrtrie,
	nsc: nsc,
	nsccue: nsccue,
	nsce: nsce,
	Nscr: Nscr,
	nscr: nscr,
	nshortmid: nshortmid,
	nshortparallel: nshortparallel,
	nsim: nsim,
	nsime: nsime,
	nsimeq: nsimeq,
	nsmid: nsmid,
	nspar: nspar,
	nsqsube: nsqsube,
	nsqsupe: nsqsupe,
	nsub: nsub,
	nsubE: nsubE,
	nsube: nsube,
	nsubset: nsubset,
	nsubseteq: nsubseteq,
	nsubseteqq: nsubseteqq,
	nsucc: nsucc,
	nsucceq: nsucceq,
	nsup: nsup,
	nsupE: nsupE,
	nsupe: nsupe,
	nsupset: nsupset,
	nsupseteq: nsupseteq,
	nsupseteqq: nsupseteqq,
	ntgl: ntgl,
	Ntilde: Ntilde,
	ntilde: ntilde,
	ntlg: ntlg,
	ntriangleleft: ntriangleleft,
	ntrianglelefteq: ntrianglelefteq,
	ntriangleright: ntriangleright,
	ntrianglerighteq: ntrianglerighteq,
	Nu: Nu,
	nu: nu,
	num: num,
	numero: numero,
	numsp: numsp,
	nvap: nvap,
	nvdash: nvdash,
	nvDash: nvDash,
	nVdash: nVdash,
	nVDash: nVDash,
	nvge: nvge,
	nvgt: nvgt,
	nvHarr: nvHarr,
	nvinfin: nvinfin,
	nvlArr: nvlArr,
	nvle: nvle,
	nvlt: nvlt,
	nvltrie: nvltrie,
	nvrArr: nvrArr,
	nvrtrie: nvrtrie,
	nvsim: nvsim,
	nwarhk: nwarhk,
	nwarr: nwarr,
	nwArr: nwArr,
	nwarrow: nwarrow,
	nwnear: nwnear,
	Oacute: Oacute,
	oacute: oacute,
	oast: oast,
	Ocirc: Ocirc,
	ocirc: ocirc,
	ocir: ocir,
	Ocy: Ocy,
	ocy: ocy,
	odash: odash,
	Odblac: Odblac,
	odblac: odblac,
	odiv: odiv,
	odot: odot,
	odsold: odsold,
	OElig: OElig,
	oelig: oelig,
	ofcir: ofcir,
	Ofr: Ofr,
	ofr: ofr,
	ogon: ogon,
	Ograve: Ograve,
	ograve: ograve,
	ogt: ogt,
	ohbar: ohbar,
	ohm: ohm,
	oint: oint,
	olarr: olarr,
	olcir: olcir,
	olcross: olcross,
	oline: oline,
	olt: olt,
	Omacr: Omacr,
	omacr: omacr,
	Omega: Omega,
	omega: omega,
	Omicron: Omicron,
	omicron: omicron,
	omid: omid,
	ominus: ominus,
	Oopf: Oopf,
	oopf: oopf,
	opar: opar,
	OpenCurlyDoubleQuote: OpenCurlyDoubleQuote,
	OpenCurlyQuote: OpenCurlyQuote,
	operp: operp,
	oplus: oplus,
	orarr: orarr,
	Or: Or,
	or: or,
	ord: ord,
	order: order,
	orderof: orderof,
	ordf: ordf,
	ordm: ordm,
	origof: origof,
	oror: oror,
	orslope: orslope,
	orv: orv,
	oS: oS,
	Oscr: Oscr,
	oscr: oscr,
	Oslash: Oslash,
	oslash: oslash,
	osol: osol,
	Otilde: Otilde,
	otilde: otilde,
	otimesas: otimesas,
	Otimes: Otimes,
	otimes: otimes,
	Ouml: Ouml,
	ouml: ouml,
	ovbar: ovbar,
	OverBar: OverBar,
	OverBrace: OverBrace,
	OverBracket: OverBracket,
	OverParenthesis: OverParenthesis,
	para: para,
	parallel: parallel,
	par: par,
	parsim: parsim,
	parsl: parsl,
	part: part,
	PartialD: PartialD,
	Pcy: Pcy,
	pcy: pcy,
	percnt: percnt,
	period: period,
	permil: permil,
	perp: perp,
	pertenk: pertenk,
	Pfr: Pfr,
	pfr: pfr,
	Phi: Phi,
	phi: phi,
	phiv: phiv,
	phmmat: phmmat,
	phone: phone,
	Pi: Pi,
	pi: pi,
	pitchfork: pitchfork,
	piv: piv,
	planck: planck,
	planckh: planckh,
	plankv: plankv,
	plusacir: plusacir,
	plusb: plusb,
	pluscir: pluscir,
	plus: plus,
	plusdo: plusdo,
	plusdu: plusdu,
	pluse: pluse,
	PlusMinus: PlusMinus,
	plusmn: plusmn,
	plussim: plussim,
	plustwo: plustwo,
	pm: pm,
	Poincareplane: Poincareplane,
	pointint: pointint,
	popf: popf,
	Popf: Popf,
	pound: pound,
	prap: prap,
	Pr: Pr,
	pr: pr,
	prcue: prcue,
	precapprox: precapprox,
	prec: prec,
	preccurlyeq: preccurlyeq,
	Precedes: Precedes,
	PrecedesEqual: PrecedesEqual,
	PrecedesSlantEqual: PrecedesSlantEqual,
	PrecedesTilde: PrecedesTilde,
	preceq: preceq,
	precnapprox: precnapprox,
	precneqq: precneqq,
	precnsim: precnsim,
	pre: pre,
	prE: prE,
	precsim: precsim,
	prime: prime,
	Prime: Prime,
	primes: primes,
	prnap: prnap,
	prnE: prnE,
	prnsim: prnsim,
	prod: prod,
	Product: Product,
	profalar: profalar,
	profline: profline,
	profsurf: profsurf,
	prop: prop,
	Proportional: Proportional,
	Proportion: Proportion,
	propto: propto,
	prsim: prsim,
	prurel: prurel,
	Pscr: Pscr,
	pscr: pscr,
	Psi: Psi,
	psi: psi,
	puncsp: puncsp,
	Qfr: Qfr,
	qfr: qfr,
	qint: qint,
	qopf: qopf,
	Qopf: Qopf,
	qprime: qprime,
	Qscr: Qscr,
	qscr: qscr,
	quaternions: quaternions,
	quatint: quatint,
	quest: quest,
	questeq: questeq,
	quot: quot,
	QUOT: QUOT,
	rAarr: rAarr,
	race: race,
	Racute: Racute,
	racute: racute,
	radic: radic,
	raemptyv: raemptyv,
	rang: rang,
	Rang: Rang,
	rangd: rangd,
	range: range,
	rangle: rangle,
	raquo: raquo,
	rarrap: rarrap,
	rarrb: rarrb,
	rarrbfs: rarrbfs,
	rarrc: rarrc,
	rarr: rarr,
	Rarr: Rarr,
	rArr: rArr,
	rarrfs: rarrfs,
	rarrhk: rarrhk,
	rarrlp: rarrlp,
	rarrpl: rarrpl,
	rarrsim: rarrsim,
	Rarrtl: Rarrtl,
	rarrtl: rarrtl,
	rarrw: rarrw,
	ratail: ratail,
	rAtail: rAtail,
	ratio: ratio,
	rationals: rationals,
	rbarr: rbarr,
	rBarr: rBarr,
	RBarr: RBarr,
	rbbrk: rbbrk,
	rbrace: rbrace,
	rbrack: rbrack,
	rbrke: rbrke,
	rbrksld: rbrksld,
	rbrkslu: rbrkslu,
	Rcaron: Rcaron,
	rcaron: rcaron,
	Rcedil: Rcedil,
	rcedil: rcedil,
	rceil: rceil,
	rcub: rcub,
	Rcy: Rcy,
	rcy: rcy,
	rdca: rdca,
	rdldhar: rdldhar,
	rdquo: rdquo,
	rdquor: rdquor,
	rdsh: rdsh,
	real: real,
	realine: realine,
	realpart: realpart,
	reals: reals,
	Re: Re,
	rect: rect,
	reg: reg,
	REG: REG,
	ReverseElement: ReverseElement,
	ReverseEquilibrium: ReverseEquilibrium,
	ReverseUpEquilibrium: ReverseUpEquilibrium,
	rfisht: rfisht,
	rfloor: rfloor,
	rfr: rfr,
	Rfr: Rfr,
	rHar: rHar,
	rhard: rhard,
	rharu: rharu,
	rharul: rharul,
	Rho: Rho,
	rho: rho,
	rhov: rhov,
	RightAngleBracket: RightAngleBracket,
	RightArrowBar: RightArrowBar,
	rightarrow: rightarrow,
	RightArrow: RightArrow,
	Rightarrow: Rightarrow,
	RightArrowLeftArrow: RightArrowLeftArrow,
	rightarrowtail: rightarrowtail,
	RightCeiling: RightCeiling,
	RightDoubleBracket: RightDoubleBracket,
	RightDownTeeVector: RightDownTeeVector,
	RightDownVectorBar: RightDownVectorBar,
	RightDownVector: RightDownVector,
	RightFloor: RightFloor,
	rightharpoondown: rightharpoondown,
	rightharpoonup: rightharpoonup,
	rightleftarrows: rightleftarrows,
	rightleftharpoons: rightleftharpoons,
	rightrightarrows: rightrightarrows,
	rightsquigarrow: rightsquigarrow,
	RightTeeArrow: RightTeeArrow,
	RightTee: RightTee,
	RightTeeVector: RightTeeVector,
	rightthreetimes: rightthreetimes,
	RightTriangleBar: RightTriangleBar,
	RightTriangle: RightTriangle,
	RightTriangleEqual: RightTriangleEqual,
	RightUpDownVector: RightUpDownVector,
	RightUpTeeVector: RightUpTeeVector,
	RightUpVectorBar: RightUpVectorBar,
	RightUpVector: RightUpVector,
	RightVectorBar: RightVectorBar,
	RightVector: RightVector,
	ring: ring,
	risingdotseq: risingdotseq,
	rlarr: rlarr,
	rlhar: rlhar,
	rlm: rlm,
	rmoustache: rmoustache,
	rmoust: rmoust,
	rnmid: rnmid,
	roang: roang,
	roarr: roarr,
	robrk: robrk,
	ropar: ropar,
	ropf: ropf,
	Ropf: Ropf,
	roplus: roplus,
	rotimes: rotimes,
	RoundImplies: RoundImplies,
	rpar: rpar,
	rpargt: rpargt,
	rppolint: rppolint,
	rrarr: rrarr,
	Rrightarrow: Rrightarrow,
	rsaquo: rsaquo,
	rscr: rscr,
	Rscr: Rscr,
	rsh: rsh,
	Rsh: Rsh,
	rsqb: rsqb,
	rsquo: rsquo,
	rsquor: rsquor,
	rthree: rthree,
	rtimes: rtimes,
	rtri: rtri,
	rtrie: rtrie,
	rtrif: rtrif,
	rtriltri: rtriltri,
	RuleDelayed: RuleDelayed,
	ruluhar: ruluhar,
	rx: rx,
	Sacute: Sacute,
	sacute: sacute,
	sbquo: sbquo,
	scap: scap,
	Scaron: Scaron,
	scaron: scaron,
	Sc: Sc,
	sc: sc,
	sccue: sccue,
	sce: sce,
	scE: scE,
	Scedil: Scedil,
	scedil: scedil,
	Scirc: Scirc,
	scirc: scirc,
	scnap: scnap,
	scnE: scnE,
	scnsim: scnsim,
	scpolint: scpolint,
	scsim: scsim,
	Scy: Scy,
	scy: scy,
	sdotb: sdotb,
	sdot: sdot,
	sdote: sdote,
	searhk: searhk,
	searr: searr,
	seArr: seArr,
	searrow: searrow,
	sect: sect,
	semi: semi,
	seswar: seswar,
	setminus: setminus,
	setmn: setmn,
	sext: sext,
	Sfr: Sfr,
	sfr: sfr,
	sfrown: sfrown,
	sharp: sharp,
	SHCHcy: SHCHcy,
	shchcy: shchcy,
	SHcy: SHcy,
	shcy: shcy,
	ShortDownArrow: ShortDownArrow,
	ShortLeftArrow: ShortLeftArrow,
	shortmid: shortmid,
	shortparallel: shortparallel,
	ShortRightArrow: ShortRightArrow,
	ShortUpArrow: ShortUpArrow,
	shy: shy,
	Sigma: Sigma,
	sigma: sigma,
	sigmaf: sigmaf,
	sigmav: sigmav,
	sim: sim,
	simdot: simdot,
	sime: sime,
	simeq: simeq,
	simg: simg,
	simgE: simgE,
	siml: siml,
	simlE: simlE,
	simne: simne,
	simplus: simplus,
	simrarr: simrarr,
	slarr: slarr,
	SmallCircle: SmallCircle,
	smallsetminus: smallsetminus,
	smashp: smashp,
	smeparsl: smeparsl,
	smid: smid,
	smile: smile,
	smt: smt,
	smte: smte,
	smtes: smtes,
	SOFTcy: SOFTcy,
	softcy: softcy,
	solbar: solbar,
	solb: solb,
	sol: sol,
	Sopf: Sopf,
	sopf: sopf,
	spades: spades,
	spadesuit: spadesuit,
	spar: spar,
	sqcap: sqcap,
	sqcaps: sqcaps,
	sqcup: sqcup,
	sqcups: sqcups,
	Sqrt: Sqrt,
	sqsub: sqsub,
	sqsube: sqsube,
	sqsubset: sqsubset,
	sqsubseteq: sqsubseteq,
	sqsup: sqsup,
	sqsupe: sqsupe,
	sqsupset: sqsupset,
	sqsupseteq: sqsupseteq,
	square: square,
	Square: Square,
	SquareIntersection: SquareIntersection,
	SquareSubset: SquareSubset,
	SquareSubsetEqual: SquareSubsetEqual,
	SquareSuperset: SquareSuperset,
	SquareSupersetEqual: SquareSupersetEqual,
	SquareUnion: SquareUnion,
	squarf: squarf,
	squ: squ,
	squf: squf,
	srarr: srarr,
	Sscr: Sscr,
	sscr: sscr,
	ssetmn: ssetmn,
	ssmile: ssmile,
	sstarf: sstarf,
	Star: Star,
	star: star,
	starf: starf,
	straightepsilon: straightepsilon,
	straightphi: straightphi,
	strns: strns,
	sub: sub,
	Sub: Sub,
	subdot: subdot,
	subE: subE,
	sube: sube,
	subedot: subedot,
	submult: submult,
	subnE: subnE,
	subne: subne,
	subplus: subplus,
	subrarr: subrarr,
	subset: subset,
	Subset: Subset,
	subseteq: subseteq,
	subseteqq: subseteqq,
	SubsetEqual: SubsetEqual,
	subsetneq: subsetneq,
	subsetneqq: subsetneqq,
	subsim: subsim,
	subsub: subsub,
	subsup: subsup,
	succapprox: succapprox,
	succ: succ,
	succcurlyeq: succcurlyeq,
	Succeeds: Succeeds,
	SucceedsEqual: SucceedsEqual,
	SucceedsSlantEqual: SucceedsSlantEqual,
	SucceedsTilde: SucceedsTilde,
	succeq: succeq,
	succnapprox: succnapprox,
	succneqq: succneqq,
	succnsim: succnsim,
	succsim: succsim,
	SuchThat: SuchThat,
	sum: sum,
	Sum: Sum,
	sung: sung,
	sup1: sup1,
	sup2: sup2,
	sup3: sup3,
	sup: sup,
	Sup: Sup,
	supdot: supdot,
	supdsub: supdsub,
	supE: supE,
	supe: supe,
	supedot: supedot,
	Superset: Superset,
	SupersetEqual: SupersetEqual,
	suphsol: suphsol,
	suphsub: suphsub,
	suplarr: suplarr,
	supmult: supmult,
	supnE: supnE,
	supne: supne,
	supplus: supplus,
	supset: supset,
	Supset: Supset,
	supseteq: supseteq,
	supseteqq: supseteqq,
	supsetneq: supsetneq,
	supsetneqq: supsetneqq,
	supsim: supsim,
	supsub: supsub,
	supsup: supsup,
	swarhk: swarhk,
	swarr: swarr,
	swArr: swArr,
	swarrow: swarrow,
	swnwar: swnwar,
	szlig: szlig,
	Tab: Tab,
	target: target,
	Tau: Tau,
	tau: tau,
	tbrk: tbrk,
	Tcaron: Tcaron,
	tcaron: tcaron,
	Tcedil: Tcedil,
	tcedil: tcedil,
	Tcy: Tcy,
	tcy: tcy,
	tdot: tdot,
	telrec: telrec,
	Tfr: Tfr,
	tfr: tfr,
	there4: there4,
	therefore: therefore,
	Therefore: Therefore,
	Theta: Theta,
	theta: theta,
	thetasym: thetasym,
	thetav: thetav,
	thickapprox: thickapprox,
	thicksim: thicksim,
	ThickSpace: ThickSpace,
	ThinSpace: ThinSpace,
	thinsp: thinsp,
	thkap: thkap,
	thksim: thksim,
	THORN: THORN,
	thorn: thorn,
	tilde: tilde,
	Tilde: Tilde,
	TildeEqual: TildeEqual,
	TildeFullEqual: TildeFullEqual,
	TildeTilde: TildeTilde,
	timesbar: timesbar,
	timesb: timesb,
	times: times,
	timesd: timesd,
	tint: tint,
	toea: toea,
	topbot: topbot,
	topcir: topcir,
	top: top,
	Topf: Topf,
	topf: topf,
	topfork: topfork,
	tosa: tosa,
	tprime: tprime,
	trade: trade,
	TRADE: TRADE,
	triangle: triangle,
	triangledown: triangledown,
	triangleleft: triangleleft,
	trianglelefteq: trianglelefteq,
	triangleq: triangleq,
	triangleright: triangleright,
	trianglerighteq: trianglerighteq,
	tridot: tridot,
	trie: trie,
	triminus: triminus,
	TripleDot: TripleDot,
	triplus: triplus,
	trisb: trisb,
	tritime: tritime,
	trpezium: trpezium,
	Tscr: Tscr,
	tscr: tscr,
	TScy: TScy,
	tscy: tscy,
	TSHcy: TSHcy,
	tshcy: tshcy,
	Tstrok: Tstrok,
	tstrok: tstrok,
	twixt: twixt,
	twoheadleftarrow: twoheadleftarrow,
	twoheadrightarrow: twoheadrightarrow,
	Uacute: Uacute,
	uacute: uacute,
	uarr: uarr,
	Uarr: Uarr,
	uArr: uArr,
	Uarrocir: Uarrocir,
	Ubrcy: Ubrcy,
	ubrcy: ubrcy,
	Ubreve: Ubreve,
	ubreve: ubreve,
	Ucirc: Ucirc,
	ucirc: ucirc,
	Ucy: Ucy,
	ucy: ucy,
	udarr: udarr,
	Udblac: Udblac,
	udblac: udblac,
	udhar: udhar,
	ufisht: ufisht,
	Ufr: Ufr,
	ufr: ufr,
	Ugrave: Ugrave,
	ugrave: ugrave,
	uHar: uHar,
	uharl: uharl,
	uharr: uharr,
	uhblk: uhblk,
	ulcorn: ulcorn,
	ulcorner: ulcorner,
	ulcrop: ulcrop,
	ultri: ultri,
	Umacr: Umacr,
	umacr: umacr,
	uml: uml,
	UnderBar: UnderBar,
	UnderBrace: UnderBrace,
	UnderBracket: UnderBracket,
	UnderParenthesis: UnderParenthesis,
	Union: Union,
	UnionPlus: UnionPlus,
	Uogon: Uogon,
	uogon: uogon,
	Uopf: Uopf,
	uopf: uopf,
	UpArrowBar: UpArrowBar,
	uparrow: uparrow,
	UpArrow: UpArrow,
	Uparrow: Uparrow,
	UpArrowDownArrow: UpArrowDownArrow,
	updownarrow: updownarrow,
	UpDownArrow: UpDownArrow,
	Updownarrow: Updownarrow,
	UpEquilibrium: UpEquilibrium,
	upharpoonleft: upharpoonleft,
	upharpoonright: upharpoonright,
	uplus: uplus,
	UpperLeftArrow: UpperLeftArrow,
	UpperRightArrow: UpperRightArrow,
	upsi: upsi,
	Upsi: Upsi,
	upsih: upsih,
	Upsilon: Upsilon,
	upsilon: upsilon,
	UpTeeArrow: UpTeeArrow,
	UpTee: UpTee,
	upuparrows: upuparrows,
	urcorn: urcorn,
	urcorner: urcorner,
	urcrop: urcrop,
	Uring: Uring,
	uring: uring,
	urtri: urtri,
	Uscr: Uscr,
	uscr: uscr,
	utdot: utdot,
	Utilde: Utilde,
	utilde: utilde,
	utri: utri,
	utrif: utrif,
	uuarr: uuarr,
	Uuml: Uuml,
	uuml: uuml,
	uwangle: uwangle,
	vangrt: vangrt,
	varepsilon: varepsilon,
	varkappa: varkappa,
	varnothing: varnothing,
	varphi: varphi,
	varpi: varpi,
	varpropto: varpropto,
	varr: varr,
	vArr: vArr,
	varrho: varrho,
	varsigma: varsigma,
	varsubsetneq: varsubsetneq,
	varsubsetneqq: varsubsetneqq,
	varsupsetneq: varsupsetneq,
	varsupsetneqq: varsupsetneqq,
	vartheta: vartheta,
	vartriangleleft: vartriangleleft,
	vartriangleright: vartriangleright,
	vBar: vBar,
	Vbar: Vbar,
	vBarv: vBarv,
	Vcy: Vcy,
	vcy: vcy,
	vdash: vdash,
	vDash: vDash,
	Vdash: Vdash,
	VDash: VDash,
	Vdashl: Vdashl,
	veebar: veebar,
	vee: vee,
	Vee: Vee,
	veeeq: veeeq,
	vellip: vellip,
	verbar: verbar,
	Verbar: Verbar,
	vert: vert,
	Vert: Vert,
	VerticalBar: VerticalBar,
	VerticalLine: VerticalLine,
	VerticalSeparator: VerticalSeparator,
	VerticalTilde: VerticalTilde,
	VeryThinSpace: VeryThinSpace,
	Vfr: Vfr,
	vfr: vfr,
	vltri: vltri,
	vnsub: vnsub,
	vnsup: vnsup,
	Vopf: Vopf,
	vopf: vopf,
	vprop: vprop,
	vrtri: vrtri,
	Vscr: Vscr,
	vscr: vscr,
	vsubnE: vsubnE,
	vsubne: vsubne,
	vsupnE: vsupnE,
	vsupne: vsupne,
	Vvdash: Vvdash,
	vzigzag: vzigzag,
	Wcirc: Wcirc,
	wcirc: wcirc,
	wedbar: wedbar,
	wedge: wedge,
	Wedge: Wedge,
	wedgeq: wedgeq,
	weierp: weierp,
	Wfr: Wfr,
	wfr: wfr,
	Wopf: Wopf,
	wopf: wopf,
	wp: wp,
	wr: wr,
	wreath: wreath,
	Wscr: Wscr,
	wscr: wscr,
	xcap: xcap,
	xcirc: xcirc,
	xcup: xcup,
	xdtri: xdtri,
	Xfr: Xfr,
	xfr: xfr,
	xharr: xharr,
	xhArr: xhArr,
	Xi: Xi,
	xi: xi,
	xlarr: xlarr,
	xlArr: xlArr,
	xmap: xmap,
	xnis: xnis,
	xodot: xodot,
	Xopf: Xopf,
	xopf: xopf,
	xoplus: xoplus,
	xotime: xotime,
	xrarr: xrarr,
	xrArr: xrArr,
	Xscr: Xscr,
	xscr: xscr,
	xsqcup: xsqcup,
	xuplus: xuplus,
	xutri: xutri,
	xvee: xvee,
	xwedge: xwedge,
	Yacute: Yacute,
	yacute: yacute,
	YAcy: YAcy,
	yacy: yacy,
	Ycirc: Ycirc,
	ycirc: ycirc,
	Ycy: Ycy,
	ycy: ycy,
	yen: yen,
	Yfr: Yfr,
	yfr: yfr,
	YIcy: YIcy,
	yicy: yicy,
	Yopf: Yopf,
	yopf: yopf,
	Yscr: Yscr,
	yscr: yscr,
	YUcy: YUcy,
	yucy: yucy,
	yuml: yuml,
	Yuml: Yuml,
	Zacute: Zacute,
	zacute: zacute,
	Zcaron: Zcaron,
	zcaron: zcaron,
	Zcy: Zcy,
	zcy: zcy,
	Zdot: Zdot,
	zdot: zdot,
	zeetrf: zeetrf,
	ZeroWidthSpace: ZeroWidthSpace,
	Zeta: Zeta,
	zeta: zeta,
	zfr: zfr,
	Zfr: Zfr,
	ZHcy: ZHcy,
	zhcy: zhcy,
	zigrarr: zigrarr,
	zopf: zopf,
	Zopf: Zopf,
	Zscr: Zscr,
	zscr: zscr,
	zwj: zwj,
	zwnj: zwnj
};

/*eslint quotes:0*/
var entities = require$$0;

var regex$4=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;

var encodeCache = {};


// Create a lookup array where anything but characters in `chars` string
// and alphanumeric chars is percent-encoded.
//
function getEncodeCache(exclude) {
  var i, ch, cache = encodeCache[exclude];
  if (cache) { return cache; }

  cache = encodeCache[exclude] = [];

  for (i = 0; i < 128; i++) {
    ch = String.fromCharCode(i);

    if (/^[0-9a-z]$/i.test(ch)) {
      // always allow unencoded alphanumeric characters
      cache.push(ch);
    } else {
      cache.push('%' + ('0' + i.toString(16).toUpperCase()).slice(-2));
    }
  }

  for (i = 0; i < exclude.length; i++) {
    cache[exclude.charCodeAt(i)] = exclude[i];
  }

  return cache;
}


// Encode unsafe characters with percent-encoding, skipping already
// encoded sequences.
//
//  - string       - string to encode
//  - exclude      - list of characters to ignore (in addition to a-zA-Z0-9)
//  - keepEscaped  - don't encode '%' in a correct escape sequence (default: true)
//
function encode$1(string, exclude, keepEscaped) {
  var i, l, code, nextCode, cache,
      result = '';

  if (typeof exclude !== 'string') {
    // encode(string, keepEscaped)
    keepEscaped  = exclude;
    exclude = encode$1.defaultChars;
  }

  if (typeof keepEscaped === 'undefined') {
    keepEscaped = true;
  }

  cache = getEncodeCache(exclude);

  for (i = 0, l = string.length; i < l; i++) {
    code = string.charCodeAt(i);

    if (keepEscaped && code === 0x25 /* % */ && i + 2 < l) {
      if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
        result += string.slice(i, i + 3);
        i += 2;
        continue;
      }
    }

    if (code < 128) {
      result += cache[code];
      continue;
    }

    if (code >= 0xD800 && code <= 0xDFFF) {
      if (code >= 0xD800 && code <= 0xDBFF && i + 1 < l) {
        nextCode = string.charCodeAt(i + 1);
        if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
          result += encodeURIComponent(string[i] + string[i + 1]);
          i++;
          continue;
        }
      }
      result += '%EF%BF%BD';
      continue;
    }

    result += encodeURIComponent(string[i]);
  }

  return result;
}

encode$1.defaultChars   = ";/?:@&=+$,-_.!~*'()#";
encode$1.componentChars = "-_.!~*'()";


var encode_1 = encode$1;

/* eslint-disable no-bitwise */

var decodeCache = {};

function getDecodeCache(exclude) {
  var i, ch, cache = decodeCache[exclude];
  if (cache) { return cache; }

  cache = decodeCache[exclude] = [];

  for (i = 0; i < 128; i++) {
    ch = String.fromCharCode(i);
    cache.push(ch);
  }

  for (i = 0; i < exclude.length; i++) {
    ch = exclude.charCodeAt(i);
    cache[ch] = '%' + ('0' + ch.toString(16).toUpperCase()).slice(-2);
  }

  return cache;
}


// Decode percent-encoded string.
//
function decode$1(string, exclude) {
  var cache;

  if (typeof exclude !== 'string') {
    exclude = decode$1.defaultChars;
  }

  cache = getDecodeCache(exclude);

  return string.replace(/(%[a-f0-9]{2})+/gi, function(seq) {
    var i, l, b1, b2, b3, b4, chr,
        result = '';

    for (i = 0, l = seq.length; i < l; i += 3) {
      b1 = parseInt(seq.slice(i + 1, i + 3), 16);

      if (b1 < 0x80) {
        result += cache[b1];
        continue;
      }

      if ((b1 & 0xE0) === 0xC0 && (i + 3 < l)) {
        // 110xxxxx 10xxxxxx
        b2 = parseInt(seq.slice(i + 4, i + 6), 16);

        if ((b2 & 0xC0) === 0x80) {
          chr = ((b1 << 6) & 0x7C0) | (b2 & 0x3F);

          if (chr < 0x80) {
            result += '\ufffd\ufffd';
          } else {
            result += String.fromCharCode(chr);
          }

          i += 3;
          continue;
        }
      }

      if ((b1 & 0xF0) === 0xE0 && (i + 6 < l)) {
        // 1110xxxx 10xxxxxx 10xxxxxx
        b2 = parseInt(seq.slice(i + 4, i + 6), 16);
        b3 = parseInt(seq.slice(i + 7, i + 9), 16);

        if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80) {
          chr = ((b1 << 12) & 0xF000) | ((b2 << 6) & 0xFC0) | (b3 & 0x3F);

          if (chr < 0x800 || (chr >= 0xD800 && chr <= 0xDFFF)) {
            result += '\ufffd\ufffd\ufffd';
          } else {
            result += String.fromCharCode(chr);
          }

          i += 6;
          continue;
        }
      }

      if ((b1 & 0xF8) === 0xF0 && (i + 9 < l)) {
        // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx
        b2 = parseInt(seq.slice(i + 4, i + 6), 16);
        b3 = parseInt(seq.slice(i + 7, i + 9), 16);
        b4 = parseInt(seq.slice(i + 10, i + 12), 16);

        if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80 && (b4 & 0xC0) === 0x80) {
          chr = ((b1 << 18) & 0x1C0000) | ((b2 << 12) & 0x3F000) | ((b3 << 6) & 0xFC0) | (b4 & 0x3F);

          if (chr < 0x10000 || chr > 0x10FFFF) {
            result += '\ufffd\ufffd\ufffd\ufffd';
          } else {
            chr -= 0x10000;
            result += String.fromCharCode(0xD800 + (chr >> 10), 0xDC00 + (chr & 0x3FF));
          }

          i += 9;
          continue;
        }
      }

      result += '\ufffd';
    }

    return result;
  });
}


decode$1.defaultChars   = ';/?:@&=+$,#';
decode$1.componentChars = '';


var decode_1 = decode$1;

var format$1 = function format(url) {
  var result = '';

  result += url.protocol || '';
  result += url.slashes ? '//' : '';
  result += url.auth ? url.auth + '@' : '';

  if (url.hostname && url.hostname.indexOf(':') !== -1) {
    // ipv6 address
    result += '[' + url.hostname + ']';
  } else {
    result += url.hostname || '';
  }

  result += url.port ? ':' + url.port : '';
  result += url.pathname || '';
  result += url.search || '';
  result += url.hash || '';

  return result;
};

// Copyright Joyent, Inc. and other Node contributors.

//
// Changes from joyent/node:
//
// 1. No leading slash in paths,
//    e.g. in `url.parse('http://foo?bar')` pathname is ``, not `/`
//
// 2. Backslashes are not replaced with slashes,
//    so `http:\\example.org\` is treated like a relative path
//
// 3. Trailing colon is treated like a part of the path,
//    i.e. in `http://example.org:foo` pathname is `:foo`
//
// 4. Nothing is URL-encoded in the resulting object,
//    (in joyent/node some chars in auth and paths are encoded)
//
// 5. `url.parse()` does not have `parseQueryString` argument
//
// 6. Removed extraneous result properties: `host`, `path`, `query`, etc.,
//    which can be constructed using other parts of the url.
//


function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.pathname = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = [ '<', '>', '"', '`', ' ', '\r', '\n', '\t' ],

    // RFC 2396: characters not allowed for various reasons.
    unwise = [ '{', '}', '|', '\\', '^', '`' ].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = [ '\'' ].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = [ '%', '/', '?', ';', '#' ].concat(autoEscape),
    hostEndingChars = [ '/', '?', '#' ],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    /* eslint-disable no-script-url */
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    };
    /* eslint-enable no-script-url */

function urlParse(url, slashesDenoteHost) {
  if (url && url instanceof Url) { return url; }

  var u = new Url();
  u.parse(url, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, slashesDenoteHost) {
  var i, l, lowerProto, hec, slashes,
      rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    lowerProto = proto.toLowerCase();
    this.protocol = proto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (i = 0; i < hostEndingChars.length; i++) {
      hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
        hostEnd = hec;
      }
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = auth;
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (i = 0; i < nonHostChars.length; i++) {
      hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
        hostEnd = hec;
      }
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1) {
      hostEnd = rest.length;
    }

    if (rest[hostEnd - 1] === ':') { hostEnd--; }
    var host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost(host);

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) { continue; }
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    }

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
    }
  }

  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    rest = rest.slice(0, qm);
  }
  if (rest) { this.pathname = rest; }
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '';
  }

  return this;
};

Url.prototype.parseHost = function(host) {
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) { this.hostname = host; }
};

var parse$1 = urlParse;

var encode = encode_1;
var decode = decode_1;
var format = format$1;
var parse  = parse$1;

var mdurl = {
	encode: encode,
	decode: decode,
	format: format,
	parse: parse
};

var regex$3=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;

var regex$2=/[\0-\x1F\x7F-\x9F]/;

var regex$1=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/;

var regex=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;

var Any = regex$3;
var Cc  = regex$2;
var Cf  = regex$1;
var P   = regex$4;
var Z   = regex;

var uc_micro = {
	Any: Any,
	Cc: Cc,
	Cf: Cf,
	P: P,
	Z: Z
};

var utils$1 = createCommonjsModule(function (module, exports) {


function _class(obj) { return Object.prototype.toString.call(obj); }

function isString(obj) { return _class(obj) === '[object String]'; }

var _hasOwnProperty = Object.prototype.hasOwnProperty;

function has(object, key) {
  return _hasOwnProperty.call(object, key);
}

// Merge objects
//
function assign(obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);

  sources.forEach(function (source) {
    if (!source) { return; }

    if (typeof source !== 'object') {
      throw new TypeError(source + 'must be object');
    }

    Object.keys(source).forEach(function (key) {
      obj[key] = source[key];
    });
  });

  return obj;
}

// Remove element from array and put another array at those position.
// Useful for some operations with tokens
function arrayReplaceAt(src, pos, newElements) {
  return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1));
}

////////////////////////////////////////////////////////////////////////////////

function isValidEntityCode(c) {
  /*eslint no-bitwise:0*/
  // broken sequence
  if (c >= 0xD800 && c <= 0xDFFF) { return false; }
  // never used
  if (c >= 0xFDD0 && c <= 0xFDEF) { return false; }
  if ((c & 0xFFFF) === 0xFFFF || (c & 0xFFFF) === 0xFFFE) { return false; }
  // control codes
  if (c >= 0x00 && c <= 0x08) { return false; }
  if (c === 0x0B) { return false; }
  if (c >= 0x0E && c <= 0x1F) { return false; }
  if (c >= 0x7F && c <= 0x9F) { return false; }
  // out of range
  if (c > 0x10FFFF) { return false; }
  return true;
}

function fromCodePoint(c) {
  /*eslint no-bitwise:0*/
  if (c > 0xffff) {
    c -= 0x10000;
    var surrogate1 = 0xd800 + (c >> 10),
        surrogate2 = 0xdc00 + (c & 0x3ff);

    return String.fromCharCode(surrogate1, surrogate2);
  }
  return String.fromCharCode(c);
}


var UNESCAPE_MD_RE  = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g;
var ENTITY_RE       = /&([a-z#][a-z0-9]{1,31});/gi;
var UNESCAPE_ALL_RE = new RegExp(UNESCAPE_MD_RE.source + '|' + ENTITY_RE.source, 'gi');

var DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i;



function replaceEntityPattern(match, name) {
  var code = 0;

  if (has(entities, name)) {
    return entities[name];
  }

  if (name.charCodeAt(0) === 0x23/* # */ && DIGITAL_ENTITY_TEST_RE.test(name)) {
    code = name[1].toLowerCase() === 'x' ?
      parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);

    if (isValidEntityCode(code)) {
      return fromCodePoint(code);
    }
  }

  return match;
}

/*function replaceEntities(str) {
  if (str.indexOf('&') < 0) { return str; }

  return str.replace(ENTITY_RE, replaceEntityPattern);
}*/

function unescapeMd(str) {
  if (str.indexOf('\\') < 0) { return str; }
  return str.replace(UNESCAPE_MD_RE, '$1');
}

function unescapeAll(str) {
  if (str.indexOf('\\') < 0 && str.indexOf('&') < 0) { return str; }

  return str.replace(UNESCAPE_ALL_RE, function (match, escaped, entity) {
    if (escaped) { return escaped; }
    return replaceEntityPattern(match, entity);
  });
}

////////////////////////////////////////////////////////////////////////////////

var HTML_ESCAPE_TEST_RE = /[&<>"]/;
var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
var HTML_REPLACEMENTS = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;'
};

function replaceUnsafeChar(ch) {
  return HTML_REPLACEMENTS[ch];
}

function escapeHtml(str) {
  if (HTML_ESCAPE_TEST_RE.test(str)) {
    return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
  }
  return str;
}

////////////////////////////////////////////////////////////////////////////////

var REGEXP_ESCAPE_RE = /[.?*+^$[\]\\(){}|-]/g;

function escapeRE(str) {
  return str.replace(REGEXP_ESCAPE_RE, '\\$&');
}

////////////////////////////////////////////////////////////////////////////////

function isSpace(code) {
  switch (code) {
    case 0x09:
    case 0x20:
      return true;
  }
  return false;
}

// Zs (unicode class) || [\t\f\v\r\n]
function isWhiteSpace(code) {
  if (code >= 0x2000 && code <= 0x200A) { return true; }
  switch (code) {
    case 0x09: // \t
    case 0x0A: // \n
    case 0x0B: // \v
    case 0x0C: // \f
    case 0x0D: // \r
    case 0x20:
    case 0xA0:
    case 0x1680:
    case 0x202F:
    case 0x205F:
    case 0x3000:
      return true;
  }
  return false;
}

////////////////////////////////////////////////////////////////////////////////

/*eslint-disable max-len*/


// Currently without astral characters support.
function isPunctChar(ch) {
  return regex$4.test(ch);
}


// Markdown ASCII punctuation characters.
//
// !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~
// http://spec.commonmark.org/0.15/#ascii-punctuation-character
//
// Don't confuse with unicode punctuation !!! It lacks some chars in ascii range.
//
function isMdAsciiPunct(ch) {
  switch (ch) {
    case 0x21/* ! */:
    case 0x22/* " */:
    case 0x23/* # */:
    case 0x24/* $ */:
    case 0x25/* % */:
    case 0x26/* & */:
    case 0x27/* ' */:
    case 0x28/* ( */:
    case 0x29/* ) */:
    case 0x2A/* * */:
    case 0x2B/* + */:
    case 0x2C/* , */:
    case 0x2D/* - */:
    case 0x2E/* . */:
    case 0x2F/* / */:
    case 0x3A/* : */:
    case 0x3B/* ; */:
    case 0x3C/* < */:
    case 0x3D/* = */:
    case 0x3E/* > */:
    case 0x3F/* ? */:
    case 0x40/* @ */:
    case 0x5B/* [ */:
    case 0x5C/* \ */:
    case 0x5D/* ] */:
    case 0x5E/* ^ */:
    case 0x5F/* _ */:
    case 0x60/* ` */:
    case 0x7B/* { */:
    case 0x7C/* | */:
    case 0x7D/* } */:
    case 0x7E/* ~ */:
      return true;
    default:
      return false;
  }
}

// Hepler to unify [reference labels].
//
function normalizeReference(str) {
  // Trim and collapse whitespace
  //
  str = str.trim().replace(/\s+/g, ' ');

  // In node v10 'ẞ'.toLowerCase() === 'Ṿ', which is presumed to be a bug
  // fixed in v12 (couldn't find any details).
  //
  // So treat this one as a special case
  // (remove this when node v10 is no longer supported).
  //
  if ('ẞ'.toLowerCase() === 'Ṿ') {
    str = str.replace(/ẞ/g, 'ß');
  }

  // .toLowerCase().toUpperCase() should get rid of all differences
  // between letter variants.
  //
  // Simple .toLowerCase() doesn't normalize 125 code points correctly,
  // and .toUpperCase doesn't normalize 6 of them (list of exceptions:
  // İ, ϴ, ẞ, Ω, K, Å - those are already uppercased, but have differently
  // uppercased versions).
  //
  // Here's an example showing how it happens. Lets take greek letter omega:
  // uppercase U+0398 (Θ), U+03f4 (ϴ) and lowercase U+03b8 (θ), U+03d1 (ϑ)
  //
  // Unicode entries:
  // 0398;GREEK CAPITAL LETTER THETA;Lu;0;L;;;;;N;;;;03B8;
  // 03B8;GREEK SMALL LETTER THETA;Ll;0;L;;;;;N;;;0398;;0398
  // 03D1;GREEK THETA SYMBOL;Ll;0;L;<compat> 03B8;;;;N;GREEK SMALL LETTER SCRIPT THETA;;0398;;0398
  // 03F4;GREEK CAPITAL THETA SYMBOL;Lu;0;L;<compat> 0398;;;;N;;;;03B8;
  //
  // Case-insensitive comparison should treat all of them as equivalent.
  //
  // But .toLowerCase() doesn't change ϑ (it's already lowercase),
  // and .toUpperCase() doesn't change ϴ (already uppercase).
  //
  // Applying first lower then upper case normalizes any character:
  // '\u0398\u03f4\u03b8\u03d1'.toLowerCase().toUpperCase() === '\u0398\u0398\u0398\u0398'
  //
  // Note: this is equivalent to unicode case folding; unicode normalization
  // is a different step that is not required here.
  //
  // Final result should be uppercased, because it's later stored in an object
  // (this avoid a conflict with Object.prototype members,
  // most notably, `__proto__`)
  //
  return str.toLowerCase().toUpperCase();
}

////////////////////////////////////////////////////////////////////////////////

// Re-export libraries commonly used in both markdown-it and its plugins,
// so plugins won't have to depend on them explicitly, which reduces their
// bundled size (e.g. a browser build).
//
exports.lib                 = {};
exports.lib.mdurl           = mdurl;
exports.lib.ucmicro         = uc_micro;

exports.assign              = assign;
exports.isString            = isString;
exports.has                 = has;
exports.unescapeMd          = unescapeMd;
exports.unescapeAll         = unescapeAll;
exports.isValidEntityCode   = isValidEntityCode;
exports.fromCodePoint       = fromCodePoint;
// exports.replaceEntities     = replaceEntities;
exports.escapeHtml          = escapeHtml;
exports.arrayReplaceAt      = arrayReplaceAt;
exports.isSpace             = isSpace;
exports.isWhiteSpace        = isWhiteSpace;
exports.isMdAsciiPunct      = isMdAsciiPunct;
exports.isPunctChar         = isPunctChar;
exports.escapeRE            = escapeRE;
exports.normalizeReference  = normalizeReference;
});

// Parse link label

var parse_link_label = function parseLinkLabel(state, start, disableNested) {
  var level, found, marker, prevPos,
      labelEnd = -1,
      max = state.posMax,
      oldPos = state.pos;

  state.pos = start + 1;
  level = 1;

  while (state.pos < max) {
    marker = state.src.charCodeAt(state.pos);
    if (marker === 0x5D /* ] */) {
      level--;
      if (level === 0) {
        found = true;
        break;
      }
    }

    prevPos = state.pos;
    state.md.inline.skipToken(state);
    if (marker === 0x5B /* [ */) {
      if (prevPos === state.pos - 1) {
        // increase level if we find text `[`, which is not a part of any token
        level++;
      } else if (disableNested) {
        state.pos = oldPos;
        return -1;
      }
    }
  }

  if (found) {
    labelEnd = state.pos;
  }

  // restore old state
  state.pos = oldPos;

  return labelEnd;
};

var unescapeAll$2 = utils$1.unescapeAll;


var parse_link_destination = function parseLinkDestination(str, pos, max) {
  var code, level,
      lines = 0,
      start = pos,
      result = {
        ok: false,
        pos: 0,
        lines: 0,
        str: ''
      };

  if (str.charCodeAt(pos) === 0x3C /* < */) {
    pos++;
    while (pos < max) {
      code = str.charCodeAt(pos);
      if (code === 0x0A /* \n */) { return result; }
      if (code === 0x3C /* < */) { return result; }
      if (code === 0x3E /* > */) {
        result.pos = pos + 1;
        result.str = unescapeAll$2(str.slice(start + 1, pos));
        result.ok = true;
        return result;
      }
      if (code === 0x5C /* \ */ && pos + 1 < max) {
        pos += 2;
        continue;
      }

      pos++;
    }

    // no closing '>'
    return result;
  }

  // this should be ... } else { ... branch

  level = 0;
  while (pos < max) {
    code = str.charCodeAt(pos);

    if (code === 0x20) { break; }

    // ascii control characters
    if (code < 0x20 || code === 0x7F) { break; }

    if (code === 0x5C /* \ */ && pos + 1 < max) {
      if (str.charCodeAt(pos + 1) === 0x20) { break; }
      pos += 2;
      continue;
    }

    if (code === 0x28 /* ( */) {
      level++;
      if (level > 32) { return result; }
    }

    if (code === 0x29 /* ) */) {
      if (level === 0) { break; }
      level--;
    }

    pos++;
  }

  if (start === pos) { return result; }
  if (level !== 0) { return result; }

  result.str = unescapeAll$2(str.slice(start, pos));
  result.lines = lines;
  result.pos = pos;
  result.ok = true;
  return result;
};

var unescapeAll$1 = utils$1.unescapeAll;


var parse_link_title = function parseLinkTitle(str, pos, max) {
  var code,
      marker,
      lines = 0,
      start = pos,
      result = {
        ok: false,
        pos: 0,
        lines: 0,
        str: ''
      };

  if (pos >= max) { return result; }

  marker = str.charCodeAt(pos);

  if (marker !== 0x22 /* " */ && marker !== 0x27 /* ' */ && marker !== 0x28 /* ( */) { return result; }

  pos++;

  // if opening marker is "(", switch it to closing marker ")"
  if (marker === 0x28) { marker = 0x29; }

  while (pos < max) {
    code = str.charCodeAt(pos);
    if (code === marker) {
      result.pos = pos + 1;
      result.lines = lines;
      result.str = unescapeAll$1(str.slice(start + 1, pos));
      result.ok = true;
      return result;
    } else if (code === 0x28 /* ( */ && marker === 0x29 /* ) */) {
      return result;
    } else if (code === 0x0A) {
      lines++;
    } else if (code === 0x5C /* \ */ && pos + 1 < max) {
      pos++;
      if (str.charCodeAt(pos) === 0x0A) {
        lines++;
      }
    }

    pos++;
  }

  return result;
};

var parseLinkLabel       = parse_link_label;
var parseLinkDestination = parse_link_destination;
var parseLinkTitle       = parse_link_title;

var helpers = {
	parseLinkLabel: parseLinkLabel,
	parseLinkDestination: parseLinkDestination,
	parseLinkTitle: parseLinkTitle
};

var assign$1          = utils$1.assign;
var unescapeAll     = utils$1.unescapeAll;
var escapeHtml      = utils$1.escapeHtml;


////////////////////////////////////////////////////////////////////////////////

var default_rules = {};


default_rules.code_inline = function (tokens, idx, options, env, slf) {
  var token = tokens[idx];

  return  '<code' + slf.renderAttrs(token) + '>' +
          escapeHtml(tokens[idx].content) +
          '</code>';
};


default_rules.code_block = function (tokens, idx, options, env, slf) {
  var token = tokens[idx];

  return  '<pre' + slf.renderAttrs(token) + '><code>' +
          escapeHtml(tokens[idx].content) +
          '</code></pre>\n';
};


default_rules.fence = function (tokens, idx, options, env, slf) {
  var token = tokens[idx],
      info = token.info ? unescapeAll(token.info).trim() : '',
      langName = '',
      langAttrs = '',
      highlighted, i, arr, tmpAttrs, tmpToken;

  if (info) {
    arr = info.split(/(\s+)/g);
    langName = arr[0];
    langAttrs = arr.slice(2).join('');
  }

  if (options.highlight) {
    highlighted = options.highlight(token.content, langName, langAttrs) || escapeHtml(token.content);
  } else {
    highlighted = escapeHtml(token.content);
  }

  if (highlighted.indexOf('<pre') === 0) {
    return highlighted + '\n';
  }

  // If language exists, inject class gently, without modifying original token.
  // May be, one day we will add .deepClone() for token and simplify this part, but
  // now we prefer to keep things local.
  if (info) {
    i        = token.attrIndex('class');
    tmpAttrs = token.attrs ? token.attrs.slice() : [];

    if (i < 0) {
      tmpAttrs.push([ 'class', options.langPrefix + langName ]);
    } else {
      tmpAttrs[i] = tmpAttrs[i].slice();
      tmpAttrs[i][1] += ' ' + options.langPrefix + langName;
    }

    // Fake token just to render attributes
    tmpToken = {
      attrs: tmpAttrs
    };

    return  '<pre><code' + slf.renderAttrs(tmpToken) + '>'
          + highlighted
          + '</code></pre>\n';
  }


  return  '<pre><code' + slf.renderAttrs(token) + '>'
        + highlighted
        + '</code></pre>\n';
};


default_rules.image = function (tokens, idx, options, env, slf) {
  var token = tokens[idx];

  // "alt" attr MUST be set, even if empty. Because it's mandatory and
  // should be placed on proper position for tests.
  //
  // Replace content with actual value

  token.attrs[token.attrIndex('alt')][1] =
    slf.renderInlineAsText(token.children, options, env);

  return slf.renderToken(tokens, idx, options);
};


default_rules.hardbreak = function (tokens, idx, options /*, env */) {
  return options.xhtmlOut ? '<br />\n' : '<br>\n';
};
default_rules.softbreak = function (tokens, idx, options /*, env */) {
  return options.breaks ? (options.xhtmlOut ? '<br />\n' : '<br>\n') : '\n';
};


default_rules.text = function (tokens, idx /*, options, env */) {
  return escapeHtml(tokens[idx].content);
};


default_rules.html_block = function (tokens, idx /*, options, env */) {
  return tokens[idx].content;
};
default_rules.html_inline = function (tokens, idx /*, options, env */) {
  return tokens[idx].content;
};


/**
 * new Renderer()
 *
 * Creates new [[Renderer]] instance and fill [[Renderer#rules]] with defaults.
 **/
function Renderer() {

  /**
   * Renderer#rules -> Object
   *
   * Contains render rules for tokens. Can be updated and extended.
   *
   * ##### Example
   *
   * ```javascript
   * var md = require('markdown-it')();
   *
   * md.renderer.rules.strong_open  = function () { return '<b>'; };
   * md.renderer.rules.strong_close = function () { return '</b>'; };
   *
   * var result = md.renderInline(...);
   * ```
   *
   * Each rule is called as independent static function with fixed signature:
   *
   * ```javascript
   * function my_token_render(tokens, idx, options, env, renderer) {
   *   // ...
   *   return renderedHTML;
   * }
   * ```
   *
   * See [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js)
   * for more details and examples.
   **/
  this.rules = assign$1({}, default_rules);
}


/**
 * Renderer.renderAttrs(token) -> String
 *
 * Render token attributes to string.
 **/
Renderer.prototype.renderAttrs = function renderAttrs(token) {
  var i, l, result;

  if (!token.attrs) { return ''; }

  result = '';

  for (i = 0, l = token.attrs.length; i < l; i++) {
    result += ' ' + escapeHtml(token.attrs[i][0]) + '="' + escapeHtml(token.attrs[i][1]) + '"';
  }

  return result;
};


/**
 * Renderer.renderToken(tokens, idx, options) -> String
 * - tokens (Array): list of tokens
 * - idx (Numbed): token index to render
 * - options (Object): params of parser instance
 *
 * Default token renderer. Can be overriden by custom function
 * in [[Renderer#rules]].
 **/
Renderer.prototype.renderToken = function renderToken(tokens, idx, options) {
  var nextToken,
      result = '',
      needLf = false,
      token = tokens[idx];

  // Tight list paragraphs
  if (token.hidden) {
    return '';
  }

  // Insert a newline between hidden paragraph and subsequent opening
  // block-level tag.
  //
  // For example, here we should insert a newline before blockquote:
  //  - a
  //    >
  //
  if (token.block && token.nesting !== -1 && idx && tokens[idx - 1].hidden) {
    result += '\n';
  }

  // Add token name, e.g. `<img`
  result += (token.nesting === -1 ? '</' : '<') + token.tag;

  // Encode attributes, e.g. `<img src="foo"`
  result += this.renderAttrs(token);

  // Add a slash for self-closing tags, e.g. `<img src="foo" /`
  if (token.nesting === 0 && options.xhtmlOut) {
    result += ' /';
  }

  // Check if we need to add a newline after this tag
  if (token.block) {
    needLf = true;

    if (token.nesting === 1) {
      if (idx + 1 < tokens.length) {
        nextToken = tokens[idx + 1];

        if (nextToken.type === 'inline' || nextToken.hidden) {
          // Block-level tag containing an inline tag.
          //
          needLf = false;

        } else if (nextToken.nesting === -1 && nextToken.tag === token.tag) {
          // Opening tag + closing tag of the same type. E.g. `<li></li>`.
          //
          needLf = false;
        }
      }
    }
  }

  result += needLf ? '>\n' : '>';

  return result;
};


/**
 * Renderer.renderInline(tokens, options, env) -> String
 * - tokens (Array): list on block tokens to renter
 * - options (Object): params of parser instance
 * - env (Object): additional data from parsed input (references, for example)
 *
 * The same as [[Renderer.render]], but for single token of `inline` type.
 **/
Renderer.prototype.renderInline = function (tokens, options, env) {
  var type,
      result = '',
      rules = this.rules;

  for (var i = 0, len = tokens.length; i < len; i++) {
    type = tokens[i].type;

    if (typeof rules[type] !== 'undefined') {
      result += rules[type](tokens, i, options, env, this);
    } else {
      result += this.renderToken(tokens, i, options);
    }
  }

  return result;
};


/** internal
 * Renderer.renderInlineAsText(tokens, options, env) -> String
 * - tokens (Array): list on block tokens to renter
 * - options (Object): params of parser instance
 * - env (Object): additional data from parsed input (references, for example)
 *
 * Special kludge for image `alt` attributes to conform CommonMark spec.
 * Don't try to use it! Spec requires to show `alt` content with stripped markup,
 * instead of simple escaping.
 **/
Renderer.prototype.renderInlineAsText = function (tokens, options, env) {
  var result = '';

  for (var i = 0, len = tokens.length; i < len; i++) {
    if (tokens[i].type === 'text') {
      result += tokens[i].content;
    } else if (tokens[i].type === 'image') {
      result += this.renderInlineAsText(tokens[i].children, options, env);
    } else if (tokens[i].type === 'softbreak') {
      result += '\n';
    }
  }

  return result;
};


/**
 * Renderer.render(tokens, options, env) -> String
 * - tokens (Array): list on block tokens to renter
 * - options (Object): params of parser instance
 * - env (Object): additional data from parsed input (references, for example)
 *
 * Takes token stream and generates HTML. Probably, you will never need to call
 * this method directly.
 **/
Renderer.prototype.render = function (tokens, options, env) {
  var i, len, type,
      result = '',
      rules = this.rules;

  for (i = 0, len = tokens.length; i < len; i++) {
    type = tokens[i].type;

    if (type === 'inline') {
      result += this.renderInline(tokens[i].children, options, env);
    } else if (typeof rules[type] !== 'undefined') {
      result += rules[tokens[i].type](tokens, i, options, env, this);
    } else {
      result += this.renderToken(tokens, i, options, env);
    }
  }

  return result;
};

var renderer = Renderer;

/**
 * class Ruler
 *
 * Helper class, used by [[MarkdownIt#core]], [[MarkdownIt#block]] and
 * [[MarkdownIt#inline]] to manage sequences of functions (rules):
 *
 * - keep rules in defined order
 * - assign the name to each rule
 * - enable/disable rules
 * - add/replace rules
 * - allow assign rules to additional named chains (in the same)
 * - cacheing lists of active rules
 *
 * You will not need use this class directly until write plugins. For simple
 * rules control use [[MarkdownIt.disable]], [[MarkdownIt.enable]] and
 * [[MarkdownIt.use]].
 **/


/**
 * new Ruler()
 **/
function Ruler() {
  // List of added rules. Each element is:
  //
  // {
  //   name: XXX,
  //   enabled: Boolean,
  //   fn: Function(),
  //   alt: [ name2, name3 ]
  // }
  //
  this.__rules__ = [];

  // Cached rule chains.
  //
  // First level - chain name, '' for default.
  // Second level - diginal anchor for fast filtering by charcodes.
  //
  this.__cache__ = null;
}

////////////////////////////////////////////////////////////////////////////////
// Helper methods, should not be used directly


// Find rule index by name
//
Ruler.prototype.__find__ = function (name) {
  for (var i = 0; i < this.__rules__.length; i++) {
    if (this.__rules__[i].name === name) {
      return i;
    }
  }
  return -1;
};


// Build rules lookup cache
//
Ruler.prototype.__compile__ = function () {
  var self = this;
  var chains = [ '' ];

  // collect unique names
  self.__rules__.forEach(function (rule) {
    if (!rule.enabled) { return; }

    rule.alt.forEach(function (altName) {
      if (chains.indexOf(altName) < 0) {
        chains.push(altName);
      }
    });
  });

  self.__cache__ = {};

  chains.forEach(function (chain) {
    self.__cache__[chain] = [];
    self.__rules__.forEach(function (rule) {
      if (!rule.enabled) { return; }

      if (chain && rule.alt.indexOf(chain) < 0) { return; }

      self.__cache__[chain].push(rule.fn);
    });
  });
};


/**
 * Ruler.at(name, fn [, options])
 * - name (String): rule name to replace.
 * - fn (Function): new rule function.
 * - options (Object): new rule options (not mandatory).
 *
 * Replace rule by name with new function & options. Throws error if name not
 * found.
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * Replace existing typographer replacement rule with new one:
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.core.ruler.at('replacements', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.at = function (name, fn, options) {
  var index = this.__find__(name);
  var opt = options || {};

  if (index === -1) { throw new Error('Parser rule not found: ' + name); }

  this.__rules__[index].fn = fn;
  this.__rules__[index].alt = opt.alt || [];
  this.__cache__ = null;
};


/**
 * Ruler.before(beforeName, ruleName, fn [, options])
 * - beforeName (String): new rule will be added before this one.
 * - ruleName (String): name of added rule.
 * - fn (Function): rule function.
 * - options (Object): rule options (not mandatory).
 *
 * Add new rule to chain before one with given name. See also
 * [[Ruler.after]], [[Ruler.push]].
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.block.ruler.before('paragraph', 'my_rule', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.before = function (beforeName, ruleName, fn, options) {
  var index = this.__find__(beforeName);
  var opt = options || {};

  if (index === -1) { throw new Error('Parser rule not found: ' + beforeName); }

  this.__rules__.splice(index, 0, {
    name: ruleName,
    enabled: true,
    fn: fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};


/**
 * Ruler.after(afterName, ruleName, fn [, options])
 * - afterName (String): new rule will be added after this one.
 * - ruleName (String): name of added rule.
 * - fn (Function): rule function.
 * - options (Object): rule options (not mandatory).
 *
 * Add new rule to chain after one with given name. See also
 * [[Ruler.before]], [[Ruler.push]].
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.inline.ruler.after('text', 'my_rule', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.after = function (afterName, ruleName, fn, options) {
  var index = this.__find__(afterName);
  var opt = options || {};

  if (index === -1) { throw new Error('Parser rule not found: ' + afterName); }

  this.__rules__.splice(index + 1, 0, {
    name: ruleName,
    enabled: true,
    fn: fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};

/**
 * Ruler.push(ruleName, fn [, options])
 * - ruleName (String): name of added rule.
 * - fn (Function): rule function.
 * - options (Object): rule options (not mandatory).
 *
 * Push new rule to the end of chain. See also
 * [[Ruler.before]], [[Ruler.after]].
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.core.ruler.push('my_rule', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.push = function (ruleName, fn, options) {
  var opt = options || {};

  this.__rules__.push({
    name: ruleName,
    enabled: true,
    fn: fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};


/**
 * Ruler.enable(list [, ignoreInvalid]) -> Array
 * - list (String|Array): list of rule names to enable.
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Enable rules with given names. If any rule name not found - throw Error.
 * Errors can be disabled by second param.
 *
 * Returns list of found rule names (if no exception happened).
 *
 * See also [[Ruler.disable]], [[Ruler.enableOnly]].
 **/
Ruler.prototype.enable = function (list, ignoreInvalid) {
  if (!Array.isArray(list)) { list = [ list ]; }

  var result = [];

  // Search by name and enable
  list.forEach(function (name) {
    var idx = this.__find__(name);

    if (idx < 0) {
      if (ignoreInvalid) { return; }
      throw new Error('Rules manager: invalid rule name ' + name);
    }
    this.__rules__[idx].enabled = true;
    result.push(name);
  }, this);

  this.__cache__ = null;
  return result;
};


/**
 * Ruler.enableOnly(list [, ignoreInvalid])
 * - list (String|Array): list of rule names to enable (whitelist).
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Enable rules with given names, and disable everything else. If any rule name
 * not found - throw Error. Errors can be disabled by second param.
 *
 * See also [[Ruler.disable]], [[Ruler.enable]].
 **/
Ruler.prototype.enableOnly = function (list, ignoreInvalid) {
  if (!Array.isArray(list)) { list = [ list ]; }

  this.__rules__.forEach(function (rule) { rule.enabled = false; });

  this.enable(list, ignoreInvalid);
};


/**
 * Ruler.disable(list [, ignoreInvalid]) -> Array
 * - list (String|Array): list of rule names to disable.
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Disable rules with given names. If any rule name not found - throw Error.
 * Errors can be disabled by second param.
 *
 * Returns list of found rule names (if no exception happened).
 *
 * See also [[Ruler.enable]], [[Ruler.enableOnly]].
 **/
Ruler.prototype.disable = function (list, ignoreInvalid) {
  if (!Array.isArray(list)) { list = [ list ]; }

  var result = [];

  // Search by name and disable
  list.forEach(function (name) {
    var idx = this.__find__(name);

    if (idx < 0) {
      if (ignoreInvalid) { return; }
      throw new Error('Rules manager: invalid rule name ' + name);
    }
    this.__rules__[idx].enabled = false;
    result.push(name);
  }, this);

  this.__cache__ = null;
  return result;
};


/**
 * Ruler.getRules(chainName) -> Array
 *
 * Return array of active functions (rules) for given chain name. It analyzes
 * rules configuration, compiles caches if not exists and returns result.
 *
 * Default chain name is `''` (empty string). It can't be skipped. That's
 * done intentionally, to keep signature monomorphic for high speed.
 **/
Ruler.prototype.getRules = function (chainName) {
  if (this.__cache__ === null) {
    this.__compile__();
  }

  // Chain can be empty, if rules disabled. But we still have to return Array.
  return this.__cache__[chainName] || [];
};

var ruler = Ruler;

// Normalize input string


// https://spec.commonmark.org/0.29/#line-ending
var NEWLINES_RE  = /\r\n?|\n/g;
var NULL_RE      = /\0/g;


var normalize = function normalize(state) {
  var str;

  // Normalize newlines
  str = state.src.replace(NEWLINES_RE, '\n');

  // Replace NULL characters
  str = str.replace(NULL_RE, '\uFFFD');

  state.src = str;
};

var block = function block(state) {
  var token;

  if (state.inlineMode) {
    token          = new state.Token('inline', '', 0);
    token.content  = state.src;
    token.map      = [ 0, 1 ];
    token.children = [];
    state.tokens.push(token);
  } else {
    state.md.block.parse(state.src, state.md, state.env, state.tokens);
  }
};

var inline = function inline(state) {
  var tokens = state.tokens, tok, i, l;

  // Parse inlines
  for (i = 0, l = tokens.length; i < l; i++) {
    tok = tokens[i];
    if (tok.type === 'inline') {
      state.md.inline.parse(tok.content, state.md, state.env, tok.children);
    }
  }
};

var arrayReplaceAt = utils$1.arrayReplaceAt;


function isLinkOpen(str) {
  return /^<a[>\s]/i.test(str);
}
function isLinkClose(str) {
  return /^<\/a\s*>/i.test(str);
}


var linkify = function linkify(state) {
  var i, j, l, tokens, token, currentToken, nodes, ln, text, pos, lastPos,
      level, htmlLinkLevel, url, fullUrl, urlText,
      blockTokens = state.tokens,
      links;

  if (!state.md.options.linkify) { return; }

  for (j = 0, l = blockTokens.length; j < l; j++) {
    if (blockTokens[j].type !== 'inline' ||
        !state.md.linkify.pretest(blockTokens[j].content)) {
      continue;
    }

    tokens = blockTokens[j].children;

    htmlLinkLevel = 0;

    // We scan from the end, to keep position when new tags added.
    // Use reversed logic in links start/end match
    for (i = tokens.length - 1; i >= 0; i--) {
      currentToken = tokens[i];

      // Skip content of markdown links
      if (currentToken.type === 'link_close') {
        i--;
        while (tokens[i].level !== currentToken.level && tokens[i].type !== 'link_open') {
          i--;
        }
        continue;
      }

      // Skip content of html tag links
      if (currentToken.type === 'html_inline') {
        if (isLinkOpen(currentToken.content) && htmlLinkLevel > 0) {
          htmlLinkLevel--;
        }
        if (isLinkClose(currentToken.content)) {
          htmlLinkLevel++;
        }
      }
      if (htmlLinkLevel > 0) { continue; }

      if (currentToken.type === 'text' && state.md.linkify.test(currentToken.content)) {

        text = currentToken.content;
        links = state.md.linkify.match(text);

        // Now split string to nodes
        nodes = [];
        level = currentToken.level;
        lastPos = 0;

        for (ln = 0; ln < links.length; ln++) {

          url = links[ln].url;
          fullUrl = state.md.normalizeLink(url);
          if (!state.md.validateLink(fullUrl)) { continue; }

          urlText = links[ln].text;

          // Linkifier might send raw hostnames like "example.com", where url
          // starts with domain name. So we prepend http:// in those cases,
          // and remove it afterwards.
          //
          if (!links[ln].schema) {
            urlText = state.md.normalizeLinkText('http://' + urlText).replace(/^http:\/\//, '');
          } else if (links[ln].schema === 'mailto:' && !/^mailto:/i.test(urlText)) {
            urlText = state.md.normalizeLinkText('mailto:' + urlText).replace(/^mailto:/, '');
          } else {
            urlText = state.md.normalizeLinkText(urlText);
          }

          pos = links[ln].index;

          if (pos > lastPos) {
            token         = new state.Token('text', '', 0);
            token.content = text.slice(lastPos, pos);
            token.level   = level;
            nodes.push(token);
          }

          token         = new state.Token('link_open', 'a', 1);
          token.attrs   = [ [ 'href', fullUrl ] ];
          token.level   = level++;
          token.markup  = 'linkify';
          token.info    = 'auto';
          nodes.push(token);

          token         = new state.Token('text', '', 0);
          token.content = urlText;
          token.level   = level;
          nodes.push(token);

          token         = new state.Token('link_close', 'a', -1);
          token.level   = --level;
          token.markup  = 'linkify';
          token.info    = 'auto';
          nodes.push(token);

          lastPos = links[ln].lastIndex;
        }
        if (lastPos < text.length) {
          token         = new state.Token('text', '', 0);
          token.content = text.slice(lastPos);
          token.level   = level;
          nodes.push(token);
        }

        // replace current node
        blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, nodes);
      }
    }
  }
};

// Simple typographic replacements

// TODO:
// - fractionals 1/2, 1/4, 3/4 -> ½, ¼, ¾
// - miltiplication 2 x 4 -> 2 × 4

var RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;

// Workaround for phantomjs - need regex without /g flag,
// or root check will fail every second time
var SCOPED_ABBR_TEST_RE = /\((c|tm|r|p)\)/i;

var SCOPED_ABBR_RE = /\((c|tm|r|p)\)/ig;
var SCOPED_ABBR = {
  c: '©',
  r: '®',
  p: '§',
  tm: '™'
};

function replaceFn(match, name) {
  return SCOPED_ABBR[name.toLowerCase()];
}

function replace_scoped(inlineTokens) {
  var i, token, inside_autolink = 0;

  for (i = inlineTokens.length - 1; i >= 0; i--) {
    token = inlineTokens[i];

    if (token.type === 'text' && !inside_autolink) {
      token.content = token.content.replace(SCOPED_ABBR_RE, replaceFn);
    }

    if (token.type === 'link_open' && token.info === 'auto') {
      inside_autolink--;
    }

    if (token.type === 'link_close' && token.info === 'auto') {
      inside_autolink++;
    }
  }
}

function replace_rare(inlineTokens) {
  var i, token, inside_autolink = 0;

  for (i = inlineTokens.length - 1; i >= 0; i--) {
    token = inlineTokens[i];

    if (token.type === 'text' && !inside_autolink) {
      if (RARE_RE.test(token.content)) {
        token.content = token.content
          .replace(/\+-/g, '±')
          // .., ..., ....... -> …
          // but ?..... & !..... -> ?.. & !..
          .replace(/\.{2,}/g, '…').replace(/([?!])…/g, '$1..')
          .replace(/([?!]){4,}/g, '$1$1$1').replace(/,{2,}/g, ',')
          // em-dash
          .replace(/(^|[^-])---(?=[^-]|$)/mg, '$1\u2014')
          // en-dash
          .replace(/(^|\s)--(?=\s|$)/mg, '$1\u2013')
          .replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, '$1\u2013');
      }
    }

    if (token.type === 'link_open' && token.info === 'auto') {
      inside_autolink--;
    }

    if (token.type === 'link_close' && token.info === 'auto') {
      inside_autolink++;
    }
  }
}


var replacements = function replace(state) {
  var blkIdx;

  if (!state.md.options.typographer) { return; }

  for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {

    if (state.tokens[blkIdx].type !== 'inline') { continue; }

    if (SCOPED_ABBR_TEST_RE.test(state.tokens[blkIdx].content)) {
      replace_scoped(state.tokens[blkIdx].children);
    }

    if (RARE_RE.test(state.tokens[blkIdx].content)) {
      replace_rare(state.tokens[blkIdx].children);
    }

  }
};

var isWhiteSpace$1   = utils$1.isWhiteSpace;
var isPunctChar$1    = utils$1.isPunctChar;
var isMdAsciiPunct$1 = utils$1.isMdAsciiPunct;

var QUOTE_TEST_RE = /['"]/;
var QUOTE_RE = /['"]/g;
var APOSTROPHE = '\u2019'; /* ’ */


function replaceAt(str, index, ch) {
  return str.substr(0, index) + ch + str.substr(index + 1);
}

function process_inlines(tokens, state) {
  var i, token, text, t, pos, max, thisLevel, item, lastChar, nextChar,
      isLastPunctChar, isNextPunctChar, isLastWhiteSpace, isNextWhiteSpace,
      canOpen, canClose, j, isSingle, stack, openQuote, closeQuote;

  stack = [];

  for (i = 0; i < tokens.length; i++) {
    token = tokens[i];

    thisLevel = tokens[i].level;

    for (j = stack.length - 1; j >= 0; j--) {
      if (stack[j].level <= thisLevel) { break; }
    }
    stack.length = j + 1;

    if (token.type !== 'text') { continue; }

    text = token.content;
    pos = 0;
    max = text.length;

    /*eslint no-labels:0,block-scoped-var:0*/
    OUTER:
    while (pos < max) {
      QUOTE_RE.lastIndex = pos;
      t = QUOTE_RE.exec(text);
      if (!t) { break; }

      canOpen = canClose = true;
      pos = t.index + 1;
      isSingle = (t[0] === "'");

      // Find previous character,
      // default to space if it's the beginning of the line
      //
      lastChar = 0x20;

      if (t.index - 1 >= 0) {
        lastChar = text.charCodeAt(t.index - 1);
      } else {
        for (j = i - 1; j >= 0; j--) {
          if (tokens[j].type === 'softbreak' || tokens[j].type === 'hardbreak') break; // lastChar defaults to 0x20
          if (!tokens[j].content) continue; // should skip all tokens except 'text', 'html_inline' or 'code_inline'

          lastChar = tokens[j].content.charCodeAt(tokens[j].content.length - 1);
          break;
        }
      }

      // Find next character,
      // default to space if it's the end of the line
      //
      nextChar = 0x20;

      if (pos < max) {
        nextChar = text.charCodeAt(pos);
      } else {
        for (j = i + 1; j < tokens.length; j++) {
          if (tokens[j].type === 'softbreak' || tokens[j].type === 'hardbreak') break; // nextChar defaults to 0x20
          if (!tokens[j].content) continue; // should skip all tokens except 'text', 'html_inline' or 'code_inline'

          nextChar = tokens[j].content.charCodeAt(0);
          break;
        }
      }

      isLastPunctChar = isMdAsciiPunct$1(lastChar) || isPunctChar$1(String.fromCharCode(lastChar));
      isNextPunctChar = isMdAsciiPunct$1(nextChar) || isPunctChar$1(String.fromCharCode(nextChar));

      isLastWhiteSpace = isWhiteSpace$1(lastChar);
      isNextWhiteSpace = isWhiteSpace$1(nextChar);

      if (isNextWhiteSpace) {
        canOpen = false;
      } else if (isNextPunctChar) {
        if (!(isLastWhiteSpace || isLastPunctChar)) {
          canOpen = false;
        }
      }

      if (isLastWhiteSpace) {
        canClose = false;
      } else if (isLastPunctChar) {
        if (!(isNextWhiteSpace || isNextPunctChar)) {
          canClose = false;
        }
      }

      if (nextChar === 0x22 /* " */ && t[0] === '"') {
        if (lastChar >= 0x30 /* 0 */ && lastChar <= 0x39 /* 9 */) {
          // special case: 1"" - count first quote as an inch
          canClose = canOpen = false;
        }
      }

      if (canOpen && canClose) {
        // Replace quotes in the middle of punctuation sequence, but not
        // in the middle of the words, i.e.:
        //
        // 1. foo " bar " baz - not replaced
        // 2. foo-"-bar-"-baz - replaced
        // 3. foo"bar"baz     - not replaced
        //
        canOpen = isLastPunctChar;
        canClose = isNextPunctChar;
      }

      if (!canOpen && !canClose) {
        // middle of word
        if (isSingle) {
          token.content = replaceAt(token.content, t.index, APOSTROPHE);
        }
        continue;
      }

      if (canClose) {
        // this could be a closing quote, rewind the stack to get a match
        for (j = stack.length - 1; j >= 0; j--) {
          item = stack[j];
          if (stack[j].level < thisLevel) { break; }
          if (item.single === isSingle && stack[j].level === thisLevel) {
            item = stack[j];

            if (isSingle) {
              openQuote = state.md.options.quotes[2];
              closeQuote = state.md.options.quotes[3];
            } else {
              openQuote = state.md.options.quotes[0];
              closeQuote = state.md.options.quotes[1];
            }

            // replace token.content *before* tokens[item.token].content,
            // because, if they are pointing at the same token, replaceAt
            // could mess up indices when quote length != 1
            token.content = replaceAt(token.content, t.index, closeQuote);
            tokens[item.token].content = replaceAt(
              tokens[item.token].content, item.pos, openQuote);

            pos += closeQuote.length - 1;
            if (item.token === i) { pos += openQuote.length - 1; }

            text = token.content;
            max = text.length;

            stack.length = j;
            continue OUTER;
          }
        }
      }

      if (canOpen) {
        stack.push({
          token: i,
          pos: t.index,
          single: isSingle,
          level: thisLevel
        });
      } else if (canClose && isSingle) {
        token.content = replaceAt(token.content, t.index, APOSTROPHE);
      }
    }
  }
}


var smartquotes = function smartquotes(state) {
  /*eslint max-depth:0*/
  var blkIdx;

  if (!state.md.options.typographer) { return; }

  for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {

    if (state.tokens[blkIdx].type !== 'inline' ||
        !QUOTE_TEST_RE.test(state.tokens[blkIdx].content)) {
      continue;
    }

    process_inlines(state.tokens[blkIdx].children, state);
  }
};

// Token class


/**
 * class Token
 **/

/**
 * new Token(type, tag, nesting)
 *
 * Create new token and fill passed properties.
 **/
function Token(type, tag, nesting) {
  /**
   * Token#type -> String
   *
   * Type of the token (string, e.g. "paragraph_open")
   **/
  this.type     = type;

  /**
   * Token#tag -> String
   *
   * html tag name, e.g. "p"
   **/
  this.tag      = tag;

  /**
   * Token#attrs -> Array
   *
   * Html attributes. Format: `[ [ name1, value1 ], [ name2, value2 ] ]`
   **/
  this.attrs    = null;

  /**
   * Token#map -> Array
   *
   * Source map info. Format: `[ line_begin, line_end ]`
   **/
  this.map      = null;

  /**
   * Token#nesting -> Number
   *
   * Level change (number in {-1, 0, 1} set), where:
   *
   * -  `1` means the tag is opening
   * -  `0` means the tag is self-closing
   * - `-1` means the tag is closing
   **/
  this.nesting  = nesting;

  /**
   * Token#level -> Number
   *
   * nesting level, the same as `state.level`
   **/
  this.level    = 0;

  /**
   * Token#children -> Array
   *
   * An array of child nodes (inline and img tokens)
   **/
  this.children = null;

  /**
   * Token#content -> String
   *
   * In a case of self-closing tag (code, html, fence, etc.),
   * it has contents of this tag.
   **/
  this.content  = '';

  /**
   * Token#markup -> String
   *
   * '*' or '_' for emphasis, fence string for fence, etc.
   **/
  this.markup   = '';

  /**
   * Token#info -> String
   *
   * Additional information:
   *
   * - Info string for "fence" tokens
   * - The value "auto" for autolink "link_open" and "link_close" tokens
   **/
  this.info     = '';

  /**
   * Token#meta -> Object
   *
   * A place for plugins to store an arbitrary data
   **/
  this.meta     = null;

  /**
   * Token#block -> Boolean
   *
   * True for block-level tokens, false for inline tokens.
   * Used in renderer to calculate line breaks
   **/
  this.block    = false;

  /**
   * Token#hidden -> Boolean
   *
   * If it's true, ignore this element when rendering. Used for tight lists
   * to hide paragraphs.
   **/
  this.hidden   = false;
}


/**
 * Token.attrIndex(name) -> Number
 *
 * Search attribute index by name.
 **/
Token.prototype.attrIndex = function attrIndex(name) {
  var attrs, i, len;

  if (!this.attrs) { return -1; }

  attrs = this.attrs;

  for (i = 0, len = attrs.length; i < len; i++) {
    if (attrs[i][0] === name) { return i; }
  }
  return -1;
};


/**
 * Token.attrPush(attrData)
 *
 * Add `[ name, value ]` attribute to list. Init attrs if necessary
 **/
Token.prototype.attrPush = function attrPush(attrData) {
  if (this.attrs) {
    this.attrs.push(attrData);
  } else {
    this.attrs = [ attrData ];
  }
};


/**
 * Token.attrSet(name, value)
 *
 * Set `name` attribute to `value`. Override old value if exists.
 **/
Token.prototype.attrSet = function attrSet(name, value) {
  var idx = this.attrIndex(name),
      attrData = [ name, value ];

  if (idx < 0) {
    this.attrPush(attrData);
  } else {
    this.attrs[idx] = attrData;
  }
};


/**
 * Token.attrGet(name)
 *
 * Get the value of attribute `name`, or null if it does not exist.
 **/
Token.prototype.attrGet = function attrGet(name) {
  var idx = this.attrIndex(name), value = null;
  if (idx >= 0) {
    value = this.attrs[idx][1];
  }
  return value;
};


/**
 * Token.attrJoin(name, value)
 *
 * Join value to existing attribute via space. Or create new attribute if not
 * exists. Useful to operate with token classes.
 **/
Token.prototype.attrJoin = function attrJoin(name, value) {
  var idx = this.attrIndex(name);

  if (idx < 0) {
    this.attrPush([ name, value ]);
  } else {
    this.attrs[idx][1] = this.attrs[idx][1] + ' ' + value;
  }
};


var token = Token;

function StateCore(src, md, env) {
  this.src = src;
  this.env = env;
  this.tokens = [];
  this.inlineMode = false;
  this.md = md; // link to parser instance
}

// re-export Token class to use in core rules
StateCore.prototype.Token = token;


var state_core = StateCore;

var _rules$2 = [
  [ 'normalize',      normalize      ],
  [ 'block',          block          ],
  [ 'inline',         inline         ],
  [ 'linkify',        linkify        ],
  [ 'replacements',   replacements   ],
  [ 'smartquotes',    smartquotes    ]
];


/**
 * new Core()
 **/
function Core() {
  /**
   * Core#ruler -> Ruler
   *
   * [[Ruler]] instance. Keep configuration of core rules.
   **/
  this.ruler = new ruler();

  for (var i = 0; i < _rules$2.length; i++) {
    this.ruler.push(_rules$2[i][0], _rules$2[i][1]);
  }
}


/**
 * Core.process(state)
 *
 * Executes core chain rules.
 **/
Core.prototype.process = function (state) {
  var i, l, rules;

  rules = this.ruler.getRules('');

  for (i = 0, l = rules.length; i < l; i++) {
    rules[i](state);
  }
};

Core.prototype.State = state_core;


var parser_core = Core;

var isSpace$a = utils$1.isSpace;


function getLine(state, line) {
  var pos = state.bMarks[line] + state.tShift[line],
      max = state.eMarks[line];

  return state.src.substr(pos, max - pos);
}

function escapedSplit(str) {
  var result = [],
      pos = 0,
      max = str.length,
      ch,
      isEscaped = false,
      lastPos = 0,
      current = '';

  ch  = str.charCodeAt(pos);

  while (pos < max) {
    if (ch === 0x7c/* | */) {
      if (!isEscaped) {
        // pipe separating cells, '|'
        result.push(current + str.substring(lastPos, pos));
        current = '';
        lastPos = pos + 1;
      } else {
        // escaped pipe, '\|'
        current += str.substring(lastPos, pos - 1);
        lastPos = pos;
      }
    }

    isEscaped = (ch === 0x5c/* \ */);
    pos++;

    ch = str.charCodeAt(pos);
  }

  result.push(current + str.substring(lastPos));

  return result;
}


var table = function table(state, startLine, endLine, silent) {
  var ch, lineText, pos, i, l, nextLine, columns, columnCount, token,
      aligns, t, tableLines, tbodyLines, oldParentType, terminate,
      terminatorRules, firstCh, secondCh;

  // should have at least two lines
  if (startLine + 2 > endLine) { return false; }

  nextLine = startLine + 1;

  if (state.sCount[nextLine] < state.blkIndent) { return false; }

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[nextLine] - state.blkIndent >= 4) { return false; }

  // first character of the second line should be '|', '-', ':',
  // and no other characters are allowed but spaces;
  // basically, this is the equivalent of /^[-:|][-:|\s]*$/ regexp

  pos = state.bMarks[nextLine] + state.tShift[nextLine];
  if (pos >= state.eMarks[nextLine]) { return false; }

  firstCh = state.src.charCodeAt(pos++);
  if (firstCh !== 0x7C/* | */ && firstCh !== 0x2D/* - */ && firstCh !== 0x3A/* : */) { return false; }

  if (pos >= state.eMarks[nextLine]) { return false; }

  secondCh = state.src.charCodeAt(pos++);
  if (secondCh !== 0x7C/* | */ && secondCh !== 0x2D/* - */ && secondCh !== 0x3A/* : */ && !isSpace$a(secondCh)) {
    return false;
  }

  // if first character is '-', then second character must not be a space
  // (due to parsing ambiguity with list)
  if (firstCh === 0x2D/* - */ && isSpace$a(secondCh)) { return false; }

  while (pos < state.eMarks[nextLine]) {
    ch = state.src.charCodeAt(pos);

    if (ch !== 0x7C/* | */ && ch !== 0x2D/* - */ && ch !== 0x3A/* : */ && !isSpace$a(ch)) { return false; }

    pos++;
  }

  lineText = getLine(state, startLine + 1);

  columns = lineText.split('|');
  aligns = [];
  for (i = 0; i < columns.length; i++) {
    t = columns[i].trim();
    if (!t) {
      // allow empty columns before and after table, but not in between columns;
      // e.g. allow ` |---| `, disallow ` ---||--- `
      if (i === 0 || i === columns.length - 1) {
        continue;
      } else {
        return false;
      }
    }

    if (!/^:?-+:?$/.test(t)) { return false; }
    if (t.charCodeAt(t.length - 1) === 0x3A/* : */) {
      aligns.push(t.charCodeAt(0) === 0x3A/* : */ ? 'center' : 'right');
    } else if (t.charCodeAt(0) === 0x3A/* : */) {
      aligns.push('left');
    } else {
      aligns.push('');
    }
  }

  lineText = getLine(state, startLine).trim();
  if (lineText.indexOf('|') === -1) { return false; }
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }
  columns = escapedSplit(lineText);
  if (columns.length && columns[0] === '') columns.shift();
  if (columns.length && columns[columns.length - 1] === '') columns.pop();

  // header row will define an amount of columns in the entire table,
  // and align row should be exactly the same (the rest of the rows can differ)
  columnCount = columns.length;
  if (columnCount === 0 || columnCount !== aligns.length) { return false; }

  if (silent) { return true; }

  oldParentType = state.parentType;
  state.parentType = 'table';

  // use 'blockquote' lists for termination because it's
  // the most similar to tables
  terminatorRules = state.md.block.ruler.getRules('blockquote');

  token     = state.push('table_open', 'table', 1);
  token.map = tableLines = [ startLine, 0 ];

  token     = state.push('thead_open', 'thead', 1);
  token.map = [ startLine, startLine + 1 ];

  token     = state.push('tr_open', 'tr', 1);
  token.map = [ startLine, startLine + 1 ];

  for (i = 0; i < columns.length; i++) {
    token          = state.push('th_open', 'th', 1);
    if (aligns[i]) {
      token.attrs  = [ [ 'style', 'text-align:' + aligns[i] ] ];
    }

    token          = state.push('inline', '', 0);
    token.content  = columns[i].trim();
    token.children = [];

    token          = state.push('th_close', 'th', -1);
  }

  token     = state.push('tr_close', 'tr', -1);
  token     = state.push('thead_close', 'thead', -1);

  for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
    if (state.sCount[nextLine] < state.blkIndent) { break; }

    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }

    if (terminate) { break; }
    lineText = getLine(state, nextLine).trim();
    if (!lineText) { break; }
    if (state.sCount[nextLine] - state.blkIndent >= 4) { break; }
    columns = escapedSplit(lineText);
    if (columns.length && columns[0] === '') columns.shift();
    if (columns.length && columns[columns.length - 1] === '') columns.pop();

    if (nextLine === startLine + 2) {
      token     = state.push('tbody_open', 'tbody', 1);
      token.map = tbodyLines = [ startLine + 2, 0 ];
    }

    token     = state.push('tr_open', 'tr', 1);
    token.map = [ nextLine, nextLine + 1 ];

    for (i = 0; i < columnCount; i++) {
      token          = state.push('td_open', 'td', 1);
      if (aligns[i]) {
        token.attrs  = [ [ 'style', 'text-align:' + aligns[i] ] ];
      }

      token          = state.push('inline', '', 0);
      token.content  = columns[i] ? columns[i].trim() : '';
      token.children = [];

      token          = state.push('td_close', 'td', -1);
    }
    token = state.push('tr_close', 'tr', -1);
  }

  if (tbodyLines) {
    token = state.push('tbody_close', 'tbody', -1);
    tbodyLines[1] = nextLine;
  }

  token = state.push('table_close', 'table', -1);
  tableLines[1] = nextLine;

  state.parentType = oldParentType;
  state.line = nextLine;
  return true;
};

// Code block (4 spaces padded)


var code = function code(state, startLine, endLine/*, silent*/) {
  var nextLine, last, token;

  if (state.sCount[startLine] - state.blkIndent < 4) { return false; }

  last = nextLine = startLine + 1;

  while (nextLine < endLine) {
    if (state.isEmpty(nextLine)) {
      nextLine++;
      continue;
    }

    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      nextLine++;
      last = nextLine;
      continue;
    }
    break;
  }

  state.line = last;

  token         = state.push('code_block', 'code', 0);
  token.content = state.getLines(startLine, last, 4 + state.blkIndent, true);
  token.map     = [ startLine, state.line ];

  return true;
};

// fences (``` lang, ~~~ lang)


var fence = function fence(state, startLine, endLine, silent) {
  var marker, len, params, nextLine, mem, token, markup,
      haveEndMarker = false,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  if (pos + 3 > max) { return false; }

  marker = state.src.charCodeAt(pos);

  if (marker !== 0x7E/* ~ */ && marker !== 0x60 /* ` */) {
    return false;
  }

  // scan marker length
  mem = pos;
  pos = state.skipChars(pos, marker);

  len = pos - mem;

  if (len < 3) { return false; }

  markup = state.src.slice(mem, pos);
  params = state.src.slice(pos, max);

  if (marker === 0x60 /* ` */) {
    if (params.indexOf(String.fromCharCode(marker)) >= 0) {
      return false;
    }
  }

  // Since start is found, we can report success here in validation mode
  if (silent) { return true; }

  // search end of block
  nextLine = startLine;

  for (;;) {
    nextLine++;
    if (nextLine >= endLine) {
      // unclosed block should be autoclosed by end of document.
      // also block seems to be autoclosed by end of parent
      break;
    }

    pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
    max = state.eMarks[nextLine];

    if (pos < max && state.sCount[nextLine] < state.blkIndent) {
      // non-empty line with negative indent should stop the list:
      // - ```
      //  test
      break;
    }

    if (state.src.charCodeAt(pos) !== marker) { continue; }

    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      // closing fence should be indented less than 4 spaces
      continue;
    }

    pos = state.skipChars(pos, marker);

    // closing code fence must be at least as long as the opening one
    if (pos - mem < len) { continue; }

    // make sure tail has spaces only
    pos = state.skipSpaces(pos);

    if (pos < max) { continue; }

    haveEndMarker = true;
    // found!
    break;
  }

  // If a fence has heading spaces, they should be removed from its inner block
  len = state.sCount[startLine];

  state.line = nextLine + (haveEndMarker ? 1 : 0);

  token         = state.push('fence', 'code', 0);
  token.info    = params;
  token.content = state.getLines(startLine + 1, nextLine, len, true);
  token.markup  = markup;
  token.map     = [ startLine, state.line ];

  return true;
};

var isSpace$9 = utils$1.isSpace;


var blockquote = function blockquote(state, startLine, endLine, silent) {
  var adjustTab,
      ch,
      i,
      initial,
      l,
      lastLineEmpty,
      lines,
      nextLine,
      offset,
      oldBMarks,
      oldBSCount,
      oldIndent,
      oldParentType,
      oldSCount,
      oldTShift,
      spaceAfterMarker,
      terminate,
      terminatorRules,
      token,
      isOutdented,
      oldLineMax = state.lineMax,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  // check the block quote marker
  if (state.src.charCodeAt(pos++) !== 0x3E/* > */) { return false; }

  // we know that it's going to be a valid blockquote,
  // so no point trying to find the end of it in silent mode
  if (silent) { return true; }

  // set offset past spaces and ">"
  initial = offset = state.sCount[startLine] + 1;

  // skip one optional space after '>'
  if (state.src.charCodeAt(pos) === 0x20 /* space */) {
    // ' >   test '
    //     ^ -- position start of line here:
    pos++;
    initial++;
    offset++;
    adjustTab = false;
    spaceAfterMarker = true;
  } else if (state.src.charCodeAt(pos) === 0x09 /* tab */) {
    spaceAfterMarker = true;

    if ((state.bsCount[startLine] + offset) % 4 === 3) {
      // '  >\t  test '
      //       ^ -- position start of line here (tab has width===1)
      pos++;
      initial++;
      offset++;
      adjustTab = false;
    } else {
      // ' >\t  test '
      //    ^ -- position start of line here + shift bsCount slightly
      //         to make extra space appear
      adjustTab = true;
    }
  } else {
    spaceAfterMarker = false;
  }

  oldBMarks = [ state.bMarks[startLine] ];
  state.bMarks[startLine] = pos;

  while (pos < max) {
    ch = state.src.charCodeAt(pos);

    if (isSpace$9(ch)) {
      if (ch === 0x09) {
        offset += 4 - (offset + state.bsCount[startLine] + (adjustTab ? 1 : 0)) % 4;
      } else {
        offset++;
      }
    } else {
      break;
    }

    pos++;
  }

  oldBSCount = [ state.bsCount[startLine] ];
  state.bsCount[startLine] = state.sCount[startLine] + 1 + (spaceAfterMarker ? 1 : 0);

  lastLineEmpty = pos >= max;

  oldSCount = [ state.sCount[startLine] ];
  state.sCount[startLine] = offset - initial;

  oldTShift = [ state.tShift[startLine] ];
  state.tShift[startLine] = pos - state.bMarks[startLine];

  terminatorRules = state.md.block.ruler.getRules('blockquote');

  oldParentType = state.parentType;
  state.parentType = 'blockquote';

  // Search the end of the block
  //
  // Block ends with either:
  //  1. an empty line outside:
  //     ```
  //     > test
  //
  //     ```
  //  2. an empty line inside:
  //     ```
  //     >
  //     test
  //     ```
  //  3. another tag:
  //     ```
  //     > test
  //      - - -
  //     ```
  for (nextLine = startLine + 1; nextLine < endLine; nextLine++) {
    // check if it's outdented, i.e. it's inside list item and indented
    // less than said list item:
    //
    // ```
    // 1. anything
    //    > current blockquote
    // 2. checking this line
    // ```
    isOutdented = state.sCount[nextLine] < state.blkIndent;

    pos = state.bMarks[nextLine] + state.tShift[nextLine];
    max = state.eMarks[nextLine];

    if (pos >= max) {
      // Case 1: line is not inside the blockquote, and this line is empty.
      break;
    }

    if (state.src.charCodeAt(pos++) === 0x3E/* > */ && !isOutdented) {
      // This line is inside the blockquote.

      // set offset past spaces and ">"
      initial = offset = state.sCount[nextLine] + 1;

      // skip one optional space after '>'
      if (state.src.charCodeAt(pos) === 0x20 /* space */) {
        // ' >   test '
        //     ^ -- position start of line here:
        pos++;
        initial++;
        offset++;
        adjustTab = false;
        spaceAfterMarker = true;
      } else if (state.src.charCodeAt(pos) === 0x09 /* tab */) {
        spaceAfterMarker = true;

        if ((state.bsCount[nextLine] + offset) % 4 === 3) {
          // '  >\t  test '
          //       ^ -- position start of line here (tab has width===1)
          pos++;
          initial++;
          offset++;
          adjustTab = false;
        } else {
          // ' >\t  test '
          //    ^ -- position start of line here + shift bsCount slightly
          //         to make extra space appear
          adjustTab = true;
        }
      } else {
        spaceAfterMarker = false;
      }

      oldBMarks.push(state.bMarks[nextLine]);
      state.bMarks[nextLine] = pos;

      while (pos < max) {
        ch = state.src.charCodeAt(pos);

        if (isSpace$9(ch)) {
          if (ch === 0x09) {
            offset += 4 - (offset + state.bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4;
          } else {
            offset++;
          }
        } else {
          break;
        }

        pos++;
      }

      lastLineEmpty = pos >= max;

      oldBSCount.push(state.bsCount[nextLine]);
      state.bsCount[nextLine] = state.sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0);

      oldSCount.push(state.sCount[nextLine]);
      state.sCount[nextLine] = offset - initial;

      oldTShift.push(state.tShift[nextLine]);
      state.tShift[nextLine] = pos - state.bMarks[nextLine];
      continue;
    }

    // Case 2: line is not inside the blockquote, and the last line was empty.
    if (lastLineEmpty) { break; }

    // Case 3: another tag found.
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }

    if (terminate) {
      // Quirk to enforce "hard termination mode" for paragraphs;
      // normally if you call `tokenize(state, startLine, nextLine)`,
      // paragraphs will look below nextLine for paragraph continuation,
      // but if blockquote is terminated by another tag, they shouldn't
      state.lineMax = nextLine;

      if (state.blkIndent !== 0) {
        // state.blkIndent was non-zero, we now set it to zero,
        // so we need to re-calculate all offsets to appear as
        // if indent wasn't changed
        oldBMarks.push(state.bMarks[nextLine]);
        oldBSCount.push(state.bsCount[nextLine]);
        oldTShift.push(state.tShift[nextLine]);
        oldSCount.push(state.sCount[nextLine]);
        state.sCount[nextLine] -= state.blkIndent;
      }

      break;
    }

    oldBMarks.push(state.bMarks[nextLine]);
    oldBSCount.push(state.bsCount[nextLine]);
    oldTShift.push(state.tShift[nextLine]);
    oldSCount.push(state.sCount[nextLine]);

    // A negative indentation means that this is a paragraph continuation
    //
    state.sCount[nextLine] = -1;
  }

  oldIndent = state.blkIndent;
  state.blkIndent = 0;

  token        = state.push('blockquote_open', 'blockquote', 1);
  token.markup = '>';
  token.map    = lines = [ startLine, 0 ];

  state.md.block.tokenize(state, startLine, nextLine);

  token        = state.push('blockquote_close', 'blockquote', -1);
  token.markup = '>';

  state.lineMax = oldLineMax;
  state.parentType = oldParentType;
  lines[1] = state.line;

  // Restore original tShift; this might not be necessary since the parser
  // has already been here, but just to make sure we can do that.
  for (i = 0; i < oldTShift.length; i++) {
    state.bMarks[i + startLine] = oldBMarks[i];
    state.tShift[i + startLine] = oldTShift[i];
    state.sCount[i + startLine] = oldSCount[i];
    state.bsCount[i + startLine] = oldBSCount[i];
  }
  state.blkIndent = oldIndent;

  return true;
};

var isSpace$8 = utils$1.isSpace;


var hr = function hr(state, startLine, endLine, silent) {
  var marker, cnt, ch, token,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  marker = state.src.charCodeAt(pos++);

  // Check hr marker
  if (marker !== 0x2A/* * */ &&
      marker !== 0x2D/* - */ &&
      marker !== 0x5F/* _ */) {
    return false;
  }

  // markers can be mixed with spaces, but there should be at least 3 of them

  cnt = 1;
  while (pos < max) {
    ch = state.src.charCodeAt(pos++);
    if (ch !== marker && !isSpace$8(ch)) { return false; }
    if (ch === marker) { cnt++; }
  }

  if (cnt < 3) { return false; }

  if (silent) { return true; }

  state.line = startLine + 1;

  token        = state.push('hr', 'hr', 0);
  token.map    = [ startLine, state.line ];
  token.markup = Array(cnt + 1).join(String.fromCharCode(marker));

  return true;
};

var isSpace$7 = utils$1.isSpace;


// Search `[-+*][\n ]`, returns next pos after marker on success
// or -1 on fail.
function skipBulletListMarker(state, startLine) {
  var marker, pos, max, ch;

  pos = state.bMarks[startLine] + state.tShift[startLine];
  max = state.eMarks[startLine];

  marker = state.src.charCodeAt(pos++);
  // Check bullet
  if (marker !== 0x2A/* * */ &&
      marker !== 0x2D/* - */ &&
      marker !== 0x2B/* + */) {
    return -1;
  }

  if (pos < max) {
    ch = state.src.charCodeAt(pos);

    if (!isSpace$7(ch)) {
      // " -test " - is not a list item
      return -1;
    }
  }

  return pos;
}

// Search `\d+[.)][\n ]`, returns next pos after marker on success
// or -1 on fail.
function skipOrderedListMarker(state, startLine) {
  var ch,
      start = state.bMarks[startLine] + state.tShift[startLine],
      pos = start,
      max = state.eMarks[startLine];

  // List marker should have at least 2 chars (digit + dot)
  if (pos + 1 >= max) { return -1; }

  ch = state.src.charCodeAt(pos++);

  if (ch < 0x30/* 0 */ || ch > 0x39/* 9 */) { return -1; }

  for (;;) {
    // EOL -> fail
    if (pos >= max) { return -1; }

    ch = state.src.charCodeAt(pos++);

    if (ch >= 0x30/* 0 */ && ch <= 0x39/* 9 */) {

      // List marker should have no more than 9 digits
      // (prevents integer overflow in browsers)
      if (pos - start >= 10) { return -1; }

      continue;
    }

    // found valid marker
    if (ch === 0x29/* ) */ || ch === 0x2e/* . */) {
      break;
    }

    return -1;
  }


  if (pos < max) {
    ch = state.src.charCodeAt(pos);

    if (!isSpace$7(ch)) {
      // " 1.test " - is not a list item
      return -1;
    }
  }
  return pos;
}

function markTightParagraphs(state, idx) {
  var i, l,
      level = state.level + 2;

  for (i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
    if (state.tokens[i].level === level && state.tokens[i].type === 'paragraph_open') {
      state.tokens[i + 2].hidden = true;
      state.tokens[i].hidden = true;
      i += 2;
    }
  }
}


var list = function list(state, startLine, endLine, silent) {
  var ch,
      contentStart,
      i,
      indent,
      indentAfterMarker,
      initial,
      isOrdered,
      itemLines,
      l,
      listLines,
      listTokIdx,
      markerCharCode,
      markerValue,
      max,
      nextLine,
      offset,
      oldListIndent,
      oldParentType,
      oldSCount,
      oldTShift,
      oldTight,
      pos,
      posAfterMarker,
      prevEmptyEnd,
      start,
      terminate,
      terminatorRules,
      token,
      isTerminatingParagraph = false,
      tight = true;

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  // Special case:
  //  - item 1
  //   - item 2
  //    - item 3
  //     - item 4
  //      - this one is a paragraph continuation
  if (state.listIndent >= 0 &&
      state.sCount[startLine] - state.listIndent >= 4 &&
      state.sCount[startLine] < state.blkIndent) {
    return false;
  }

  // limit conditions when list can interrupt
  // a paragraph (validation mode only)
  if (silent && state.parentType === 'paragraph') {
    // Next list item should still terminate previous list item;
    //
    // This code can fail if plugins use blkIndent as well as lists,
    // but I hope the spec gets fixed long before that happens.
    //
    if (state.tShift[startLine] >= state.blkIndent) {
      isTerminatingParagraph = true;
    }
  }

  // Detect list type and position after marker
  if ((posAfterMarker = skipOrderedListMarker(state, startLine)) >= 0) {
    isOrdered = true;
    start = state.bMarks[startLine] + state.tShift[startLine];
    markerValue = Number(state.src.substr(start, posAfterMarker - start - 1));

    // If we're starting a new ordered list right after
    // a paragraph, it should start with 1.
    if (isTerminatingParagraph && markerValue !== 1) return false;

  } else if ((posAfterMarker = skipBulletListMarker(state, startLine)) >= 0) {
    isOrdered = false;

  } else {
    return false;
  }

  // If we're starting a new unordered list right after
  // a paragraph, first line should not be empty.
  if (isTerminatingParagraph) {
    if (state.skipSpaces(posAfterMarker) >= state.eMarks[startLine]) return false;
  }

  // We should terminate list on style change. Remember first one to compare.
  markerCharCode = state.src.charCodeAt(posAfterMarker - 1);

  // For validation mode we can terminate immediately
  if (silent) { return true; }

  // Start list
  listTokIdx = state.tokens.length;

  if (isOrdered) {
    token       = state.push('ordered_list_open', 'ol', 1);
    if (markerValue !== 1) {
      token.attrs = [ [ 'start', markerValue ] ];
    }

  } else {
    token       = state.push('bullet_list_open', 'ul', 1);
  }

  token.map    = listLines = [ startLine, 0 ];
  token.markup = String.fromCharCode(markerCharCode);

  //
  // Iterate list items
  //

  nextLine = startLine;
  prevEmptyEnd = false;
  terminatorRules = state.md.block.ruler.getRules('list');

  oldParentType = state.parentType;
  state.parentType = 'list';

  while (nextLine < endLine) {
    pos = posAfterMarker;
    max = state.eMarks[nextLine];

    initial = offset = state.sCount[nextLine] + posAfterMarker - (state.bMarks[startLine] + state.tShift[startLine]);

    while (pos < max) {
      ch = state.src.charCodeAt(pos);

      if (ch === 0x09) {
        offset += 4 - (offset + state.bsCount[nextLine]) % 4;
      } else if (ch === 0x20) {
        offset++;
      } else {
        break;
      }

      pos++;
    }

    contentStart = pos;

    if (contentStart >= max) {
      // trimming space in "-    \n  3" case, indent is 1 here
      indentAfterMarker = 1;
    } else {
      indentAfterMarker = offset - initial;
    }

    // If we have more than 4 spaces, the indent is 1
    // (the rest is just indented code block)
    if (indentAfterMarker > 4) { indentAfterMarker = 1; }

    // "  -  test"
    //  ^^^^^ - calculating total length of this thing
    indent = initial + indentAfterMarker;

    // Run subparser & write tokens
    token        = state.push('list_item_open', 'li', 1);
    token.markup = String.fromCharCode(markerCharCode);
    token.map    = itemLines = [ startLine, 0 ];

    // change current state, then restore it after parser subcall
    oldTight = state.tight;
    oldTShift = state.tShift[startLine];
    oldSCount = state.sCount[startLine];

    //  - example list
    // ^ listIndent position will be here
    //   ^ blkIndent position will be here
    //
    oldListIndent = state.listIndent;
    state.listIndent = state.blkIndent;
    state.blkIndent = indent;

    state.tight = true;
    state.tShift[startLine] = contentStart - state.bMarks[startLine];
    state.sCount[startLine] = offset;

    if (contentStart >= max && state.isEmpty(startLine + 1)) {
      // workaround for this case
      // (list item is empty, list terminates before "foo"):
      // ~~~~~~~~
      //   -
      //
      //     foo
      // ~~~~~~~~
      state.line = Math.min(state.line + 2, endLine);
    } else {
      state.md.block.tokenize(state, startLine, endLine, true);
    }

    // If any of list item is tight, mark list as tight
    if (!state.tight || prevEmptyEnd) {
      tight = false;
    }
    // Item become loose if finish with empty line,
    // but we should filter last element, because it means list finish
    prevEmptyEnd = (state.line - startLine) > 1 && state.isEmpty(state.line - 1);

    state.blkIndent = state.listIndent;
    state.listIndent = oldListIndent;
    state.tShift[startLine] = oldTShift;
    state.sCount[startLine] = oldSCount;
    state.tight = oldTight;

    token        = state.push('list_item_close', 'li', -1);
    token.markup = String.fromCharCode(markerCharCode);

    nextLine = startLine = state.line;
    itemLines[1] = nextLine;
    contentStart = state.bMarks[startLine];

    if (nextLine >= endLine) { break; }

    //
    // Try to check if list is terminated or continued.
    //
    if (state.sCount[nextLine] < state.blkIndent) { break; }

    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) { break; }

    // fail if terminating block found
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) { break; }

    // fail if list has another type
    if (isOrdered) {
      posAfterMarker = skipOrderedListMarker(state, nextLine);
      if (posAfterMarker < 0) { break; }
    } else {
      posAfterMarker = skipBulletListMarker(state, nextLine);
      if (posAfterMarker < 0) { break; }
    }

    if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) { break; }
  }

  // Finalize list
  if (isOrdered) {
    token = state.push('ordered_list_close', 'ol', -1);
  } else {
    token = state.push('bullet_list_close', 'ul', -1);
  }
  token.markup = String.fromCharCode(markerCharCode);

  listLines[1] = nextLine;
  state.line = nextLine;

  state.parentType = oldParentType;

  // mark paragraphs tight if needed
  if (tight) {
    markTightParagraphs(state, listTokIdx);
  }

  return true;
};

var normalizeReference$2   = utils$1.normalizeReference;
var isSpace$6              = utils$1.isSpace;


var reference = function reference(state, startLine, _endLine, silent) {
  var ch,
      destEndPos,
      destEndLineNo,
      endLine,
      href,
      i,
      l,
      label,
      labelEnd,
      oldParentType,
      res,
      start,
      str,
      terminate,
      terminatorRules,
      title,
      lines = 0,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine],
      nextLine = startLine + 1;

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  if (state.src.charCodeAt(pos) !== 0x5B/* [ */) { return false; }

  // Simple check to quickly interrupt scan on [link](url) at the start of line.
  // Can be useful on practice: https://github.com/markdown-it/markdown-it/issues/54
  while (++pos < max) {
    if (state.src.charCodeAt(pos) === 0x5D /* ] */ &&
        state.src.charCodeAt(pos - 1) !== 0x5C/* \ */) {
      if (pos + 1 === max) { return false; }
      if (state.src.charCodeAt(pos + 1) !== 0x3A/* : */) { return false; }
      break;
    }
  }

  endLine = state.lineMax;

  // jump line-by-line until empty one or EOF
  terminatorRules = state.md.block.ruler.getRules('reference');

  oldParentType = state.parentType;
  state.parentType = 'reference';

  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    // this would be a code block normally, but after paragraph
    // it's considered a lazy continuation regardless of what's there
    if (state.sCount[nextLine] - state.blkIndent > 3) { continue; }

    // quirk for blockquotes, this line should already be checked by that rule
    if (state.sCount[nextLine] < 0) { continue; }

    // Some tags can terminate paragraph without empty line.
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) { break; }
  }

  str = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
  max = str.length;

  for (pos = 1; pos < max; pos++) {
    ch = str.charCodeAt(pos);
    if (ch === 0x5B /* [ */) {
      return false;
    } else if (ch === 0x5D /* ] */) {
      labelEnd = pos;
      break;
    } else if (ch === 0x0A /* \n */) {
      lines++;
    } else if (ch === 0x5C /* \ */) {
      pos++;
      if (pos < max && str.charCodeAt(pos) === 0x0A) {
        lines++;
      }
    }
  }

  if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 0x3A/* : */) { return false; }

  // [label]:   destination   'title'
  //         ^^^ skip optional whitespace here
  for (pos = labelEnd + 2; pos < max; pos++) {
    ch = str.charCodeAt(pos);
    if (ch === 0x0A) {
      lines++;
    } else if (isSpace$6(ch)) ; else {
      break;
    }
  }

  // [label]:   destination   'title'
  //            ^^^^^^^^^^^ parse this
  res = state.md.helpers.parseLinkDestination(str, pos, max);
  if (!res.ok) { return false; }

  href = state.md.normalizeLink(res.str);
  if (!state.md.validateLink(href)) { return false; }

  pos = res.pos;
  lines += res.lines;

  // save cursor state, we could require to rollback later
  destEndPos = pos;
  destEndLineNo = lines;

  // [label]:   destination   'title'
  //                       ^^^ skipping those spaces
  start = pos;
  for (; pos < max; pos++) {
    ch = str.charCodeAt(pos);
    if (ch === 0x0A) {
      lines++;
    } else if (isSpace$6(ch)) ; else {
      break;
    }
  }

  // [label]:   destination   'title'
  //                          ^^^^^^^ parse this
  res = state.md.helpers.parseLinkTitle(str, pos, max);
  if (pos < max && start !== pos && res.ok) {
    title = res.str;
    pos = res.pos;
    lines += res.lines;
  } else {
    title = '';
    pos = destEndPos;
    lines = destEndLineNo;
  }

  // skip trailing spaces until the rest of the line
  while (pos < max) {
    ch = str.charCodeAt(pos);
    if (!isSpace$6(ch)) { break; }
    pos++;
  }

  if (pos < max && str.charCodeAt(pos) !== 0x0A) {
    if (title) {
      // garbage at the end of the line after title,
      // but it could still be a valid reference if we roll back
      title = '';
      pos = destEndPos;
      lines = destEndLineNo;
      while (pos < max) {
        ch = str.charCodeAt(pos);
        if (!isSpace$6(ch)) { break; }
        pos++;
      }
    }
  }

  if (pos < max && str.charCodeAt(pos) !== 0x0A) {
    // garbage at the end of the line
    return false;
  }

  label = normalizeReference$2(str.slice(1, labelEnd));
  if (!label) {
    // CommonMark 0.20 disallows empty labels
    return false;
  }

  // Reference can not terminate anything. This check is for safety only.
  /*istanbul ignore if*/
  if (silent) { return true; }

  if (typeof state.env.references === 'undefined') {
    state.env.references = {};
  }
  if (typeof state.env.references[label] === 'undefined') {
    state.env.references[label] = { title: title, href: href };
  }

  state.parentType = oldParentType;

  state.line = startLine + lines + 1;
  return true;
};

// List of valid html blocks names, accorting to commonmark spec


var html_blocks = [
  'address',
  'article',
  'aside',
  'base',
  'basefont',
  'blockquote',
  'body',
  'caption',
  'center',
  'col',
  'colgroup',
  'dd',
  'details',
  'dialog',
  'dir',
  'div',
  'dl',
  'dt',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'frame',
  'frameset',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hr',
  'html',
  'iframe',
  'legend',
  'li',
  'link',
  'main',
  'menu',
  'menuitem',
  'nav',
  'noframes',
  'ol',
  'optgroup',
  'option',
  'p',
  'param',
  'section',
  'source',
  'summary',
  'table',
  'tbody',
  'td',
  'tfoot',
  'th',
  'thead',
  'title',
  'tr',
  'track',
  'ul'
];

// Regexps to match html elements

var attr_name     = '[a-zA-Z_:][a-zA-Z0-9:._-]*';

var unquoted      = '[^"\'=<>`\\x00-\\x20]+';
var single_quoted = "'[^']*'";
var double_quoted = '"[^"]*"';

var attr_value  = '(?:' + unquoted + '|' + single_quoted + '|' + double_quoted + ')';

var attribute   = '(?:\\s+' + attr_name + '(?:\\s*=\\s*' + attr_value + ')?)';

var open_tag    = '<[A-Za-z][A-Za-z0-9\\-]*' + attribute + '*\\s*\\/?>';

var close_tag   = '<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>';
var comment     = '<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->';
var processing  = '<[?][\\s\\S]*?[?]>';
var declaration = '<![A-Z]+\\s+[^>]*>';
var cdata       = '<!\\[CDATA\\[[\\s\\S]*?\\]\\]>';

var HTML_TAG_RE$1 = new RegExp('^(?:' + open_tag + '|' + close_tag + '|' + comment +
                        '|' + processing + '|' + declaration + '|' + cdata + ')');
var HTML_OPEN_CLOSE_TAG_RE$1 = new RegExp('^(?:' + open_tag + '|' + close_tag + ')');

var HTML_TAG_RE_1 = HTML_TAG_RE$1;
var HTML_OPEN_CLOSE_TAG_RE_1 = HTML_OPEN_CLOSE_TAG_RE$1;

var html_re = {
	HTML_TAG_RE: HTML_TAG_RE_1,
	HTML_OPEN_CLOSE_TAG_RE: HTML_OPEN_CLOSE_TAG_RE_1
};

var HTML_OPEN_CLOSE_TAG_RE = html_re.HTML_OPEN_CLOSE_TAG_RE;

// An array of opening and corresponding closing sequences for html tags,
// last argument defines whether it can terminate a paragraph or not
//
var HTML_SEQUENCES = [
  [ /^<(script|pre|style)(?=(\s|>|$))/i, /<\/(script|pre|style)>/i, true ],
  [ /^<!--/,        /-->/,   true ],
  [ /^<\?/,         /\?>/,   true ],
  [ /^<![A-Z]/,     />/,     true ],
  [ /^<!\[CDATA\[/, /\]\]>/, true ],
  [ new RegExp('^</?(' + html_blocks.join('|') + ')(?=(\\s|/?>|$))', 'i'), /^$/, true ],
  [ new RegExp(HTML_OPEN_CLOSE_TAG_RE.source + '\\s*$'),  /^$/, false ]
];


var html_block = function html_block(state, startLine, endLine, silent) {
  var i, nextLine, token, lineText,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  if (!state.md.options.html) { return false; }

  if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false; }

  lineText = state.src.slice(pos, max);

  for (i = 0; i < HTML_SEQUENCES.length; i++) {
    if (HTML_SEQUENCES[i][0].test(lineText)) { break; }
  }

  if (i === HTML_SEQUENCES.length) { return false; }

  if (silent) {
    // true if this sequence can be a terminator, false otherwise
    return HTML_SEQUENCES[i][2];
  }

  nextLine = startLine + 1;

  // If we are here - we detected HTML block.
  // Let's roll down till block end.
  if (!HTML_SEQUENCES[i][1].test(lineText)) {
    for (; nextLine < endLine; nextLine++) {
      if (state.sCount[nextLine] < state.blkIndent) { break; }

      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      lineText = state.src.slice(pos, max);

      if (HTML_SEQUENCES[i][1].test(lineText)) {
        if (lineText.length !== 0) { nextLine++; }
        break;
      }
    }
  }

  state.line = nextLine;

  token         = state.push('html_block', '', 0);
  token.map     = [ startLine, nextLine ];
  token.content = state.getLines(startLine, nextLine, state.blkIndent, true);

  return true;
};

var isSpace$5 = utils$1.isSpace;


var heading = function heading(state, startLine, endLine, silent) {
  var ch, level, tmp, token,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  ch  = state.src.charCodeAt(pos);

  if (ch !== 0x23/* # */ || pos >= max) { return false; }

  // count heading level
  level = 1;
  ch = state.src.charCodeAt(++pos);
  while (ch === 0x23/* # */ && pos < max && level <= 6) {
    level++;
    ch = state.src.charCodeAt(++pos);
  }

  if (level > 6 || (pos < max && !isSpace$5(ch))) { return false; }

  if (silent) { return true; }

  // Let's cut tails like '    ###  ' from the end of string

  max = state.skipSpacesBack(max, pos);
  tmp = state.skipCharsBack(max, 0x23, pos); // #
  if (tmp > pos && isSpace$5(state.src.charCodeAt(tmp - 1))) {
    max = tmp;
  }

  state.line = startLine + 1;

  token        = state.push('heading_open', 'h' + String(level), 1);
  token.markup = '########'.slice(0, level);
  token.map    = [ startLine, state.line ];

  token          = state.push('inline', '', 0);
  token.content  = state.src.slice(pos, max).trim();
  token.map      = [ startLine, state.line ];
  token.children = [];

  token        = state.push('heading_close', 'h' + String(level), -1);
  token.markup = '########'.slice(0, level);

  return true;
};

// lheading (---, ===)


var lheading = function lheading(state, startLine, endLine/*, silent*/) {
  var content, terminate, i, l, token, pos, max, level, marker,
      nextLine = startLine + 1, oldParentType,
      terminatorRules = state.md.block.ruler.getRules('paragraph');

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  oldParentType = state.parentType;
  state.parentType = 'paragraph'; // use paragraph to match terminatorRules

  // jump line-by-line until empty one or EOF
  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    // this would be a code block normally, but after paragraph
    // it's considered a lazy continuation regardless of what's there
    if (state.sCount[nextLine] - state.blkIndent > 3) { continue; }

    //
    // Check for underline in setext header
    //
    if (state.sCount[nextLine] >= state.blkIndent) {
      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (pos < max) {
        marker = state.src.charCodeAt(pos);

        if (marker === 0x2D/* - */ || marker === 0x3D/* = */) {
          pos = state.skipChars(pos, marker);
          pos = state.skipSpaces(pos);

          if (pos >= max) {
            level = (marker === 0x3D/* = */ ? 1 : 2);
            break;
          }
        }
      }
    }

    // quirk for blockquotes, this line should already be checked by that rule
    if (state.sCount[nextLine] < 0) { continue; }

    // Some tags can terminate paragraph without empty line.
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) { break; }
  }

  if (!level) {
    // Didn't find valid underline
    return false;
  }

  content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();

  state.line = nextLine + 1;

  token          = state.push('heading_open', 'h' + String(level), 1);
  token.markup   = String.fromCharCode(marker);
  token.map      = [ startLine, state.line ];

  token          = state.push('inline', '', 0);
  token.content  = content;
  token.map      = [ startLine, state.line - 1 ];
  token.children = [];

  token          = state.push('heading_close', 'h' + String(level), -1);
  token.markup   = String.fromCharCode(marker);

  state.parentType = oldParentType;

  return true;
};

// Paragraph


var paragraph = function paragraph(state, startLine/*, endLine*/) {
  var content, terminate, i, l, token, oldParentType,
      nextLine = startLine + 1,
      terminatorRules = state.md.block.ruler.getRules('paragraph'),
      endLine = state.lineMax;

  oldParentType = state.parentType;
  state.parentType = 'paragraph';

  // jump line-by-line until empty one or EOF
  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    // this would be a code block normally, but after paragraph
    // it's considered a lazy continuation regardless of what's there
    if (state.sCount[nextLine] - state.blkIndent > 3) { continue; }

    // quirk for blockquotes, this line should already be checked by that rule
    if (state.sCount[nextLine] < 0) { continue; }

    // Some tags can terminate paragraph without empty line.
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) { break; }
  }

  content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();

  state.line = nextLine;

  token          = state.push('paragraph_open', 'p', 1);
  token.map      = [ startLine, state.line ];

  token          = state.push('inline', '', 0);
  token.content  = content;
  token.map      = [ startLine, state.line ];
  token.children = [];

  token          = state.push('paragraph_close', 'p', -1);

  state.parentType = oldParentType;

  return true;
};

var isSpace$4 = utils$1.isSpace;


function StateBlock(src, md, env, tokens) {
  var ch, s, start, pos, len, indent, offset, indent_found;

  this.src = src;

  // link to parser instance
  this.md     = md;

  this.env = env;

  //
  // Internal state vartiables
  //

  this.tokens = tokens;

  this.bMarks = [];  // line begin offsets for fast jumps
  this.eMarks = [];  // line end offsets for fast jumps
  this.tShift = [];  // offsets of the first non-space characters (tabs not expanded)
  this.sCount = [];  // indents for each line (tabs expanded)

  // An amount of virtual spaces (tabs expanded) between beginning
  // of each line (bMarks) and real beginning of that line.
  //
  // It exists only as a hack because blockquotes override bMarks
  // losing information in the process.
  //
  // It's used only when expanding tabs, you can think about it as
  // an initial tab length, e.g. bsCount=21 applied to string `\t123`
  // means first tab should be expanded to 4-21%4 === 3 spaces.
  //
  this.bsCount = [];

  // block parser variables
  this.blkIndent  = 0; // required block content indent (for example, if we are
                       // inside a list, it would be positioned after list marker)
  this.line       = 0; // line index in src
  this.lineMax    = 0; // lines count
  this.tight      = false;  // loose/tight mode for lists
  this.ddIndent   = -1; // indent of the current dd block (-1 if there isn't any)
  this.listIndent = -1; // indent of the current list block (-1 if there isn't any)

  // can be 'blockquote', 'list', 'root', 'paragraph' or 'reference'
  // used in lists to determine if they interrupt a paragraph
  this.parentType = 'root';

  this.level = 0;

  // renderer
  this.result = '';

  // Create caches
  // Generate markers.
  s = this.src;
  indent_found = false;

  for (start = pos = indent = offset = 0, len = s.length; pos < len; pos++) {
    ch = s.charCodeAt(pos);

    if (!indent_found) {
      if (isSpace$4(ch)) {
        indent++;

        if (ch === 0x09) {
          offset += 4 - offset % 4;
        } else {
          offset++;
        }
        continue;
      } else {
        indent_found = true;
      }
    }

    if (ch === 0x0A || pos === len - 1) {
      if (ch !== 0x0A) { pos++; }
      this.bMarks.push(start);
      this.eMarks.push(pos);
      this.tShift.push(indent);
      this.sCount.push(offset);
      this.bsCount.push(0);

      indent_found = false;
      indent = 0;
      offset = 0;
      start = pos + 1;
    }
  }

  // Push fake entry to simplify cache bounds checks
  this.bMarks.push(s.length);
  this.eMarks.push(s.length);
  this.tShift.push(0);
  this.sCount.push(0);
  this.bsCount.push(0);

  this.lineMax = this.bMarks.length - 1; // don't count last fake line
}

// Push new token to "stream".
//
StateBlock.prototype.push = function (type, tag, nesting) {
  var token$1 = new token(type, tag, nesting);
  token$1.block = true;

  if (nesting < 0) this.level--; // closing tag
  token$1.level = this.level;
  if (nesting > 0) this.level++; // opening tag

  this.tokens.push(token$1);
  return token$1;
};

StateBlock.prototype.isEmpty = function isEmpty(line) {
  return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
};

StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
  for (var max = this.lineMax; from < max; from++) {
    if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
      break;
    }
  }
  return from;
};

// Skip spaces from given position.
StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
  var ch;

  for (var max = this.src.length; pos < max; pos++) {
    ch = this.src.charCodeAt(pos);
    if (!isSpace$4(ch)) { break; }
  }
  return pos;
};

// Skip spaces from given position in reverse.
StateBlock.prototype.skipSpacesBack = function skipSpacesBack(pos, min) {
  if (pos <= min) { return pos; }

  while (pos > min) {
    if (!isSpace$4(this.src.charCodeAt(--pos))) { return pos + 1; }
  }
  return pos;
};

// Skip char codes from given position
StateBlock.prototype.skipChars = function skipChars(pos, code) {
  for (var max = this.src.length; pos < max; pos++) {
    if (this.src.charCodeAt(pos) !== code) { break; }
  }
  return pos;
};

// Skip char codes reverse from given position - 1
StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code, min) {
  if (pos <= min) { return pos; }

  while (pos > min) {
    if (code !== this.src.charCodeAt(--pos)) { return pos + 1; }
  }
  return pos;
};

// cut lines range from source.
StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
  var i, lineIndent, ch, first, last, queue, lineStart,
      line = begin;

  if (begin >= end) {
    return '';
  }

  queue = new Array(end - begin);

  for (i = 0; line < end; line++, i++) {
    lineIndent = 0;
    lineStart = first = this.bMarks[line];

    if (line + 1 < end || keepLastLF) {
      // No need for bounds check because we have fake entry on tail.
      last = this.eMarks[line] + 1;
    } else {
      last = this.eMarks[line];
    }

    while (first < last && lineIndent < indent) {
      ch = this.src.charCodeAt(first);

      if (isSpace$4(ch)) {
        if (ch === 0x09) {
          lineIndent += 4 - (lineIndent + this.bsCount[line]) % 4;
        } else {
          lineIndent++;
        }
      } else if (first - lineStart < this.tShift[line]) {
        // patched tShift masked characters to look like spaces (blockquotes, list markers)
        lineIndent++;
      } else {
        break;
      }

      first++;
    }

    if (lineIndent > indent) {
      // partially expanding tabs in code blocks, e.g '\t\tfoobar'
      // with indent=2 becomes '  \tfoobar'
      queue[i] = new Array(lineIndent - indent + 1).join(' ') + this.src.slice(first, last);
    } else {
      queue[i] = this.src.slice(first, last);
    }
  }

  return queue.join('');
};

// re-export Token class to use in block rules
StateBlock.prototype.Token = token;


var state_block = StateBlock;

var _rules$1 = [
  // First 2 params - rule name & source. Secondary array - list of rules,
  // which can be terminated by this one.
  [ 'table',      table,      [ 'paragraph', 'reference' ] ],
  [ 'code',       code ],
  [ 'fence',      fence,      [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
  [ 'blockquote', blockquote, [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
  [ 'hr',         hr,         [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
  [ 'list',       list,       [ 'paragraph', 'reference', 'blockquote' ] ],
  [ 'reference',  reference ],
  [ 'html_block', html_block, [ 'paragraph', 'reference', 'blockquote' ] ],
  [ 'heading',    heading,    [ 'paragraph', 'reference', 'blockquote' ] ],
  [ 'lheading',   lheading ],
  [ 'paragraph',  paragraph ]
];


/**
 * new ParserBlock()
 **/
function ParserBlock() {
  /**
   * ParserBlock#ruler -> Ruler
   *
   * [[Ruler]] instance. Keep configuration of block rules.
   **/
  this.ruler = new ruler();

  for (var i = 0; i < _rules$1.length; i++) {
    this.ruler.push(_rules$1[i][0], _rules$1[i][1], { alt: (_rules$1[i][2] || []).slice() });
  }
}


// Generate tokens for input range
//
ParserBlock.prototype.tokenize = function (state, startLine, endLine) {
  var ok, i,
      rules = this.ruler.getRules(''),
      len = rules.length,
      line = startLine,
      hasEmptyLines = false,
      maxNesting = state.md.options.maxNesting;

  while (line < endLine) {
    state.line = line = state.skipEmptyLines(line);
    if (line >= endLine) { break; }

    // Termination condition for nested calls.
    // Nested calls currently used for blockquotes & lists
    if (state.sCount[line] < state.blkIndent) { break; }

    // If nesting level exceeded - skip tail to the end. That's not ordinary
    // situation and we should not care about content.
    if (state.level >= maxNesting) {
      state.line = endLine;
      break;
    }

    // Try all possible rules.
    // On success, rule should:
    //
    // - update `state.line`
    // - update `state.tokens`
    // - return true

    for (i = 0; i < len; i++) {
      ok = rules[i](state, line, endLine, false);
      if (ok) { break; }
    }

    // set state.tight if we had an empty line before current tag
    // i.e. latest empty line should not count
    state.tight = !hasEmptyLines;

    // paragraph might "eat" one newline after it in nested lists
    if (state.isEmpty(state.line - 1)) {
      hasEmptyLines = true;
    }

    line = state.line;

    if (line < endLine && state.isEmpty(line)) {
      hasEmptyLines = true;
      line++;
      state.line = line;
    }
  }
};


/**
 * ParserBlock.parse(str, md, env, outTokens)
 *
 * Process input string and push block tokens into `outTokens`
 **/
ParserBlock.prototype.parse = function (src, md, env, outTokens) {
  var state;

  if (!src) { return; }

  state = new this.State(src, md, env, outTokens);

  this.tokenize(state, state.line, state.lineMax);
};


ParserBlock.prototype.State = state_block;


var parser_block = ParserBlock;

// Skip text characters for text token, place those to pending buffer


// Rule to skip pure text
// '{}$%@~+=:' reserved for extentions

// !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~

// !!!! Don't confuse with "Markdown ASCII Punctuation" chars
// http://spec.commonmark.org/0.15/#ascii-punctuation-character
function isTerminatorChar(ch) {
  switch (ch) {
    case 0x0A/* \n */:
    case 0x21/* ! */:
    case 0x23/* # */:
    case 0x24/* $ */:
    case 0x25/* % */:
    case 0x26/* & */:
    case 0x2A/* * */:
    case 0x2B/* + */:
    case 0x2D/* - */:
    case 0x3A/* : */:
    case 0x3C/* < */:
    case 0x3D/* = */:
    case 0x3E/* > */:
    case 0x40/* @ */:
    case 0x5B/* [ */:
    case 0x5C/* \ */:
    case 0x5D/* ] */:
    case 0x5E/* ^ */:
    case 0x5F/* _ */:
    case 0x60/* ` */:
    case 0x7B/* { */:
    case 0x7D/* } */:
    case 0x7E/* ~ */:
      return true;
    default:
      return false;
  }
}

var text = function text(state, silent) {
  var pos = state.pos;

  while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
    pos++;
  }

  if (pos === state.pos) { return false; }

  if (!silent) { state.pending += state.src.slice(state.pos, pos); }

  state.pos = pos;

  return true;
};

var isSpace$3 = utils$1.isSpace;


var newline = function newline(state, silent) {
  var pmax, max, pos = state.pos;

  if (state.src.charCodeAt(pos) !== 0x0A/* \n */) { return false; }

  pmax = state.pending.length - 1;
  max = state.posMax;

  // '  \n' -> hardbreak
  // Lookup in pending chars is bad practice! Don't copy to other rules!
  // Pending string is stored in concat mode, indexed lookups will cause
  // convertion to flat mode.
  if (!silent) {
    if (pmax >= 0 && state.pending.charCodeAt(pmax) === 0x20) {
      if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 0x20) {
        state.pending = state.pending.replace(/ +$/, '');
        state.push('hardbreak', 'br', 0);
      } else {
        state.pending = state.pending.slice(0, -1);
        state.push('softbreak', 'br', 0);
      }

    } else {
      state.push('softbreak', 'br', 0);
    }
  }

  pos++;

  // skip heading spaces for next line
  while (pos < max && isSpace$3(state.src.charCodeAt(pos))) { pos++; }

  state.pos = pos;
  return true;
};

var isSpace$2 = utils$1.isSpace;

var ESCAPED = [];

for (var i = 0; i < 256; i++) { ESCAPED.push(0); }

'\\!"#$%&\'()*+,./:;<=>?@[]^_`{|}~-'
  .split('').forEach(function (ch) { ESCAPED[ch.charCodeAt(0)] = 1; });


var _escape = function escape(state, silent) {
  var ch, pos = state.pos, max = state.posMax;

  if (state.src.charCodeAt(pos) !== 0x5C/* \ */) { return false; }

  pos++;

  if (pos < max) {
    ch = state.src.charCodeAt(pos);

    if (ch < 256 && ESCAPED[ch] !== 0) {
      if (!silent) { state.pending += state.src[pos]; }
      state.pos += 2;
      return true;
    }

    if (ch === 0x0A) {
      if (!silent) {
        state.push('hardbreak', 'br', 0);
      }

      pos++;
      // skip leading whitespaces from next line
      while (pos < max) {
        ch = state.src.charCodeAt(pos);
        if (!isSpace$2(ch)) { break; }
        pos++;
      }

      state.pos = pos;
      return true;
    }
  }

  if (!silent) { state.pending += '\\'; }
  state.pos++;
  return true;
};

// Parse backticks


var backticks = function backtick(state, silent) {
  var start, max, marker, token, matchStart, matchEnd, openerLength, closerLength,
      pos = state.pos,
      ch = state.src.charCodeAt(pos);

  if (ch !== 0x60/* ` */) { return false; }

  start = pos;
  pos++;
  max = state.posMax;

  // scan marker length
  while (pos < max && state.src.charCodeAt(pos) === 0x60/* ` */) { pos++; }

  marker = state.src.slice(start, pos);
  openerLength = marker.length;

  if (state.backticksScanned && (state.backticks[openerLength] || 0) <= start) {
    if (!silent) state.pending += marker;
    state.pos += openerLength;
    return true;
  }

  matchStart = matchEnd = pos;

  // Nothing found in the cache, scan until the end of the line (or until marker is found)
  while ((matchStart = state.src.indexOf('`', matchEnd)) !== -1) {
    matchEnd = matchStart + 1;

    // scan marker length
    while (matchEnd < max && state.src.charCodeAt(matchEnd) === 0x60/* ` */) { matchEnd++; }

    closerLength = matchEnd - matchStart;

    if (closerLength === openerLength) {
      // Found matching closer length.
      if (!silent) {
        token     = state.push('code_inline', 'code', 0);
        token.markup  = marker;
        token.content = state.src.slice(pos, matchStart)
          .replace(/\n/g, ' ')
          .replace(/^ (.+) $/, '$1');
      }
      state.pos = matchEnd;
      return true;
    }

    // Some different length found, put it in cache as upper limit of where closer can be found
    state.backticks[closerLength] = matchStart;
  }

  // Scanned through the end, didn't find anything
  state.backticksScanned = true;

  if (!silent) state.pending += marker;
  state.pos += openerLength;
  return true;
};

// ~~strike through~~


// Insert each marker as a separate text token, and add it to delimiter list
//
var tokenize$1 = function strikethrough(state, silent) {
  var i, scanned, token, len, ch,
      start = state.pos,
      marker = state.src.charCodeAt(start);

  if (silent) { return false; }

  if (marker !== 0x7E/* ~ */) { return false; }

  scanned = state.scanDelims(state.pos, true);
  len = scanned.length;
  ch = String.fromCharCode(marker);

  if (len < 2) { return false; }

  if (len % 2) {
    token         = state.push('text', '', 0);
    token.content = ch;
    len--;
  }

  for (i = 0; i < len; i += 2) {
    token         = state.push('text', '', 0);
    token.content = ch + ch;

    state.delimiters.push({
      marker: marker,
      length: 0,     // disable "rule of 3" length checks meant for emphasis
      jump:   i / 2, // for `~~` 1 marker = 2 characters
      token:  state.tokens.length - 1,
      end:    -1,
      open:   scanned.can_open,
      close:  scanned.can_close
    });
  }

  state.pos += scanned.length;

  return true;
};


function postProcess$1(state, delimiters) {
  var i, j,
      startDelim,
      endDelim,
      token,
      loneMarkers = [],
      max = delimiters.length;

  for (i = 0; i < max; i++) {
    startDelim = delimiters[i];

    if (startDelim.marker !== 0x7E/* ~ */) {
      continue;
    }

    if (startDelim.end === -1) {
      continue;
    }

    endDelim = delimiters[startDelim.end];

    token         = state.tokens[startDelim.token];
    token.type    = 's_open';
    token.tag     = 's';
    token.nesting = 1;
    token.markup  = '~~';
    token.content = '';

    token         = state.tokens[endDelim.token];
    token.type    = 's_close';
    token.tag     = 's';
    token.nesting = -1;
    token.markup  = '~~';
    token.content = '';

    if (state.tokens[endDelim.token - 1].type === 'text' &&
        state.tokens[endDelim.token - 1].content === '~') {

      loneMarkers.push(endDelim.token - 1);
    }
  }

  // If a marker sequence has an odd number of characters, it's splitted
  // like this: `~~~~~` -> `~` + `~~` + `~~`, leaving one marker at the
  // start of the sequence.
  //
  // So, we have to move all those markers after subsequent s_close tags.
  //
  while (loneMarkers.length) {
    i = loneMarkers.pop();
    j = i + 1;

    while (j < state.tokens.length && state.tokens[j].type === 's_close') {
      j++;
    }

    j--;

    if (i !== j) {
      token = state.tokens[j];
      state.tokens[j] = state.tokens[i];
      state.tokens[i] = token;
    }
  }
}


// Walk through delimiter list and replace text tokens with tags
//
var postProcess_1$1 = function strikethrough(state) {
  var curr,
      tokens_meta = state.tokens_meta,
      max = state.tokens_meta.length;

  postProcess$1(state, state.delimiters);

  for (curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      postProcess$1(state, tokens_meta[curr].delimiters);
    }
  }
};

var strikethrough = {
	tokenize: tokenize$1,
	postProcess: postProcess_1$1
};

// Process *this* and _that_


// Insert each marker as a separate text token, and add it to delimiter list
//
var tokenize = function emphasis(state, silent) {
  var i, scanned, token,
      start = state.pos,
      marker = state.src.charCodeAt(start);

  if (silent) { return false; }

  if (marker !== 0x5F /* _ */ && marker !== 0x2A /* * */) { return false; }

  scanned = state.scanDelims(state.pos, marker === 0x2A);

  for (i = 0; i < scanned.length; i++) {
    token         = state.push('text', '', 0);
    token.content = String.fromCharCode(marker);

    state.delimiters.push({
      // Char code of the starting marker (number).
      //
      marker: marker,

      // Total length of these series of delimiters.
      //
      length: scanned.length,

      // An amount of characters before this one that's equivalent to
      // current one. In plain English: if this delimiter does not open
      // an emphasis, neither do previous `jump` characters.
      //
      // Used to skip sequences like "*****" in one step, for 1st asterisk
      // value will be 0, for 2nd it's 1 and so on.
      //
      jump:   i,

      // A position of the token this delimiter corresponds to.
      //
      token:  state.tokens.length - 1,

      // If this delimiter is matched as a valid opener, `end` will be
      // equal to its position, otherwise it's `-1`.
      //
      end:    -1,

      // Boolean flags that determine if this delimiter could open or close
      // an emphasis.
      //
      open:   scanned.can_open,
      close:  scanned.can_close
    });
  }

  state.pos += scanned.length;

  return true;
};


function postProcess(state, delimiters) {
  var i,
      startDelim,
      endDelim,
      token,
      ch,
      isStrong,
      max = delimiters.length;

  for (i = max - 1; i >= 0; i--) {
    startDelim = delimiters[i];

    if (startDelim.marker !== 0x5F/* _ */ && startDelim.marker !== 0x2A/* * */) {
      continue;
    }

    // Process only opening markers
    if (startDelim.end === -1) {
      continue;
    }

    endDelim = delimiters[startDelim.end];

    // If the previous delimiter has the same marker and is adjacent to this one,
    // merge those into one strong delimiter.
    //
    // `<em><em>whatever</em></em>` -> `<strong>whatever</strong>`
    //
    isStrong = i > 0 &&
               delimiters[i - 1].end === startDelim.end + 1 &&
               delimiters[i - 1].token === startDelim.token - 1 &&
               delimiters[startDelim.end + 1].token === endDelim.token + 1 &&
               delimiters[i - 1].marker === startDelim.marker;

    ch = String.fromCharCode(startDelim.marker);

    token         = state.tokens[startDelim.token];
    token.type    = isStrong ? 'strong_open' : 'em_open';
    token.tag     = isStrong ? 'strong' : 'em';
    token.nesting = 1;
    token.markup  = isStrong ? ch + ch : ch;
    token.content = '';

    token         = state.tokens[endDelim.token];
    token.type    = isStrong ? 'strong_close' : 'em_close';
    token.tag     = isStrong ? 'strong' : 'em';
    token.nesting = -1;
    token.markup  = isStrong ? ch + ch : ch;
    token.content = '';

    if (isStrong) {
      state.tokens[delimiters[i - 1].token].content = '';
      state.tokens[delimiters[startDelim.end + 1].token].content = '';
      i--;
    }
  }
}


// Walk through delimiter list and replace text tokens with tags
//
var postProcess_1 = function emphasis(state) {
  var curr,
      tokens_meta = state.tokens_meta,
      max = state.tokens_meta.length;

  postProcess(state, state.delimiters);

  for (curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      postProcess(state, tokens_meta[curr].delimiters);
    }
  }
};

var emphasis = {
	tokenize: tokenize,
	postProcess: postProcess_1
};

var normalizeReference$1   = utils$1.normalizeReference;
var isSpace$1              = utils$1.isSpace;


var link = function link(state, silent) {
  var attrs,
      code,
      label,
      labelEnd,
      labelStart,
      pos,
      res,
      ref,
      token,
      href = '',
      title = '',
      oldPos = state.pos,
      max = state.posMax,
      start = state.pos,
      parseReference = true;

  if (state.src.charCodeAt(state.pos) !== 0x5B/* [ */) { return false; }

  labelStart = state.pos + 1;
  labelEnd = state.md.helpers.parseLinkLabel(state, state.pos, true);

  // parser failed to find ']', so it's not a valid link
  if (labelEnd < 0) { return false; }

  pos = labelEnd + 1;
  if (pos < max && state.src.charCodeAt(pos) === 0x28/* ( */) {
    //
    // Inline link
    //

    // might have found a valid shortcut link, disable reference parsing
    parseReference = false;

    // [link](  <href>  "title"  )
    //        ^^ skipping these spaces
    pos++;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!isSpace$1(code) && code !== 0x0A) { break; }
    }
    if (pos >= max) { return false; }

    // [link](  <href>  "title"  )
    //          ^^^^^^ parsing link destination
    start = pos;
    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
    if (res.ok) {
      href = state.md.normalizeLink(res.str);
      if (state.md.validateLink(href)) {
        pos = res.pos;
      } else {
        href = '';
      }

      // [link](  <href>  "title"  )
      //                ^^ skipping these spaces
      start = pos;
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (!isSpace$1(code) && code !== 0x0A) { break; }
      }

      // [link](  <href>  "title"  )
      //                  ^^^^^^^ parsing link title
      res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
      if (pos < max && start !== pos && res.ok) {
        title = res.str;
        pos = res.pos;

        // [link](  <href>  "title"  )
        //                         ^^ skipping these spaces
        for (; pos < max; pos++) {
          code = state.src.charCodeAt(pos);
          if (!isSpace$1(code) && code !== 0x0A) { break; }
        }
      }
    }

    if (pos >= max || state.src.charCodeAt(pos) !== 0x29/* ) */) {
      // parsing a valid shortcut link failed, fallback to reference
      parseReference = true;
    }
    pos++;
  }

  if (parseReference) {
    //
    // Link reference
    //
    if (typeof state.env.references === 'undefined') { return false; }

    if (pos < max && state.src.charCodeAt(pos) === 0x5B/* [ */) {
      start = pos + 1;
      pos = state.md.helpers.parseLinkLabel(state, pos);
      if (pos >= 0) {
        label = state.src.slice(start, pos++);
      } else {
        pos = labelEnd + 1;
      }
    } else {
      pos = labelEnd + 1;
    }

    // covers label === '' and label === undefined
    // (collapsed reference link and shortcut reference link respectively)
    if (!label) { label = state.src.slice(labelStart, labelEnd); }

    ref = state.env.references[normalizeReference$1(label)];
    if (!ref) {
      state.pos = oldPos;
      return false;
    }
    href = ref.href;
    title = ref.title;
  }

  //
  // We found the end of the link, and know for a fact it's a valid link;
  // so all that's left to do is to call tokenizer.
  //
  if (!silent) {
    state.pos = labelStart;
    state.posMax = labelEnd;

    token        = state.push('link_open', 'a', 1);
    token.attrs  = attrs = [ [ 'href', href ] ];
    if (title) {
      attrs.push([ 'title', title ]);
    }

    state.md.inline.tokenize(state);

    token        = state.push('link_close', 'a', -1);
  }

  state.pos = pos;
  state.posMax = max;
  return true;
};

var normalizeReference   = utils$1.normalizeReference;
var isSpace              = utils$1.isSpace;


var image = function image(state, silent) {
  var attrs,
      code,
      content,
      label,
      labelEnd,
      labelStart,
      pos,
      ref,
      res,
      title,
      token,
      tokens,
      start,
      href = '',
      oldPos = state.pos,
      max = state.posMax;

  if (state.src.charCodeAt(state.pos) !== 0x21/* ! */) { return false; }
  if (state.src.charCodeAt(state.pos + 1) !== 0x5B/* [ */) { return false; }

  labelStart = state.pos + 2;
  labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false);

  // parser failed to find ']', so it's not a valid link
  if (labelEnd < 0) { return false; }

  pos = labelEnd + 1;
  if (pos < max && state.src.charCodeAt(pos) === 0x28/* ( */) {
    //
    // Inline link
    //

    // [link](  <href>  "title"  )
    //        ^^ skipping these spaces
    pos++;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!isSpace(code) && code !== 0x0A) { break; }
    }
    if (pos >= max) { return false; }

    // [link](  <href>  "title"  )
    //          ^^^^^^ parsing link destination
    start = pos;
    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
    if (res.ok) {
      href = state.md.normalizeLink(res.str);
      if (state.md.validateLink(href)) {
        pos = res.pos;
      } else {
        href = '';
      }
    }

    // [link](  <href>  "title"  )
    //                ^^ skipping these spaces
    start = pos;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!isSpace(code) && code !== 0x0A) { break; }
    }

    // [link](  <href>  "title"  )
    //                  ^^^^^^^ parsing link title
    res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
    if (pos < max && start !== pos && res.ok) {
      title = res.str;
      pos = res.pos;

      // [link](  <href>  "title"  )
      //                         ^^ skipping these spaces
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (!isSpace(code) && code !== 0x0A) { break; }
      }
    } else {
      title = '';
    }

    if (pos >= max || state.src.charCodeAt(pos) !== 0x29/* ) */) {
      state.pos = oldPos;
      return false;
    }
    pos++;
  } else {
    //
    // Link reference
    //
    if (typeof state.env.references === 'undefined') { return false; }

    if (pos < max && state.src.charCodeAt(pos) === 0x5B/* [ */) {
      start = pos + 1;
      pos = state.md.helpers.parseLinkLabel(state, pos);
      if (pos >= 0) {
        label = state.src.slice(start, pos++);
      } else {
        pos = labelEnd + 1;
      }
    } else {
      pos = labelEnd + 1;
    }

    // covers label === '' and label === undefined
    // (collapsed reference link and shortcut reference link respectively)
    if (!label) { label = state.src.slice(labelStart, labelEnd); }

    ref = state.env.references[normalizeReference(label)];
    if (!ref) {
      state.pos = oldPos;
      return false;
    }
    href = ref.href;
    title = ref.title;
  }

  //
  // We found the end of the link, and know for a fact it's a valid link;
  // so all that's left to do is to call tokenizer.
  //
  if (!silent) {
    content = state.src.slice(labelStart, labelEnd);

    state.md.inline.parse(
      content,
      state.md,
      state.env,
      tokens = []
    );

    token          = state.push('image', 'img', 0);
    token.attrs    = attrs = [ [ 'src', href ], [ 'alt', '' ] ];
    token.children = tokens;
    token.content  = content;

    if (title) {
      attrs.push([ 'title', title ]);
    }
  }

  state.pos = pos;
  state.posMax = max;
  return true;
};

// Process autolinks '<protocol:...>'


/*eslint max-len:0*/
var EMAIL_RE    = /^([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/;
var AUTOLINK_RE = /^([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)$/;


var autolink = function autolink(state, silent) {
  var url, fullUrl, token, ch, start, max,
      pos = state.pos;

  if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false; }

  start = state.pos;
  max = state.posMax;

  for (;;) {
    if (++pos >= max) return false;

    ch = state.src.charCodeAt(pos);

    if (ch === 0x3C /* < */) return false;
    if (ch === 0x3E /* > */) break;
  }

  url = state.src.slice(start + 1, pos);

  if (AUTOLINK_RE.test(url)) {
    fullUrl = state.md.normalizeLink(url);
    if (!state.md.validateLink(fullUrl)) { return false; }

    if (!silent) {
      token         = state.push('link_open', 'a', 1);
      token.attrs   = [ [ 'href', fullUrl ] ];
      token.markup  = 'autolink';
      token.info    = 'auto';

      token         = state.push('text', '', 0);
      token.content = state.md.normalizeLinkText(url);

      token         = state.push('link_close', 'a', -1);
      token.markup  = 'autolink';
      token.info    = 'auto';
    }

    state.pos += url.length + 2;
    return true;
  }

  if (EMAIL_RE.test(url)) {
    fullUrl = state.md.normalizeLink('mailto:' + url);
    if (!state.md.validateLink(fullUrl)) { return false; }

    if (!silent) {
      token         = state.push('link_open', 'a', 1);
      token.attrs   = [ [ 'href', fullUrl ] ];
      token.markup  = 'autolink';
      token.info    = 'auto';

      token         = state.push('text', '', 0);
      token.content = state.md.normalizeLinkText(url);

      token         = state.push('link_close', 'a', -1);
      token.markup  = 'autolink';
      token.info    = 'auto';
    }

    state.pos += url.length + 2;
    return true;
  }

  return false;
};

var HTML_TAG_RE = html_re.HTML_TAG_RE;


function isLetter(ch) {
  /*eslint no-bitwise:0*/
  var lc = ch | 0x20; // to lower case
  return (lc >= 0x61/* a */) && (lc <= 0x7a/* z */);
}


var html_inline = function html_inline(state, silent) {
  var ch, match, max, token,
      pos = state.pos;

  if (!state.md.options.html) { return false; }

  // Check start
  max = state.posMax;
  if (state.src.charCodeAt(pos) !== 0x3C/* < */ ||
      pos + 2 >= max) {
    return false;
  }

  // Quick fail on second char
  ch = state.src.charCodeAt(pos + 1);
  if (ch !== 0x21/* ! */ &&
      ch !== 0x3F/* ? */ &&
      ch !== 0x2F/* / */ &&
      !isLetter(ch)) {
    return false;
  }

  match = state.src.slice(pos).match(HTML_TAG_RE);
  if (!match) { return false; }

  if (!silent) {
    token         = state.push('html_inline', '', 0);
    token.content = state.src.slice(pos, pos + match[0].length);
  }
  state.pos += match[0].length;
  return true;
};

var has               = utils$1.has;
var isValidEntityCode = utils$1.isValidEntityCode;
var fromCodePoint     = utils$1.fromCodePoint;


var DIGITAL_RE = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i;
var NAMED_RE   = /^&([a-z][a-z0-9]{1,31});/i;


var entity = function entity(state, silent) {
  var ch, code, match, pos = state.pos, max = state.posMax;

  if (state.src.charCodeAt(pos) !== 0x26/* & */) { return false; }

  if (pos + 1 < max) {
    ch = state.src.charCodeAt(pos + 1);

    if (ch === 0x23 /* # */) {
      match = state.src.slice(pos).match(DIGITAL_RE);
      if (match) {
        if (!silent) {
          code = match[1][0].toLowerCase() === 'x' ? parseInt(match[1].slice(1), 16) : parseInt(match[1], 10);
          state.pending += isValidEntityCode(code) ? fromCodePoint(code) : fromCodePoint(0xFFFD);
        }
        state.pos += match[0].length;
        return true;
      }
    } else {
      match = state.src.slice(pos).match(NAMED_RE);
      if (match) {
        if (has(entities, match[1])) {
          if (!silent) { state.pending += entities[match[1]]; }
          state.pos += match[0].length;
          return true;
        }
      }
    }
  }

  if (!silent) { state.pending += '&'; }
  state.pos++;
  return true;
};

// For each opening emphasis-like marker find a matching closing one


function processDelimiters(state, delimiters) {
  var closerIdx, openerIdx, closer, opener, minOpenerIdx, newMinOpenerIdx,
      isOddMatch, lastJump,
      openersBottom = {},
      max = delimiters.length;

  for (closerIdx = 0; closerIdx < max; closerIdx++) {
    closer = delimiters[closerIdx];

    // Length is only used for emphasis-specific "rule of 3",
    // if it's not defined (in strikethrough or 3rd party plugins),
    // we can default it to 0 to disable those checks.
    //
    closer.length = closer.length || 0;

    if (!closer.close) continue;

    // Previously calculated lower bounds (previous fails)
    // for each marker and each delimiter length modulo 3.
    if (!openersBottom.hasOwnProperty(closer.marker)) {
      openersBottom[closer.marker] = [ -1, -1, -1 ];
    }

    minOpenerIdx = openersBottom[closer.marker][closer.length % 3];

    openerIdx = closerIdx - closer.jump - 1;

    // avoid crash if `closer.jump` is pointing outside of the array, see #742
    if (openerIdx < -1) openerIdx = -1;

    newMinOpenerIdx = openerIdx;

    for (; openerIdx > minOpenerIdx; openerIdx -= opener.jump + 1) {
      opener = delimiters[openerIdx];

      if (opener.marker !== closer.marker) continue;

      if (opener.open && opener.end < 0) {

        isOddMatch = false;

        // from spec:
        //
        // If one of the delimiters can both open and close emphasis, then the
        // sum of the lengths of the delimiter runs containing the opening and
        // closing delimiters must not be a multiple of 3 unless both lengths
        // are multiples of 3.
        //
        if (opener.close || closer.open) {
          if ((opener.length + closer.length) % 3 === 0) {
            if (opener.length % 3 !== 0 || closer.length % 3 !== 0) {
              isOddMatch = true;
            }
          }
        }

        if (!isOddMatch) {
          // If previous delimiter cannot be an opener, we can safely skip
          // the entire sequence in future checks. This is required to make
          // sure algorithm has linear complexity (see *_*_*_*_*_... case).
          //
          lastJump = openerIdx > 0 && !delimiters[openerIdx - 1].open ?
            delimiters[openerIdx - 1].jump + 1 :
            0;

          closer.jump  = closerIdx - openerIdx + lastJump;
          closer.open  = false;
          opener.end   = closerIdx;
          opener.jump  = lastJump;
          opener.close = false;
          newMinOpenerIdx = -1;
          break;
        }
      }
    }

    if (newMinOpenerIdx !== -1) {
      // If match for this delimiter run failed, we want to set lower bound for
      // future lookups. This is required to make sure algorithm has linear
      // complexity.
      //
      // See details here:
      // https://github.com/commonmark/cmark/issues/178#issuecomment-270417442
      //
      openersBottom[closer.marker][(closer.length || 0) % 3] = newMinOpenerIdx;
    }
  }
}


var balance_pairs = function link_pairs(state) {
  var curr,
      tokens_meta = state.tokens_meta,
      max = state.tokens_meta.length;

  processDelimiters(state, state.delimiters);

  for (curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      processDelimiters(state, tokens_meta[curr].delimiters);
    }
  }
};

// Clean up tokens after emphasis and strikethrough postprocessing:


var text_collapse = function text_collapse(state) {
  var curr, last,
      level = 0,
      tokens = state.tokens,
      max = state.tokens.length;

  for (curr = last = 0; curr < max; curr++) {
    // re-calculate levels after emphasis/strikethrough turns some text nodes
    // into opening/closing tags
    if (tokens[curr].nesting < 0) level--; // closing tag
    tokens[curr].level = level;
    if (tokens[curr].nesting > 0) level++; // opening tag

    if (tokens[curr].type === 'text' &&
        curr + 1 < max &&
        tokens[curr + 1].type === 'text') {

      // collapse two adjacent text nodes
      tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
    } else {
      if (curr !== last) { tokens[last] = tokens[curr]; }

      last++;
    }
  }

  if (curr !== last) {
    tokens.length = last;
  }
};

var isWhiteSpace   = utils$1.isWhiteSpace;
var isPunctChar    = utils$1.isPunctChar;
var isMdAsciiPunct = utils$1.isMdAsciiPunct;


function StateInline(src, md, env, outTokens) {
  this.src = src;
  this.env = env;
  this.md = md;
  this.tokens = outTokens;
  this.tokens_meta = Array(outTokens.length);

  this.pos = 0;
  this.posMax = this.src.length;
  this.level = 0;
  this.pending = '';
  this.pendingLevel = 0;

  // Stores { start: end } pairs. Useful for backtrack
  // optimization of pairs parse (emphasis, strikes).
  this.cache = {};

  // List of emphasis-like delimiters for current tag
  this.delimiters = [];

  // Stack of delimiter lists for upper level tags
  this._prev_delimiters = [];

  // backtick length => last seen position
  this.backticks = {};
  this.backticksScanned = false;
}


// Flush pending text
//
StateInline.prototype.pushPending = function () {
  var token$1 = new token('text', '', 0);
  token$1.content = this.pending;
  token$1.level = this.pendingLevel;
  this.tokens.push(token$1);
  this.pending = '';
  return token$1;
};


// Push new token to "stream".
// If pending text exists - flush it as text token
//
StateInline.prototype.push = function (type, tag, nesting) {
  if (this.pending) {
    this.pushPending();
  }

  var token$1 = new token(type, tag, nesting);
  var token_meta = null;

  if (nesting < 0) {
    // closing tag
    this.level--;
    this.delimiters = this._prev_delimiters.pop();
  }

  token$1.level = this.level;

  if (nesting > 0) {
    // opening tag
    this.level++;
    this._prev_delimiters.push(this.delimiters);
    this.delimiters = [];
    token_meta = { delimiters: this.delimiters };
  }

  this.pendingLevel = this.level;
  this.tokens.push(token$1);
  this.tokens_meta.push(token_meta);
  return token$1;
};


// Scan a sequence of emphasis-like markers, and determine whether
// it can start an emphasis sequence or end an emphasis sequence.
//
//  - start - position to scan from (it should point at a valid marker);
//  - canSplitWord - determine if these markers can be found inside a word
//
StateInline.prototype.scanDelims = function (start, canSplitWord) {
  var pos = start, lastChar, nextChar, count, can_open, can_close,
      isLastWhiteSpace, isLastPunctChar,
      isNextWhiteSpace, isNextPunctChar,
      left_flanking = true,
      right_flanking = true,
      max = this.posMax,
      marker = this.src.charCodeAt(start);

  // treat beginning of the line as a whitespace
  lastChar = start > 0 ? this.src.charCodeAt(start - 1) : 0x20;

  while (pos < max && this.src.charCodeAt(pos) === marker) { pos++; }

  count = pos - start;

  // treat end of the line as a whitespace
  nextChar = pos < max ? this.src.charCodeAt(pos) : 0x20;

  isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
  isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));

  isLastWhiteSpace = isWhiteSpace(lastChar);
  isNextWhiteSpace = isWhiteSpace(nextChar);

  if (isNextWhiteSpace) {
    left_flanking = false;
  } else if (isNextPunctChar) {
    if (!(isLastWhiteSpace || isLastPunctChar)) {
      left_flanking = false;
    }
  }

  if (isLastWhiteSpace) {
    right_flanking = false;
  } else if (isLastPunctChar) {
    if (!(isNextWhiteSpace || isNextPunctChar)) {
      right_flanking = false;
    }
  }

  if (!canSplitWord) {
    can_open  = left_flanking  && (!right_flanking || isLastPunctChar);
    can_close = right_flanking && (!left_flanking  || isNextPunctChar);
  } else {
    can_open  = left_flanking;
    can_close = right_flanking;
  }

  return {
    can_open:  can_open,
    can_close: can_close,
    length:    count
  };
};


// re-export Token class to use in block rules
StateInline.prototype.Token = token;


var state_inline = StateInline;

////////////////////////////////////////////////////////////////////////////////
// Parser rules

var _rules = [
  [ 'text',            text ],
  [ 'newline',         newline ],
  [ 'escape',          _escape ],
  [ 'backticks',       backticks ],
  [ 'strikethrough',   strikethrough.tokenize ],
  [ 'emphasis',        emphasis.tokenize ],
  [ 'link',            link ],
  [ 'image',           image ],
  [ 'autolink',        autolink ],
  [ 'html_inline',     html_inline ],
  [ 'entity',          entity ]
];

var _rules2 = [
  [ 'balance_pairs',   balance_pairs ],
  [ 'strikethrough',   strikethrough.postProcess ],
  [ 'emphasis',        emphasis.postProcess ],
  [ 'text_collapse',   text_collapse ]
];


/**
 * new ParserInline()
 **/
function ParserInline() {
  var i;

  /**
   * ParserInline#ruler -> Ruler
   *
   * [[Ruler]] instance. Keep configuration of inline rules.
   **/
  this.ruler = new ruler();

  for (i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1]);
  }

  /**
   * ParserInline#ruler2 -> Ruler
   *
   * [[Ruler]] instance. Second ruler used for post-processing
   * (e.g. in emphasis-like rules).
   **/
  this.ruler2 = new ruler();

  for (i = 0; i < _rules2.length; i++) {
    this.ruler2.push(_rules2[i][0], _rules2[i][1]);
  }
}


// Skip single token by running all rules in validation mode;
// returns `true` if any rule reported success
//
ParserInline.prototype.skipToken = function (state) {
  var ok, i, pos = state.pos,
      rules = this.ruler.getRules(''),
      len = rules.length,
      maxNesting = state.md.options.maxNesting,
      cache = state.cache;


  if (typeof cache[pos] !== 'undefined') {
    state.pos = cache[pos];
    return;
  }

  if (state.level < maxNesting) {
    for (i = 0; i < len; i++) {
      // Increment state.level and decrement it later to limit recursion.
      // It's harmless to do here, because no tokens are created. But ideally,
      // we'd need a separate private state variable for this purpose.
      //
      state.level++;
      ok = rules[i](state, true);
      state.level--;

      if (ok) { break; }
    }
  } else {
    // Too much nesting, just skip until the end of the paragraph.
    //
    // NOTE: this will cause links to behave incorrectly in the following case,
    //       when an amount of `[` is exactly equal to `maxNesting + 1`:
    //
    //       [[[[[[[[[[[[[[[[[[[[[foo]()
    //
    // TODO: remove this workaround when CM standard will allow nested links
    //       (we can replace it by preventing links from being parsed in
    //       validation mode)
    //
    state.pos = state.posMax;
  }

  if (!ok) { state.pos++; }
  cache[pos] = state.pos;
};


// Generate tokens for input range
//
ParserInline.prototype.tokenize = function (state) {
  var ok, i,
      rules = this.ruler.getRules(''),
      len = rules.length,
      end = state.posMax,
      maxNesting = state.md.options.maxNesting;

  while (state.pos < end) {
    // Try all possible rules.
    // On success, rule should:
    //
    // - update `state.pos`
    // - update `state.tokens`
    // - return true

    if (state.level < maxNesting) {
      for (i = 0; i < len; i++) {
        ok = rules[i](state, false);
        if (ok) { break; }
      }
    }

    if (ok) {
      if (state.pos >= end) { break; }
      continue;
    }

    state.pending += state.src[state.pos++];
  }

  if (state.pending) {
    state.pushPending();
  }
};


/**
 * ParserInline.parse(str, md, env, outTokens)
 *
 * Process input string and push inline tokens into `outTokens`
 **/
ParserInline.prototype.parse = function (str, md, env, outTokens) {
  var i, rules, len;
  var state = new this.State(str, md, env, outTokens);

  this.tokenize(state);

  rules = this.ruler2.getRules('');
  len = rules.length;

  for (i = 0; i < len; i++) {
    rules[i](state);
  }
};


ParserInline.prototype.State = state_inline;


var parser_inline = ParserInline;

var re = function (opts) {
  var re = {};

  // Use direct extract instead of `regenerate` to reduse browserified size
  re.src_Any = regex$3.source;
  re.src_Cc  = regex$2.source;
  re.src_Z   = regex.source;
  re.src_P   = regex$4.source;

  // \p{\Z\P\Cc\CF} (white spaces + control + format + punctuation)
  re.src_ZPCc = [ re.src_Z, re.src_P, re.src_Cc ].join('|');

  // \p{\Z\Cc} (white spaces + control)
  re.src_ZCc = [ re.src_Z, re.src_Cc ].join('|');

  // Experimental. List of chars, completely prohibited in links
  // because can separate it from other part of text
  var text_separators = '[><\uff5c]';

  // All possible word characters (everything without punctuation, spaces & controls)
  // Defined via punctuation & spaces to save space
  // Should be something like \p{\L\N\S\M} (\w but without `_`)
  re.src_pseudo_letter       = '(?:(?!' + text_separators + '|' + re.src_ZPCc + ')' + re.src_Any + ')';
  // The same as abothe but without [0-9]
  // var src_pseudo_letter_non_d = '(?:(?![0-9]|' + src_ZPCc + ')' + src_Any + ')';

  ////////////////////////////////////////////////////////////////////////////////

  re.src_ip4 =

    '(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';

  // Prohibit any of "@/[]()" in user/pass to avoid wrong domain fetch.
  re.src_auth    = '(?:(?:(?!' + re.src_ZCc + '|[@/\\[\\]()]).)+@)?';

  re.src_port =

    '(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?';

  re.src_host_terminator =

    '(?=$|' + text_separators + '|' + re.src_ZPCc + ')(?!-|_|:\\d|\\.-|\\.(?!$|' + re.src_ZPCc + '))';

  re.src_path =

    '(?:' +
      '[/?#]' +
        '(?:' +
          '(?!' + re.src_ZCc + '|' + text_separators + '|[()[\\]{}.,"\'?!\\-]).|' +
          '\\[(?:(?!' + re.src_ZCc + '|\\]).)*\\]|' +
          '\\((?:(?!' + re.src_ZCc + '|[)]).)*\\)|' +
          '\\{(?:(?!' + re.src_ZCc + '|[}]).)*\\}|' +
          '\\"(?:(?!' + re.src_ZCc + '|["]).)+\\"|' +
          "\\'(?:(?!" + re.src_ZCc + "|[']).)+\\'|" +
          "\\'(?=" + re.src_pseudo_letter + '|[-]).|' +  // allow `I'm_king` if no pair found
          '\\.{2,}[a-zA-Z0-9%/&]|' + // google has many dots in "google search" links (#66, #81).
                                     // github has ... in commit range links,
                                     // Restrict to
                                     // - english
                                     // - percent-encoded
                                     // - parts of file path
                                     // - params separator
                                     // until more examples found.
          '\\.(?!' + re.src_ZCc + '|[.]).|' +
          (opts && opts['---'] ?
            '\\-(?!--(?:[^-]|$))(?:-*)|' // `---` => long dash, terminate
            :
            '\\-+|'
          ) +
          '\\,(?!' + re.src_ZCc + ').|' +       // allow `,,,` in paths
          '\\!+(?!' + re.src_ZCc + '|[!]).|' +  // allow `!!!` in paths, but not at the end
          '\\?(?!' + re.src_ZCc + '|[?]).' +
        ')+' +
      '|\\/' +
    ')?';

  // Allow anything in markdown spec, forbid quote (") at the first position
  // because emails enclosed in quotes are far more common
  re.src_email_name =

    '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*';

  re.src_xn =

    'xn--[a-z0-9\\-]{1,59}';

  // More to read about domain names
  // http://serverfault.com/questions/638260/

  re.src_domain_root =

    // Allow letters & digits (http://test1)
    '(?:' +
      re.src_xn +
      '|' +
      re.src_pseudo_letter + '{1,63}' +
    ')';

  re.src_domain =

    '(?:' +
      re.src_xn +
      '|' +
      '(?:' + re.src_pseudo_letter + ')' +
      '|' +
      '(?:' + re.src_pseudo_letter + '(?:-|' + re.src_pseudo_letter + '){0,61}' + re.src_pseudo_letter + ')' +
    ')';

  re.src_host =

    '(?:' +
    // Don't need IP check, because digits are already allowed in normal domain names
    //   src_ip4 +
    // '|' +
      '(?:(?:(?:' + re.src_domain + ')\\.)*' + re.src_domain/*_root*/ + ')' +
    ')';

  re.tpl_host_fuzzy =

    '(?:' +
      re.src_ip4 +
    '|' +
      '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))' +
    ')';

  re.tpl_host_no_ip_fuzzy =

    '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))';

  re.src_host_strict =

    re.src_host + re.src_host_terminator;

  re.tpl_host_fuzzy_strict =

    re.tpl_host_fuzzy + re.src_host_terminator;

  re.src_host_port_strict =

    re.src_host + re.src_port + re.src_host_terminator;

  re.tpl_host_port_fuzzy_strict =

    re.tpl_host_fuzzy + re.src_port + re.src_host_terminator;

  re.tpl_host_port_no_ip_fuzzy_strict =

    re.tpl_host_no_ip_fuzzy + re.src_port + re.src_host_terminator;


  ////////////////////////////////////////////////////////////////////////////////
  // Main rules

  // Rude test fuzzy links by host, for quick deny
  re.tpl_host_fuzzy_test =

    'localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:' + re.src_ZPCc + '|>|$))';

  re.tpl_email_fuzzy =

      '(^|' + text_separators + '|"|\\(|' + re.src_ZCc + ')' +
      '(' + re.src_email_name + '@' + re.tpl_host_fuzzy_strict + ')';

  re.tpl_link_fuzzy =
      // Fuzzy link can't be prepended with .:/\- and non punctuation.
      // but can start with > (markdown blockquote)
      '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' +
      '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_fuzzy_strict + re.src_path + ')';

  re.tpl_link_no_ip_fuzzy =
      // Fuzzy link can't be prepended with .:/\- and non punctuation.
      // but can start with > (markdown blockquote)
      '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' +
      '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_no_ip_fuzzy_strict + re.src_path + ')';

  return re;
};

////////////////////////////////////////////////////////////////////////////////
// Helpers

// Merge objects
//
function assign(obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);

  sources.forEach(function (source) {
    if (!source) { return; }

    Object.keys(source).forEach(function (key) {
      obj[key] = source[key];
    });
  });

  return obj;
}

function _class(obj) { return Object.prototype.toString.call(obj); }
function isString(obj) { return _class(obj) === '[object String]'; }
function isObject(obj) { return _class(obj) === '[object Object]'; }
function isRegExp(obj) { return _class(obj) === '[object RegExp]'; }
function isFunction(obj) { return _class(obj) === '[object Function]'; }


function escapeRE(str) { return str.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&'); }

////////////////////////////////////////////////////////////////////////////////


var defaultOptions = {
  fuzzyLink: true,
  fuzzyEmail: true,
  fuzzyIP: false
};


function isOptionsObj(obj) {
  return Object.keys(obj || {}).reduce(function (acc, k) {
    return acc || defaultOptions.hasOwnProperty(k);
  }, false);
}


var defaultSchemas = {
  'http:': {
    validate: function (text, pos, self) {
      var tail = text.slice(pos);

      if (!self.re.http) {
        // compile lazily, because "host"-containing variables can change on tlds update.
        self.re.http =  new RegExp(
          '^\\/\\/' + self.re.src_auth + self.re.src_host_port_strict + self.re.src_path, 'i'
        );
      }
      if (self.re.http.test(tail)) {
        return tail.match(self.re.http)[0].length;
      }
      return 0;
    }
  },
  'https:':  'http:',
  'ftp:':    'http:',
  '//':      {
    validate: function (text, pos, self) {
      var tail = text.slice(pos);

      if (!self.re.no_http) {
      // compile lazily, because "host"-containing variables can change on tlds update.
        self.re.no_http =  new RegExp(
          '^' +
          self.re.src_auth +
          // Don't allow single-level domains, because of false positives like '//test'
          // with code comments
          '(?:localhost|(?:(?:' + self.re.src_domain + ')\\.)+' + self.re.src_domain_root + ')' +
          self.re.src_port +
          self.re.src_host_terminator +
          self.re.src_path,

          'i'
        );
      }

      if (self.re.no_http.test(tail)) {
        // should not be `://` & `///`, that protects from errors in protocol name
        if (pos >= 3 && text[pos - 3] === ':') { return 0; }
        if (pos >= 3 && text[pos - 3] === '/') { return 0; }
        return tail.match(self.re.no_http)[0].length;
      }
      return 0;
    }
  },
  'mailto:': {
    validate: function (text, pos, self) {
      var tail = text.slice(pos);

      if (!self.re.mailto) {
        self.re.mailto =  new RegExp(
          '^' + self.re.src_email_name + '@' + self.re.src_host_strict, 'i'
        );
      }
      if (self.re.mailto.test(tail)) {
        return tail.match(self.re.mailto)[0].length;
      }
      return 0;
    }
  }
};

/*eslint-disable max-len*/

// RE pattern for 2-character tlds (autogenerated by ./support/tlds_2char_gen.js)
var tlds_2ch_src_re = 'a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]';

// DON'T try to make PRs with changes. Extend TLDs with LinkifyIt.tlds() instead
var tlds_default = 'biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф'.split('|');

/*eslint-enable max-len*/

////////////////////////////////////////////////////////////////////////////////

function resetScanCache(self) {
  self.__index__ = -1;
  self.__text_cache__   = '';
}

function createValidator(re) {
  return function (text, pos) {
    var tail = text.slice(pos);

    if (re.test(tail)) {
      return tail.match(re)[0].length;
    }
    return 0;
  };
}

function createNormalizer() {
  return function (match, self) {
    self.normalize(match);
  };
}

// Schemas compiler. Build regexps.
//
function compile(self) {

  // Load & clone RE patterns.
  var re$1 = self.re = re(self.__opts__);

  // Define dynamic patterns
  var tlds = self.__tlds__.slice();

  self.onCompile();

  if (!self.__tlds_replaced__) {
    tlds.push(tlds_2ch_src_re);
  }
  tlds.push(re$1.src_xn);

  re$1.src_tlds = tlds.join('|');

  function untpl(tpl) { return tpl.replace('%TLDS%', re$1.src_tlds); }

  re$1.email_fuzzy      = RegExp(untpl(re$1.tpl_email_fuzzy), 'i');
  re$1.link_fuzzy       = RegExp(untpl(re$1.tpl_link_fuzzy), 'i');
  re$1.link_no_ip_fuzzy = RegExp(untpl(re$1.tpl_link_no_ip_fuzzy), 'i');
  re$1.host_fuzzy_test  = RegExp(untpl(re$1.tpl_host_fuzzy_test), 'i');

  //
  // Compile each schema
  //

  var aliases = [];

  self.__compiled__ = {}; // Reset compiled data

  function schemaError(name, val) {
    throw new Error('(LinkifyIt) Invalid schema "' + name + '": ' + val);
  }

  Object.keys(self.__schemas__).forEach(function (name) {
    var val = self.__schemas__[name];

    // skip disabled methods
    if (val === null) { return; }

    var compiled = { validate: null, link: null };

    self.__compiled__[name] = compiled;

    if (isObject(val)) {
      if (isRegExp(val.validate)) {
        compiled.validate = createValidator(val.validate);
      } else if (isFunction(val.validate)) {
        compiled.validate = val.validate;
      } else {
        schemaError(name, val);
      }

      if (isFunction(val.normalize)) {
        compiled.normalize = val.normalize;
      } else if (!val.normalize) {
        compiled.normalize = createNormalizer();
      } else {
        schemaError(name, val);
      }

      return;
    }

    if (isString(val)) {
      aliases.push(name);
      return;
    }

    schemaError(name, val);
  });

  //
  // Compile postponed aliases
  //

  aliases.forEach(function (alias) {
    if (!self.__compiled__[self.__schemas__[alias]]) {
      // Silently fail on missed schemas to avoid errons on disable.
      // schemaError(alias, self.__schemas__[alias]);
      return;
    }

    self.__compiled__[alias].validate =
      self.__compiled__[self.__schemas__[alias]].validate;
    self.__compiled__[alias].normalize =
      self.__compiled__[self.__schemas__[alias]].normalize;
  });

  //
  // Fake record for guessed links
  //
  self.__compiled__[''] = { validate: null, normalize: createNormalizer() };

  //
  // Build schema condition
  //
  var slist = Object.keys(self.__compiled__)
                      .filter(function (name) {
                        // Filter disabled & fake schemas
                        return name.length > 0 && self.__compiled__[name];
                      })
                      .map(escapeRE)
                      .join('|');
  // (?!_) cause 1.5x slowdown
  self.re.schema_test   = RegExp('(^|(?!_)(?:[><\uff5c]|' + re$1.src_ZPCc + '))(' + slist + ')', 'i');
  self.re.schema_search = RegExp('(^|(?!_)(?:[><\uff5c]|' + re$1.src_ZPCc + '))(' + slist + ')', 'ig');

  self.re.pretest = RegExp(
    '(' + self.re.schema_test.source + ')|(' + self.re.host_fuzzy_test.source + ')|@',
    'i'
  );

  //
  // Cleanup
  //

  resetScanCache(self);
}

/**
 * class Match
 *
 * Match result. Single element of array, returned by [[LinkifyIt#match]]
 **/
function Match(self, shift) {
  var start = self.__index__,
      end   = self.__last_index__,
      text  = self.__text_cache__.slice(start, end);

  /**
   * Match#schema -> String
   *
   * Prefix (protocol) for matched string.
   **/
  this.schema    = self.__schema__.toLowerCase();
  /**
   * Match#index -> Number
   *
   * First position of matched string.
   **/
  this.index     = start + shift;
  /**
   * Match#lastIndex -> Number
   *
   * Next position after matched string.
   **/
  this.lastIndex = end + shift;
  /**
   * Match#raw -> String
   *
   * Matched string.
   **/
  this.raw       = text;
  /**
   * Match#text -> String
   *
   * Notmalized text of matched string.
   **/
  this.text      = text;
  /**
   * Match#url -> String
   *
   * Normalized url of matched string.
   **/
  this.url       = text;
}

function createMatch(self, shift) {
  var match = new Match(self, shift);

  self.__compiled__[match.schema].normalize(match, self);

  return match;
}


/**
 * class LinkifyIt
 **/

/**
 * new LinkifyIt(schemas, options)
 * - schemas (Object): Optional. Additional schemas to validate (prefix/validator)
 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
 *
 * Creates new linkifier instance with optional additional schemas.
 * Can be called without `new` keyword for convenience.
 *
 * By default understands:
 *
 * - `http(s)://...` , `ftp://...`, `mailto:...` & `//...` links
 * - "fuzzy" links and emails (example.com, foo@bar.com).
 *
 * `schemas` is an object, where each key/value describes protocol/rule:
 *
 * - __key__ - link prefix (usually, protocol name with `:` at the end, `skype:`
 *   for example). `linkify-it` makes shure that prefix is not preceeded with
 *   alphanumeric char and symbols. Only whitespaces and punctuation allowed.
 * - __value__ - rule to check tail after link prefix
 *   - _String_ - just alias to existing rule
 *   - _Object_
 *     - _validate_ - validator function (should return matched length on success),
 *       or `RegExp`.
 *     - _normalize_ - optional function to normalize text & url of matched result
 *       (for example, for @twitter mentions).
 *
 * `options`:
 *
 * - __fuzzyLink__ - recognige URL-s without `http(s):` prefix. Default `true`.
 * - __fuzzyIP__ - allow IPs in fuzzy links above. Can conflict with some texts
 *   like version numbers. Default `false`.
 * - __fuzzyEmail__ - recognize emails without `mailto:` prefix.
 *
 **/
function LinkifyIt(schemas, options) {
  if (!(this instanceof LinkifyIt)) {
    return new LinkifyIt(schemas, options);
  }

  if (!options) {
    if (isOptionsObj(schemas)) {
      options = schemas;
      schemas = {};
    }
  }

  this.__opts__           = assign({}, defaultOptions, options);

  // Cache last tested result. Used to skip repeating steps on next `match` call.
  this.__index__          = -1;
  this.__last_index__     = -1; // Next scan position
  this.__schema__         = '';
  this.__text_cache__     = '';

  this.__schemas__        = assign({}, defaultSchemas, schemas);
  this.__compiled__       = {};

  this.__tlds__           = tlds_default;
  this.__tlds_replaced__  = false;

  this.re = {};

  compile(this);
}


/** chainable
 * LinkifyIt#add(schema, definition)
 * - schema (String): rule name (fixed pattern prefix)
 * - definition (String|RegExp|Object): schema definition
 *
 * Add new rule definition. See constructor description for details.
 **/
LinkifyIt.prototype.add = function add(schema, definition) {
  this.__schemas__[schema] = definition;
  compile(this);
  return this;
};


/** chainable
 * LinkifyIt#set(options)
 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
 *
 * Set recognition options for links without schema.
 **/
LinkifyIt.prototype.set = function set(options) {
  this.__opts__ = assign(this.__opts__, options);
  return this;
};


/**
 * LinkifyIt#test(text) -> Boolean
 *
 * Searches linkifiable pattern and returns `true` on success or `false` on fail.
 **/
LinkifyIt.prototype.test = function test(text) {
  // Reset scan cache
  this.__text_cache__ = text;
  this.__index__      = -1;

  if (!text.length) { return false; }

  var m, ml, me, len, shift, next, re, tld_pos, at_pos;

  // try to scan for link with schema - that's the most simple rule
  if (this.re.schema_test.test(text)) {
    re = this.re.schema_search;
    re.lastIndex = 0;
    while ((m = re.exec(text)) !== null) {
      len = this.testSchemaAt(text, m[2], re.lastIndex);
      if (len) {
        this.__schema__     = m[2];
        this.__index__      = m.index + m[1].length;
        this.__last_index__ = m.index + m[0].length + len;
        break;
      }
    }
  }

  if (this.__opts__.fuzzyLink && this.__compiled__['http:']) {
    // guess schemaless links
    tld_pos = text.search(this.re.host_fuzzy_test);
    if (tld_pos >= 0) {
      // if tld is located after found link - no need to check fuzzy pattern
      if (this.__index__ < 0 || tld_pos < this.__index__) {
        if ((ml = text.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {

          shift = ml.index + ml[1].length;

          if (this.__index__ < 0 || shift < this.__index__) {
            this.__schema__     = '';
            this.__index__      = shift;
            this.__last_index__ = ml.index + ml[0].length;
          }
        }
      }
    }
  }

  if (this.__opts__.fuzzyEmail && this.__compiled__['mailto:']) {
    // guess schemaless emails
    at_pos = text.indexOf('@');
    if (at_pos >= 0) {
      // We can't skip this check, because this cases are possible:
      // 192.168.1.1@gmail.com, my.in@example.com
      if ((me = text.match(this.re.email_fuzzy)) !== null) {

        shift = me.index + me[1].length;
        next  = me.index + me[0].length;

        if (this.__index__ < 0 || shift < this.__index__ ||
            (shift === this.__index__ && next > this.__last_index__)) {
          this.__schema__     = 'mailto:';
          this.__index__      = shift;
          this.__last_index__ = next;
        }
      }
    }
  }

  return this.__index__ >= 0;
};


/**
 * LinkifyIt#pretest(text) -> Boolean
 *
 * Very quick check, that can give false positives. Returns true if link MAY BE
 * can exists. Can be used for speed optimization, when you need to check that
 * link NOT exists.
 **/
LinkifyIt.prototype.pretest = function pretest(text) {
  return this.re.pretest.test(text);
};


/**
 * LinkifyIt#testSchemaAt(text, name, position) -> Number
 * - text (String): text to scan
 * - name (String): rule (schema) name
 * - position (Number): text offset to check from
 *
 * Similar to [[LinkifyIt#test]] but checks only specific protocol tail exactly
 * at given position. Returns length of found pattern (0 on fail).
 **/
LinkifyIt.prototype.testSchemaAt = function testSchemaAt(text, schema, pos) {
  // If not supported schema check requested - terminate
  if (!this.__compiled__[schema.toLowerCase()]) {
    return 0;
  }
  return this.__compiled__[schema.toLowerCase()].validate(text, pos, this);
};


/**
 * LinkifyIt#match(text) -> Array|null
 *
 * Returns array of found link descriptions or `null` on fail. We strongly
 * recommend to use [[LinkifyIt#test]] first, for best speed.
 *
 * ##### Result match description
 *
 * - __schema__ - link schema, can be empty for fuzzy links, or `//` for
 *   protocol-neutral  links.
 * - __index__ - offset of matched text
 * - __lastIndex__ - index of next char after mathch end
 * - __raw__ - matched text
 * - __text__ - normalized text
 * - __url__ - link, generated from matched text
 **/
LinkifyIt.prototype.match = function match(text) {
  var shift = 0, result = [];

  // Try to take previous element from cache, if .test() called before
  if (this.__index__ >= 0 && this.__text_cache__ === text) {
    result.push(createMatch(this, shift));
    shift = this.__last_index__;
  }

  // Cut head if cache was used
  var tail = shift ? text.slice(shift) : text;

  // Scan string until end reached
  while (this.test(tail)) {
    result.push(createMatch(this, shift));

    tail = tail.slice(this.__last_index__);
    shift += this.__last_index__;
  }

  if (result.length) {
    return result;
  }

  return null;
};


/** chainable
 * LinkifyIt#tlds(list [, keepOld]) -> this
 * - list (Array): list of tlds
 * - keepOld (Boolean): merge with current list if `true` (`false` by default)
 *
 * Load (or merge) new tlds list. Those are user for fuzzy links (without prefix)
 * to avoid false positives. By default this algorythm used:
 *
 * - hostname with any 2-letter root zones are ok.
 * - biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф
 *   are ok.
 * - encoded (`xn--...`) root zones are ok.
 *
 * If list is replaced, then exact match for 2-chars root zones will be checked.
 **/
LinkifyIt.prototype.tlds = function tlds(list, keepOld) {
  list = Array.isArray(list) ? list : [ list ];

  if (!keepOld) {
    this.__tlds__ = list.slice();
    this.__tlds_replaced__ = true;
    compile(this);
    return this;
  }

  this.__tlds__ = this.__tlds__.concat(list)
                                  .sort()
                                  .filter(function (el, idx, arr) {
                                    return el !== arr[idx - 1];
                                  })
                                  .reverse();

  compile(this);
  return this;
};

/**
 * LinkifyIt#normalize(match)
 *
 * Default normalizer (if schema does not define it's own).
 **/
LinkifyIt.prototype.normalize = function normalize(match) {

  // Do minimal possible changes by default. Need to collect feedback prior
  // to move forward https://github.com/markdown-it/linkify-it/issues/1

  if (!match.schema) { match.url = 'http://' + match.url; }

  if (match.schema === 'mailto:' && !/^mailto:/i.test(match.url)) {
    match.url = 'mailto:' + match.url;
  }
};


/**
 * LinkifyIt#onCompile()
 *
 * Override to modify basic RegExp-s.
 **/
LinkifyIt.prototype.onCompile = function onCompile() {
};


var linkifyIt = LinkifyIt;

// markdown-it default options


var _default = {
  options: {
    html:         false,        // Enable HTML tags in source
    xhtmlOut:     false,        // Use '/' to close single tags (<br />)
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    langPrefix:   'language-',  // CSS language prefix for fenced blocks
    linkify:      false,        // autoconvert URL-like texts to links

    // Enable some language-neutral replacements + quotes beautification
    typographer:  false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,

    maxNesting:   100            // Internal protection, recursion limit
  },

  components: {

    core: {},
    block: {},
    inline: {}
  }
};

// "Zero" preset, with nothing enabled. Useful for manual configuring of simple


var zero = {
  options: {
    html:         false,        // Enable HTML tags in source
    xhtmlOut:     false,        // Use '/' to close single tags (<br />)
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    langPrefix:   'language-',  // CSS language prefix for fenced blocks
    linkify:      false,        // autoconvert URL-like texts to links

    // Enable some language-neutral replacements + quotes beautification
    typographer:  false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,

    maxNesting:   20            // Internal protection, recursion limit
  },

  components: {

    core: {
      rules: [
        'normalize',
        'block',
        'inline'
      ]
    },

    block: {
      rules: [
        'paragraph'
      ]
    },

    inline: {
      rules: [
        'text'
      ],
      rules2: [
        'balance_pairs',
        'text_collapse'
      ]
    }
  }
};

// Commonmark default options


var commonmark = {
  options: {
    html:         true,         // Enable HTML tags in source
    xhtmlOut:     true,         // Use '/' to close single tags (<br />)
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    langPrefix:   'language-',  // CSS language prefix for fenced blocks
    linkify:      false,        // autoconvert URL-like texts to links

    // Enable some language-neutral replacements + quotes beautification
    typographer:  false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,

    maxNesting:   20            // Internal protection, recursion limit
  },

  components: {

    core: {
      rules: [
        'normalize',
        'block',
        'inline'
      ]
    },

    block: {
      rules: [
        'blockquote',
        'code',
        'fence',
        'heading',
        'hr',
        'html_block',
        'lheading',
        'list',
        'reference',
        'paragraph'
      ]
    },

    inline: {
      rules: [
        'autolink',
        'backticks',
        'emphasis',
        'entity',
        'escape',
        'html_inline',
        'image',
        'link',
        'newline',
        'text'
      ],
      rules2: [
        'balance_pairs',
        'emphasis',
        'text_collapse'
      ]
    }
  }
};

var config = {
  default: _default,
  zero: zero,
  commonmark: commonmark
};

////////////////////////////////////////////////////////////////////////////////
//
// This validator can prohibit more than really needed to prevent XSS. It's a
// tradeoff to keep code simple and to be secure by default.
//
// If you need different setup - override validator method as you wish. Or
// replace it with dummy function and use external sanitizer.
//

var BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
var GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;

function validateLink(url) {
  // url should be normalized at this point, and existing entities are decoded
  var str = url.trim().toLowerCase();

  return BAD_PROTO_RE.test(str) ? (GOOD_DATA_RE.test(str) ? true : false) : true;
}

////////////////////////////////////////////////////////////////////////////////


var RECODE_HOSTNAME_FOR = [ 'http:', 'https:', 'mailto:' ];

function normalizeLink(url) {
  var parsed = mdurl.parse(url, true);

  if (parsed.hostname) {
    // Encode hostnames in urls like:
    // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
    //
    // We don't encode unknown schemas, because it's likely that we encode
    // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
    //
    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
      try {
        parsed.hostname = punycode__default['default'].toASCII(parsed.hostname);
      } catch (er) { /**/ }
    }
  }

  return mdurl.encode(mdurl.format(parsed));
}

function normalizeLinkText(url) {
  var parsed = mdurl.parse(url, true);

  if (parsed.hostname) {
    // Encode hostnames in urls like:
    // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
    //
    // We don't encode unknown schemas, because it's likely that we encode
    // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
    //
    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
      try {
        parsed.hostname = punycode__default['default'].toUnicode(parsed.hostname);
      } catch (er) { /**/ }
    }
  }

  // add '%' to exclude list because of https://github.com/markdown-it/markdown-it/issues/720
  return mdurl.decode(mdurl.format(parsed), mdurl.decode.defaultChars + '%');
}


/**
 * class MarkdownIt
 *
 * Main parser/renderer class.
 *
 * ##### Usage
 *
 * ```javascript
 * // node.js, "classic" way:
 * var MarkdownIt = require('markdown-it'),
 *     md = new MarkdownIt();
 * var result = md.render('# markdown-it rulezz!');
 *
 * // node.js, the same, but with sugar:
 * var md = require('markdown-it')();
 * var result = md.render('# markdown-it rulezz!');
 *
 * // browser without AMD, added to "window" on script load
 * // Note, there are no dash.
 * var md = window.markdownit();
 * var result = md.render('# markdown-it rulezz!');
 * ```
 *
 * Single line rendering, without paragraph wrap:
 *
 * ```javascript
 * var md = require('markdown-it')();
 * var result = md.renderInline('__markdown-it__ rulezz!');
 * ```
 **/

/**
 * new MarkdownIt([presetName, options])
 * - presetName (String): optional, `commonmark` / `zero`
 * - options (Object)
 *
 * Creates parser instanse with given config. Can be called without `new`.
 *
 * ##### presetName
 *
 * MarkdownIt provides named presets as a convenience to quickly
 * enable/disable active syntax rules and options for common use cases.
 *
 * - ["commonmark"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.js) -
 *   configures parser to strict [CommonMark](http://commonmark.org/) mode.
 * - [default](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/default.js) -
 *   similar to GFM, used when no preset name given. Enables all available rules,
 *   but still without html, typographer & autolinker.
 * - ["zero"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/zero.js) -
 *   all rules disabled. Useful to quickly setup your config via `.enable()`.
 *   For example, when you need only `bold` and `italic` markup and nothing else.
 *
 * ##### options:
 *
 * - __html__ - `false`. Set `true` to enable HTML tags in source. Be careful!
 *   That's not safe! You may need external sanitizer to protect output from XSS.
 *   It's better to extend features via plugins, instead of enabling HTML.
 * - __xhtmlOut__ - `false`. Set `true` to add '/' when closing single tags
 *   (`<br />`). This is needed only for full CommonMark compatibility. In real
 *   world you will need HTML output.
 * - __breaks__ - `false`. Set `true` to convert `\n` in paragraphs into `<br>`.
 * - __langPrefix__ - `language-`. CSS language class prefix for fenced blocks.
 *   Can be useful for external highlighters.
 * - __linkify__ - `false`. Set `true` to autoconvert URL-like text to links.
 * - __typographer__  - `false`. Set `true` to enable [some language-neutral
 *   replacement](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js) +
 *   quotes beautification (smartquotes).
 * - __quotes__ - `“”‘’`, String or Array. Double + single quotes replacement
 *   pairs, when typographer enabled and smartquotes on. For example, you can
 *   use `'«»„“'` for Russian, `'„“‚‘'` for German, and
 *   `['«\xA0', '\xA0»', '‹\xA0', '\xA0›']` for French (including nbsp).
 * - __highlight__ - `null`. Highlighter function for fenced code blocks.
 *   Highlighter `function (str, lang)` should return escaped HTML. It can also
 *   return empty string if the source was not changed and should be escaped
 *   externaly. If result starts with <pre... internal wrapper is skipped.
 *
 * ##### Example
 *
 * ```javascript
 * // commonmark mode
 * var md = require('markdown-it')('commonmark');
 *
 * // default mode
 * var md = require('markdown-it')();
 *
 * // enable everything
 * var md = require('markdown-it')({
 *   html: true,
 *   linkify: true,
 *   typographer: true
 * });
 * ```
 *
 * ##### Syntax highlighting
 *
 * ```js
 * var hljs = require('highlight.js') // https://highlightjs.org/
 *
 * var md = require('markdown-it')({
 *   highlight: function (str, lang) {
 *     if (lang && hljs.getLanguage(lang)) {
 *       try {
 *         return hljs.highlight(lang, str, true).value;
 *       } catch (__) {}
 *     }
 *
 *     return ''; // use external default escaping
 *   }
 * });
 * ```
 *
 * Or with full wrapper override (if you need assign class to `<pre>`):
 *
 * ```javascript
 * var hljs = require('highlight.js') // https://highlightjs.org/
 *
 * // Actual default values
 * var md = require('markdown-it')({
 *   highlight: function (str, lang) {
 *     if (lang && hljs.getLanguage(lang)) {
 *       try {
 *         return '<pre class="hljs"><code>' +
 *                hljs.highlight(lang, str, true).value +
 *                '</code></pre>';
 *       } catch (__) {}
 *     }
 *
 *     return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
 *   }
 * });
 * ```
 *
 **/
function MarkdownIt(presetName, options) {
  if (!(this instanceof MarkdownIt)) {
    return new MarkdownIt(presetName, options);
  }

  if (!options) {
    if (!utils$1.isString(presetName)) {
      options = presetName || {};
      presetName = 'default';
    }
  }

  /**
   * MarkdownIt#inline -> ParserInline
   *
   * Instance of [[ParserInline]]. You may need it to add new rules when
   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
   * [[MarkdownIt.enable]].
   **/
  this.inline = new parser_inline();

  /**
   * MarkdownIt#block -> ParserBlock
   *
   * Instance of [[ParserBlock]]. You may need it to add new rules when
   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
   * [[MarkdownIt.enable]].
   **/
  this.block = new parser_block();

  /**
   * MarkdownIt#core -> Core
   *
   * Instance of [[Core]] chain executor. You may need it to add new rules when
   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
   * [[MarkdownIt.enable]].
   **/
  this.core = new parser_core();

  /**
   * MarkdownIt#renderer -> Renderer
   *
   * Instance of [[Renderer]]. Use it to modify output look. Or to add rendering
   * rules for new token types, generated by plugins.
   *
   * ##### Example
   *
   * ```javascript
   * var md = require('markdown-it')();
   *
   * function myToken(tokens, idx, options, env, self) {
   *   //...
   *   return result;
   * };
   *
   * md.renderer.rules['my_token'] = myToken
   * ```
   *
   * See [[Renderer]] docs and [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js).
   **/
  this.renderer = new renderer();

  /**
   * MarkdownIt#linkify -> LinkifyIt
   *
   * [linkify-it](https://github.com/markdown-it/linkify-it) instance.
   * Used by [linkify](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/linkify.js)
   * rule.
   **/
  this.linkify = new linkifyIt();

  /**
   * MarkdownIt#validateLink(url) -> Boolean
   *
   * Link validation function. CommonMark allows too much in links. By default
   * we disable `javascript:`, `vbscript:`, `file:` schemas, and almost all `data:...` schemas
   * except some embedded image types.
   *
   * You can change this behaviour:
   *
   * ```javascript
   * var md = require('markdown-it')();
   * // enable everything
   * md.validateLink = function () { return true; }
   * ```
   **/
  this.validateLink = validateLink;

  /**
   * MarkdownIt#normalizeLink(url) -> String
   *
   * Function used to encode link url to a machine-readable format,
   * which includes url-encoding, punycode, etc.
   **/
  this.normalizeLink = normalizeLink;

  /**
   * MarkdownIt#normalizeLinkText(url) -> String
   *
   * Function used to decode link url to a human-readable format`
   **/
  this.normalizeLinkText = normalizeLinkText;


  // Expose utils & helpers for easy acces from plugins

  /**
   * MarkdownIt#utils -> utils
   *
   * Assorted utility functions, useful to write plugins. See details
   * [here](https://github.com/markdown-it/markdown-it/blob/master/lib/common/utils.js).
   **/
  this.utils = utils$1;

  /**
   * MarkdownIt#helpers -> helpers
   *
   * Link components parser functions, useful to write plugins. See details
   * [here](https://github.com/markdown-it/markdown-it/blob/master/lib/helpers).
   **/
  this.helpers = utils$1.assign({}, helpers);


  this.options = {};
  this.configure(presetName);

  if (options) { this.set(options); }
}


/** chainable
 * MarkdownIt.set(options)
 *
 * Set parser options (in the same format as in constructor). Probably, you
 * will never need it, but you can change options after constructor call.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')()
 *             .set({ html: true, breaks: true })
 *             .set({ typographer, true });
 * ```
 *
 * __Note:__ To achieve the best possible performance, don't modify a
 * `markdown-it` instance options on the fly. If you need multiple configurations
 * it's best to create multiple instances and initialize each with separate
 * config.
 **/
MarkdownIt.prototype.set = function (options) {
  utils$1.assign(this.options, options);
  return this;
};


/** chainable, internal
 * MarkdownIt.configure(presets)
 *
 * Batch load of all options and compenent settings. This is internal method,
 * and you probably will not need it. But if you will - see available presets
 * and data structure [here](https://github.com/markdown-it/markdown-it/tree/master/lib/presets)
 *
 * We strongly recommend to use presets instead of direct config loads. That
 * will give better compatibility with next versions.
 **/
MarkdownIt.prototype.configure = function (presets) {
  var self = this, presetName;

  if (utils$1.isString(presets)) {
    presetName = presets;
    presets = config[presetName];
    if (!presets) { throw new Error('Wrong `markdown-it` preset "' + presetName + '", check name'); }
  }

  if (!presets) { throw new Error('Wrong `markdown-it` preset, can\'t be empty'); }

  if (presets.options) { self.set(presets.options); }

  if (presets.components) {
    Object.keys(presets.components).forEach(function (name) {
      if (presets.components[name].rules) {
        self[name].ruler.enableOnly(presets.components[name].rules);
      }
      if (presets.components[name].rules2) {
        self[name].ruler2.enableOnly(presets.components[name].rules2);
      }
    });
  }
  return this;
};


/** chainable
 * MarkdownIt.enable(list, ignoreInvalid)
 * - list (String|Array): rule name or list of rule names to enable
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Enable list or rules. It will automatically find appropriate components,
 * containing rules with given names. If rule not found, and `ignoreInvalid`
 * not set - throws exception.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')()
 *             .enable(['sub', 'sup'])
 *             .disable('smartquotes');
 * ```
 **/
MarkdownIt.prototype.enable = function (list, ignoreInvalid) {
  var result = [];

  if (!Array.isArray(list)) { list = [ list ]; }

  [ 'core', 'block', 'inline' ].forEach(function (chain) {
    result = result.concat(this[chain].ruler.enable(list, true));
  }, this);

  result = result.concat(this.inline.ruler2.enable(list, true));

  var missed = list.filter(function (name) { return result.indexOf(name) < 0; });

  if (missed.length && !ignoreInvalid) {
    throw new Error('MarkdownIt. Failed to enable unknown rule(s): ' + missed);
  }

  return this;
};


/** chainable
 * MarkdownIt.disable(list, ignoreInvalid)
 * - list (String|Array): rule name or list of rule names to disable.
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * The same as [[MarkdownIt.enable]], but turn specified rules off.
 **/
MarkdownIt.prototype.disable = function (list, ignoreInvalid) {
  var result = [];

  if (!Array.isArray(list)) { list = [ list ]; }

  [ 'core', 'block', 'inline' ].forEach(function (chain) {
    result = result.concat(this[chain].ruler.disable(list, true));
  }, this);

  result = result.concat(this.inline.ruler2.disable(list, true));

  var missed = list.filter(function (name) { return result.indexOf(name) < 0; });

  if (missed.length && !ignoreInvalid) {
    throw new Error('MarkdownIt. Failed to disable unknown rule(s): ' + missed);
  }
  return this;
};


/** chainable
 * MarkdownIt.use(plugin, params)
 *
 * Load specified plugin with given params into current parser instance.
 * It's just a sugar to call `plugin(md, params)` with curring.
 *
 * ##### Example
 *
 * ```javascript
 * var iterator = require('markdown-it-for-inline');
 * var md = require('markdown-it')()
 *             .use(iterator, 'foo_replace', 'text', function (tokens, idx) {
 *               tokens[idx].content = tokens[idx].content.replace(/foo/g, 'bar');
 *             });
 * ```
 **/
MarkdownIt.prototype.use = function (plugin /*, params, ... */) {
  var args = [ this ].concat(Array.prototype.slice.call(arguments, 1));
  plugin.apply(plugin, args);
  return this;
};


/** internal
 * MarkdownIt.parse(src, env) -> Array
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * Parse input string and return list of block tokens (special token type
 * "inline" will contain list of inline tokens). You should not call this
 * method directly, until you write custom renderer (for example, to produce
 * AST).
 *
 * `env` is used to pass data between "distributed" rules and return additional
 * metadata like reference info, needed for the renderer. It also can be used to
 * inject data in specific cases. Usually, you will be ok to pass `{}`,
 * and then pass updated object to renderer.
 **/
MarkdownIt.prototype.parse = function (src, env) {
  if (typeof src !== 'string') {
    throw new Error('Input data should be a String');
  }

  var state = new this.core.State(src, this, env);

  this.core.process(state);

  return state.tokens;
};


/**
 * MarkdownIt.render(src [, env]) -> String
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * Render markdown string into html. It does all magic for you :).
 *
 * `env` can be used to inject additional metadata (`{}` by default).
 * But you will not need it with high probability. See also comment
 * in [[MarkdownIt.parse]].
 **/
MarkdownIt.prototype.render = function (src, env) {
  env = env || {};

  return this.renderer.render(this.parse(src, env), this.options, env);
};


/** internal
 * MarkdownIt.parseInline(src, env) -> Array
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * The same as [[MarkdownIt.parse]] but skip all block rules. It returns the
 * block tokens list with the single `inline` element, containing parsed inline
 * tokens in `children` property. Also updates `env` object.
 **/
MarkdownIt.prototype.parseInline = function (src, env) {
  var state = new this.core.State(src, this, env);

  state.inlineMode = true;
  this.core.process(state);

  return state.tokens;
};


/**
 * MarkdownIt.renderInline(src [, env]) -> String
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * Similar to [[MarkdownIt.render]] but for single paragraph content. Result
 * will NOT be wrapped into `<p>` tags.
 **/
MarkdownIt.prototype.renderInline = function (src, env) {
  env = env || {};

  return this.renderer.render(this.parseInline(src, env), this.options, env);
};


var lib = MarkdownIt;

var markdownIt = lib;

const escape = (html) => String(html)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
const utils = {
    escape,
};
let counter = 0;
const regexPlugin = (regexp, replacer) => {
    const flags = (regexp.global ? "g" : "") + (regexp.multiline ? "m" : "") + (regexp.ignoreCase ? "i" : "");
    const _regexp = RegExp("^" + regexp.source, flags);
    const id = "regexp-" + counter++;
    return (md) => {
        md.inline.ruler.push(id, (state, silent) => {
            var match = _regexp.exec(state.src.slice(state.pos));
            if (!match)
                return false;
            state.pos += match[0].length;
            if (silent)
                return true;
            var token = state.push(id, "", 0);
            token.meta = { match: match };
            return true;
        });
        md.renderer.rules[id] = (tokens, idx) => {
            return replacer(tokens[idx].meta.match, utils);
        };
    };
};

const commentPlugin = regexPlugin(/\%\%([^\%]+)\%\%/, (match, utils) => {
    return `<!--${utils.escape(match[1])}}-->`;
});

const highlightPlugin = regexPlugin(/\=\=([^\=]+)\=\=/, (match, utils) => {
    return `<mark>${utils.escape(match[1])}</mark>`;
});

const linkPlugin = (linkMap) => regexPlugin(/\[\[([^\]]+)\]\]/, (match, utils) => {
    var _a;
    const content = match[1];
    const [link, label] = content.split("|");
    return `<a data-href="${link}" data-type="link" data-filepath="${(_a = linkMap.get(link)) === null || _a === void 0 ? void 0 : _a.filePath}" class="internal-link">${utils.escape(label || link)}</a>`;
});

const tagPlugin = regexPlugin(/\#\S+/, (match, utils) => {
    const content = match[0];
    return `<a href="${utils.escape(content)}" data-type="link" class="tag" target="_blank" rel="noopener">${utils.escape(content)}</a>`;
});

/** public */
const parseTodos = async (files, todoTag, cache, vault, ignoreFiles, includeFiles, sort) => {
    const filesWithCache = await Promise.all(files
        .filter((file) => {
        if (ignoreFiles && file.path.includes(ignoreFiles))
            return false;
        if (includeFiles && !file.path.startsWith(includeFiles))
            return false;
        if (!todoTag)
            return true;
        const fileCache = cache.getFileCache(file);
        const allTags = getAllTagsFromMetadata(fileCache);
        const tagsOnPage = allTags.filter((tag) => getTagMeta(tag).main === todoTag);
        return tagsOnPage.length > 0;
    })
        .map(async (file) => {
        var _a, _b;
        const fileCache = cache.getFileCache(file);
        const tagsOnPage = (_b = (_a = fileCache === null || fileCache === void 0 ? void 0 : fileCache.tags) === null || _a === void 0 ? void 0 : _a.filter((e) => getTagMeta(e.tag).main === todoTag)) !== null && _b !== void 0 ? _b : [];
        const frontMatterTags = getFrontmatterTags(fileCache, todoTag);
        const hasFrontMatterTag = frontMatterTags.length > 0;
        const parseEntireFile = !todoTag || hasFrontMatterTag;
        const content = await vault.cachedRead(file);
        return {
            content,
            cache: fileCache,
            validTags: tagsOnPage,
            file,
            parseEntireFile,
            frontmatterTag: todoTag ? frontMatterTags[0] : undefined,
        };
    }));
    const allTodos = filesWithCache
        .flatMap(findAllTodosInFile)
        .filter((todo, i, a) => a.findIndex((_todo) => todo.line === _todo.line && todo.filePath === _todo.filePath) === i);
    if (sort === "new->old")
        allTodos.sort((a, b) => b.fileCreatedTs - a.fileCreatedTs);
    if (sort === "old->new")
        allTodos.sort((a, b) => a.fileCreatedTs - b.fileCreatedTs);
    return allTodos;
};
const groupTodos = (items, groupBy, sort) => {
    const groups = [];
    for (const item of items) {
        const itemKey = groupBy === "page" ? item.filePath : `#${[item.mainTag, item.subTag].filter((e) => e != null).join("/")}`;
        let group = groups.find((g) => g.groupId === itemKey);
        if (!group) {
            group = {
                groupId: itemKey,
                groupName: groupBy === "page" ? item.fileLabel : item.subTag,
                type: groupBy,
                todos: [],
            };
            groups.push(group);
        }
        group.todos.push(item);
    }
    const nonEmptyGroups = groups.filter((g) => g.todos.length > 0);
    if (sort === "a->z")
        nonEmptyGroups.sort((a, b) => a.groupName.localeCompare(b.groupName, navigator.language, LOCAL_SORT_OPT));
    if (sort === "z->a")
        nonEmptyGroups.sort((a, b) => b.groupName.localeCompare(a.groupName, navigator.language, LOCAL_SORT_OPT));
    return nonEmptyGroups;
};
const toggleTodoItem = async (item, app) => {
    const file = getFileFromPath(app.vault, item.filePath);
    if (!file)
        return;
    const currentFileContents = await app.vault.read(file);
    const currentFileLines = getAllLinesFromFile(currentFileContents);
    if (!currentFileLines[item.line].includes(item.originalText))
        return;
    const newData = setTodoStatusAtLineTo(currentFileLines, item.line, !item.checked);
    app.vault.modify(file, newData);
    item.checked = !item.checked;
};
const navToFile = async (app, path, ev) => {
    path = ensureMdExtension(path);
    const file = getFileFromPath(app.vault, path);
    if (!file)
        return;
    const leaf = isMetaPressed(ev) ? app.workspace.splitActiveLeaf() : app.workspace.getUnpinnedLeaf();
    await leaf.openFile(file);
};
/** private */
const getFileFromPath = (vault, path) => {
    let file = vault.getAbstractFileByPath(path);
    if (file instanceof obsidian.TFile)
        return file;
    const files = vault.getFiles();
    file = files.find((e) => e.name === path);
    if (file instanceof obsidian.TFile)
        return file;
};
const ensureMdExtension = (path) => {
    if (!/\.md$/.test(path))
        return `${path}.md`;
    return path;
};
const isMetaPressed = (e) => {
    return isMacOS() ? e.metaKey : e.ctrlKey;
};
const getFrontmatterTags = (cache, todoTag) => {
    var _a;
    const frontMatterTags = (_a = obsidian.parseFrontMatterTags(cache === null || cache === void 0 ? void 0 : cache.frontmatter)) !== null && _a !== void 0 ? _a : [];
    if (todoTag)
        return frontMatterTags.filter((tag) => getTagMeta(tag).main === todoTag);
    return frontMatterTags;
};
const getAllTagsFromMetadata = (cache) => {
    var _a;
    if (!cache)
        return [];
    const frontmatterTags = getFrontmatterTags(cache);
    const blockTags = ((_a = cache.tags) !== null && _a !== void 0 ? _a : []).map((e) => e.tag);
    return [...frontmatterTags, ...blockTags];
};
const findAllTodosInFile = (file) => {
    var _a, _b;
    if (!file.parseEntireFile)
        return file.validTags.flatMap((tag) => findAllTodosFromTagBlock(file, tag));
    if (!file.content)
        return [];
    const fileLines = getAllLinesFromFile(file.content);
    const links = (_b = (_a = file.cache) === null || _a === void 0 ? void 0 : _a.links) !== null && _b !== void 0 ? _b : [];
    const tagMeta = file.frontmatterTag ? getTagMeta(file.frontmatterTag) : undefined;
    const todos = [];
    for (let i = 0; i < fileLines.length; i++) {
        const line = fileLines[i];
        if (line.length === 0)
            continue;
        if (lineIsValidTodo(line, "")) {
            todos.push(formTodo(line, file, links, i, tagMeta));
        }
    }
    return todos;
};
const findAllTodosFromTagBlock = (file, tag) => {
    var _a;
    const fileContents = file.content;
    const links = (_a = file.cache.links) !== null && _a !== void 0 ? _a : [];
    if (!fileContents)
        return [];
    const fileLines = getAllLinesFromFile(fileContents);
    const tagMeta = getTagMeta(tag.tag);
    const tagLine = fileLines[tag.position.start.line];
    if (lineIsValidTodo(tagLine, tagMeta.main)) {
        return [formTodo(tagLine, file, links, tag.position.start.line, tagMeta)];
    }
    const todos = [];
    for (let i = tag.position.start.line; i < fileLines.length; i++) {
        const line = fileLines[i];
        if (i === tag.position.start.line + 1 && line.length === 0)
            continue;
        if (line.length === 0)
            break;
        if (lineIsValidTodo(line, tagMeta.main)) {
            todos.push(formTodo(line, file, links, i, tagMeta));
        }
    }
    return todos;
};
const formTodo = (line, file, links, lineNum, tagMeta) => {
    const relevantLinks = links
        .filter((link) => link.position.start.line === lineNum)
        .map((link) => ({ filePath: link.link, linkName: link.displayText }));
    const linkMap = mapLinkMeta(relevantLinks);
    const rawText = extractTextFromTodoLine(line);
    const spacesIndented = getIndentationSpacesFromTodoLine(line);
    const tagStripped = removeTagFromText(rawText, tagMeta === null || tagMeta === void 0 ? void 0 : tagMeta.main);
    const md = new markdownIt().use(commentPlugin).use(linkPlugin(linkMap)).use(tagPlugin).use(highlightPlugin);
    return {
        mainTag: tagMeta === null || tagMeta === void 0 ? void 0 : tagMeta.main,
        checked: todoLineIsChecked(line),
        filePath: file.file.path,
        fileName: file.file.name,
        fileLabel: getFileLabelFromName(file.file.name),
        fileCreatedTs: file.file.stat.ctime,
        rawHTML: md.render(tagStripped),
        line: lineNum,
        subTag: tagMeta === null || tagMeta === void 0 ? void 0 : tagMeta.sub,
        spacesIndented,
        fileInfo: file,
        originalText: rawText,
    };
};
const setTodoStatusAtLineTo = (fileLines, line, setTo) => {
    fileLines[line] = setLineTo(fileLines[line], setTo);
    return combineFileLines(fileLines);
};
const getTagMeta = (tag) => {
    const tagMatch = /^\#([^\/]+)\/?(.*)?$/.exec(tag);
    if (!tagMatch)
        return { main: null, sub: null };
    const [full, main, sub] = tagMatch;
    return { main, sub };
};
const mapLinkMeta = (linkMeta) => {
    const map = new Map();
    for (const link of linkMeta)
        map.set(link.filePath, link);
    return map;
};
const setLineTo = (line, setTo) => line.replace(/^(\s*[\-\*]\s\[)([^\]]+)(\].*$)/, `$1${setTo ? "x" : " "}$3`);
const getAllLinesFromFile = (cache) => cache.split(/\r?\n/);
const combineFileLines = (lines) => lines.join("\n");
const lineIsValidTodo = (line, tag) => {
    removeTagFromText(line, tag);
    return /^\s*[\-\*]\s\[(\s|x)\]\s*\S/.test(line);
};
const extractTextFromTodoLine = (line) => { var _a; return (_a = /^\s*[\-\*]\s\[(\s|x)\]\s?(.*)$/.exec(line)) === null || _a === void 0 ? void 0 : _a[2]; };
const getIndentationSpacesFromTodoLine = (line) => { var _a, _b, _c; return (_c = (_b = (_a = /^(\s*)[\-\*]\s\[(\s|x)\]\s?.*$/.exec(line)) === null || _a === void 0 ? void 0 : _a[1]) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0; };
const todoLineIsChecked = (line) => /^\s*[\-\*]\s\[x\]/.test(line);
const getFileLabelFromName = (filename) => { var _a; return (_a = /^(.+)\.md$/.exec(filename)) === null || _a === void 0 ? void 0 : _a[1]; };
const removeTagFromText = (text, tag) => {
    if (!text)
        return "";
    if (!tag)
        return text.trim();
    return text.replace(new RegExp(`\\s?\\#${tag}[^\\s]*`, "g"), "").trim();
};
const isMacOS = () => window.navigator.userAgent.includes("Macintosh");

/* src/svelte/Loading.svelte generated by Svelte v3.38.2 */

function add_css$5() {
	var style = element("style");
	style.id = "svelte-1te4fvc-style";
	style.textContent = ".loader.svelte-1te4fvc{background:transparent !important;border-radius:100%;border:2px solid;display:flex;animation-fill-mode:both;margin:0 auto;animation:svelte-1te4fvc-niceSpinLoader 0.75s 0s infinite linear;border-color:var(--todoList-loaderBorderColor);width:var(--todoList-loaderSize);height:var(--todoList-loaderSize)}@keyframes svelte-1te4fvc-niceSpinLoader{0%{transform:rotate(0deg)}50%{transform:rotate(180deg)}100%{transform:rotate(360deg)}}";
	append(document.head, style);
}

function create_fragment$5(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			attr(div, "class", "loader svelte-1te4fvc");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

class Loading extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1te4fvc-style")) add_css$5();
		init(this, options, null, create_fragment$5, safe_not_equal, {});
	}
}

/* src/svelte/CheckCircle.svelte generated by Svelte v3.38.2 */

function add_css$4() {
	var style = element("style");
	style.id = "svelte-4g53y-style";
	style.textContent = ".checkbox.svelte-4g53y{width:var(--todoList-checkboxSize);height:var(--todoList-checkboxSize);min-width:var(--todoList-checkboxSize);min-height:var(--todoList-checkboxSize);border-radius:50%;border:var(--todoList-checkboxBorder);padding:2px;position:relative}.checked.svelte-4g53y{background-color:var(--text-muted);width:var(--todoList-checkboxCheckedSize);height:var(--todoList-checkboxCheckedSize);border-radius:50%;position:absolute;top:calc(calc(var(--todoList-checkboxSize) - var(--todoList-checkboxCheckedSize)) / 4);left:calc(calc(var(--todoList-checkboxSize) - var(--todoList-checkboxCheckedSize)) / 4)}";
	append(document.head, style);
}

function create_fragment$4(ctx) {
	let div1;
	let div0;

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			attr(div0, "class", "svelte-4g53y");
			toggle_class(div0, "checked", /*checked*/ ctx[0]);
			attr(div1, "class", "checkbox svelte-4g53y");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
		},
		p(ctx, [dirty]) {
			if (dirty & /*checked*/ 1) {
				toggle_class(div0, "checked", /*checked*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div1);
		}
	};
}

function instance$4($$self, $$props, $$invalidate) {
	let { checked = false } = $$props;

	$$self.$$set = $$props => {
		if ("checked" in $$props) $$invalidate(0, checked = $$props.checked);
	};

	return [checked];
}

class CheckCircle extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-4g53y-style")) add_css$4();
		init(this, options, instance$4, create_fragment$4, safe_not_equal, { checked: 0 });
	}
}

/* src/svelte/ChecklistItem.svelte generated by Svelte v3.38.2 */

function add_css$3() {
	var style = element("style");
	style.id = "svelte-gpx85b-style";
	style.textContent = "li.svelte-gpx85b.svelte-gpx85b{display:flex;align-items:center;background-color:var(--todoList-listItemBackground);border-radius:var(--todoList-listItemBorderRadius);margin:var(--todoList-listItemMargin);cursor:pointer;transition:background-color 100ms ease-in-out}li.svelte-gpx85b.svelte-gpx85b:hover{background-color:var(--todoList-listItemBackground--hover)}.toggle.svelte-gpx85b.svelte-gpx85b{padding:var(--todoList-togglePadding);background:transparent;flex-shrink:1}.content.svelte-gpx85b.svelte-gpx85b{padding:var(--todoList-contentPadding);flex:1}.compact.svelte-gpx85b.svelte-gpx85b{bottom:var(--todoList-listItemMargin--compact)}.compact.svelte-gpx85b>.content.svelte-gpx85b{padding:var(--todoList-contentPadding--compact)}.compact.svelte-gpx85b>.toggle.svelte-gpx85b{padding:var(--todoList-togglePadding--compact)}.toggle.svelte-gpx85b.svelte-gpx85b:hover{opacity:0.8}";
	append(document.head, style);
}

function create_fragment$3(ctx) {
	let li;
	let button;
	let checkcircle;
	let t;
	let div;
	let li_class_value;
	let current;
	let mounted;
	let dispose;

	checkcircle = new CheckCircle({
			props: { checked: /*item*/ ctx[0].checked }
		});

	return {
		c() {
			li = element("li");
			button = element("button");
			create_component(checkcircle.$$.fragment);
			t = space();
			div = element("div");
			attr(button, "class", "toggle svelte-gpx85b");
			attr(div, "class", "content svelte-gpx85b");
			attr(li, "class", li_class_value = "" + (null_to_empty(`${/*lookAndFeel*/ ctx[1]}`) + " svelte-gpx85b"));
		},
		m(target, anchor) {
			insert(target, li, anchor);
			append(li, button);
			mount_component(checkcircle, button, null);
			append(li, t);
			append(li, div);
			/*div_binding*/ ctx[7](div);
			current = true;

			if (!mounted) {
				dispose = [
					listen(button, "click", /*click_handler*/ ctx[6]),
					listen(div, "click", /*handleClick*/ ctx[5]),
					listen(li, "click", /*click_handler_1*/ ctx[8])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			const checkcircle_changes = {};
			if (dirty & /*item*/ 1) checkcircle_changes.checked = /*item*/ ctx[0].checked;
			checkcircle.$set(checkcircle_changes);

			if (!current || dirty & /*lookAndFeel*/ 2 && li_class_value !== (li_class_value = "" + (null_to_empty(`${/*lookAndFeel*/ ctx[1]}`) + " svelte-gpx85b"))) {
				attr(li, "class", li_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(checkcircle.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(checkcircle.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(li);
			destroy_component(checkcircle);
			/*div_binding*/ ctx[7](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$3($$self, $$props, $$invalidate) {
	
	
	let { item } = $$props;
	let { lookAndFeel } = $$props;
	let { app } = $$props;
	let contentDiv;

	const toggleItem = item => __awaiter(void 0, void 0, void 0, function* () {
		toggleTodoItem(item, app);
	});

	const handleClick = ev => {
		const target = ev.target;

		if (target.tagName === "A") {
			ev.stopPropagation();

			if (target.dataset.type === "link") {
				navToFile(app, target.dataset.filepath, ev);
			} else if (target.dataset.type === "tag") ; // goto tag
		}
	};

	const click_handler = ev => {
		toggleItem(item);
		ev.stopPropagation();
	};

	function div_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			contentDiv = $$value;
			($$invalidate(3, contentDiv), $$invalidate(0, item));
		});
	}

	const click_handler_1 = ev => navToFile(app, item.filePath, ev);

	$$self.$$set = $$props => {
		if ("item" in $$props) $$invalidate(0, item = $$props.item);
		if ("lookAndFeel" in $$props) $$invalidate(1, lookAndFeel = $$props.lookAndFeel);
		if ("app" in $$props) $$invalidate(2, app = $$props.app);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*contentDiv, item*/ 9) {
			{
				if (contentDiv) $$invalidate(3, contentDiv.innerHTML = item.rawHTML, contentDiv);
			}
		}
	};

	return [
		item,
		lookAndFeel,
		app,
		contentDiv,
		toggleItem,
		handleClick,
		click_handler,
		div_binding,
		click_handler_1
	];
}

class ChecklistItem extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-gpx85b-style")) add_css$3();
		init(this, options, instance$3, create_fragment$3, safe_not_equal, { item: 0, lookAndFeel: 1, app: 2 });
	}
}

/* src/svelte/Icon.svelte generated by Svelte v3.38.2 */

function add_css$2() {
	var style = element("style");
	style.id = "svelte-1jevfyc-style";
	style.textContent = ".svg.svelte-1jevfyc{width:var(--todoList-iconSize);height:var(--todoList-iconSize);fill:var(--todoList-iconFill);transition:transform 150ms ease;cursor:pointer}.up.svelte-1jevfyc{transform:rotate(180deg)}.down.svelte-1jevfyc{transform:rotate(0deg)}.left.svelte-1jevfyc{transform:rotate(90deg)}.right.svelte-1jevfyc{transform:rotate(270deg)}";
	append(document.head, style);
}

// (6:0) {#if name === "chevron"}
function create_if_block$2(ctx) {
	let svg;
	let path;
	let svg_class_value;

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr(path, "d", "M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z");
			attr(svg, "focusable", "false");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "viewBox", "0 0 256 512");
			attr(svg, "class", svg_class_value = "" + (null_to_empty(`svg ${/*direction*/ ctx[1]}`) + " svelte-1jevfyc"));
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);
		},
		p(ctx, dirty) {
			if (dirty & /*direction*/ 2 && svg_class_value !== (svg_class_value = "" + (null_to_empty(`svg ${/*direction*/ ctx[1]}`) + " svelte-1jevfyc"))) {
				attr(svg, "class", svg_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

function create_fragment$2(ctx) {
	let if_block_anchor;
	let if_block = /*name*/ ctx[0] === "chevron" && create_if_block$2(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty$1();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, [dirty]) {
			if (/*name*/ ctx[0] === "chevron") {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$2(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance$2($$self, $$props, $$invalidate) {
	
	let { name } = $$props;
	let { direction = "down" } = $$props;

	$$self.$$set = $$props => {
		if ("name" in $$props) $$invalidate(0, name = $$props.name);
		if ("direction" in $$props) $$invalidate(1, direction = $$props.direction);
	};

	return [name, direction];
}

class Icon extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1jevfyc-style")) add_css$2();
		init(this, options, instance$2, create_fragment$2, safe_not_equal, { name: 0, direction: 1 });
	}
}

/* src/svelte/ChecklistGroup.svelte generated by Svelte v3.38.2 */

function add_css$1() {
	var style = element("style");
	style.id = "svelte-yzsyxo-style";
	style.textContent = ".page.svelte-yzsyxo{margin:var(--todoList-pageMargin);color:var(--todoList-textColor);transition:opacity 150ms ease-in-out;cursor:pointer}.file-link.svelte-yzsyxo:hover{opacity:0.8}header.svelte-yzsyxo{font-weight:var(--todoList-headerFontWeight);font-size:var(--todoList-headerFontSize);margin:var(--todoList-headerMargin);display:flex;gap:var(--todoList-headerGap);align-items:center}.space.svelte-yzsyxo{flex:1}button.svelte-yzsyxo,.count.svelte-yzsyxo,.title.svelte-yzsyxo{flex-shrink:1}.count.svelte-yzsyxo{padding:var(--todoList-countPadding);background:var(--todoList-countBackground);border-radius:var(--todoList-countBorderRadius);font-size:var(--todoList-countFontSize)}.title.svelte-yzsyxo{min-width:0;overflow:hidden;text-overflow:ellipsis}button.svelte-yzsyxo{display:flex;padding:var(--todoList-buttonPadding);background:transparent}.tag-base.svelte-yzsyxo{color:var(--todoList-tagBaseColor)}.tag-sub.svelte-yzsyxo{color:var(--todoList-tagSub)}ul.svelte-yzsyxo{list-style:none;padding:0;margin:0}.group.svelte-yzsyxo{margin-bottom:var(--todoList-groupMargin)}";
	append(document.head, style);
}

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[9] = list[i];
	return child_ctx;
}

// (34:6) {:else}
function create_else_block$1(ctx) {
	let span0;
	let t0_value = `#${/*mainTag*/ ctx[1]}${/*group*/ ctx[0].groupName != null ? "/" : ""}` + "";
	let t0;
	let span1;
	let t1_value = (/*group*/ ctx[0].groupName ?? "") + "";
	let t1;

	return {
		c() {
			span0 = element("span");
			t0 = text$1(t0_value);
			span1 = element("span");
			t1 = text$1(t1_value);
			attr(span0, "class", "tag-base svelte-yzsyxo");
			attr(span1, "class", "tag-sub svelte-yzsyxo");
		},
		m(target, anchor) {
			insert(target, span0, anchor);
			append(span0, t0);
			insert(target, span1, anchor);
			append(span1, t1);
		},
		p(ctx, dirty) {
			if (dirty & /*mainTag, group*/ 3 && t0_value !== (t0_value = `#${/*mainTag*/ ctx[1]}${/*group*/ ctx[0].groupName != null ? "/" : ""}` + "")) set_data(t0, t0_value);
			if (dirty & /*group*/ 1 && t1_value !== (t1_value = (/*group*/ ctx[0].groupName ?? "") + "")) set_data(t1, t1_value);
		},
		d(detaching) {
			if (detaching) detach(span0);
			if (detaching) detach(span1);
		}
	};
}

// (32:6) {#if group.type === "page"}
function create_if_block_1$1(ctx) {
	let t_value = /*group*/ ctx[0].groupName + "";
	let t;

	return {
		c() {
			t = text$1(t_value);
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*group*/ 1 && t_value !== (t_value = /*group*/ ctx[0].groupName + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (47:4) {#if !isCollapsed}
function create_if_block$1(ctx) {
	let each_1_anchor;
	let current;
	let each_value = /*group*/ ctx[0].todos;
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty$1();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (dirty & /*group, lookAndFeel, app*/ 25) {
				each_value = /*group*/ ctx[0].todos;
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

// (48:6) {#each group.todos as item}
function create_each_block$1(ctx) {
	let checklistitem;
	let current;

	checklistitem = new ChecklistItem({
			props: {
				item: /*item*/ ctx[9],
				lookAndFeel: /*lookAndFeel*/ ctx[3],
				app: /*app*/ ctx[4]
			}
		});

	return {
		c() {
			create_component(checklistitem.$$.fragment);
		},
		m(target, anchor) {
			mount_component(checklistitem, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const checklistitem_changes = {};
			if (dirty & /*group*/ 1) checklistitem_changes.item = /*item*/ ctx[9];
			if (dirty & /*lookAndFeel*/ 8) checklistitem_changes.lookAndFeel = /*lookAndFeel*/ ctx[3];
			if (dirty & /*app*/ 16) checklistitem_changes.app = /*app*/ ctx[4];
			checklistitem.$set(checklistitem_changes);
		},
		i(local) {
			if (current) return;
			transition_in(checklistitem.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(checklistitem.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(checklistitem, detaching);
		}
	};
}

function create_fragment$1(ctx) {
	let section;
	let header;
	let div0;
	let t0;
	let div1;
	let t1;
	let div2;
	let t2_value = /*group*/ ctx[0].todos.length + "";
	let t2;
	let t3;
	let button;
	let icon;
	let header_class_value;
	let t4;
	let ul;
	let section_class_value;
	let current;
	let mounted;
	let dispose;

	function select_block_type(ctx, dirty) {
		if (/*group*/ ctx[0].type === "page") return create_if_block_1$1;
		return create_else_block$1;
	}

	let current_block_type = select_block_type(ctx);
	let if_block0 = current_block_type(ctx);

	icon = new Icon({
			props: {
				name: "chevron",
				direction: /*isCollapsed*/ ctx[2] ? "left" : "down"
			}
		});

	let if_block1 = !/*isCollapsed*/ ctx[2] && create_if_block$1(ctx);

	return {
		c() {
			section = element("section");
			header = element("header");
			div0 = element("div");
			if_block0.c();
			t0 = space();
			div1 = element("div");
			t1 = space();
			div2 = element("div");
			t2 = text$1(t2_value);
			t3 = space();
			button = element("button");
			create_component(icon.$$.fragment);
			t4 = space();
			ul = element("ul");
			if (if_block1) if_block1.c();
			attr(div0, "class", "title svelte-yzsyxo");
			attr(div1, "class", "space svelte-yzsyxo");
			attr(div2, "class", "count svelte-yzsyxo");
			attr(button, "class", "collapse svelte-yzsyxo");
			attr(button, "title", "Toggle Group");
			attr(header, "class", header_class_value = "" + (null_to_empty(`group-header ${/*group*/ ctx[0].type}`) + " svelte-yzsyxo"));
			attr(ul, "class", "svelte-yzsyxo");
			attr(section, "class", section_class_value = "group " + /*groupNameAsClass*/ ctx[6] + " svelte-yzsyxo");
		},
		m(target, anchor) {
			insert(target, section, anchor);
			append(section, header);
			append(header, div0);
			if_block0.m(div0, null);
			append(header, t0);
			append(header, div1);
			append(header, t1);
			append(header, div2);
			append(div2, t2);
			append(header, t3);
			append(header, button);
			mount_component(icon, button, null);
			append(section, t4);
			append(section, ul);
			if (if_block1) if_block1.m(ul, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(div0, "click", /*clickTitle*/ ctx[7]),
					listen(button, "click", /*click_handler*/ ctx[8])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(div0, null);
				}
			}

			if ((!current || dirty & /*group*/ 1) && t2_value !== (t2_value = /*group*/ ctx[0].todos.length + "")) set_data(t2, t2_value);
			const icon_changes = {};
			if (dirty & /*isCollapsed*/ 4) icon_changes.direction = /*isCollapsed*/ ctx[2] ? "left" : "down";
			icon.$set(icon_changes);

			if (!current || dirty & /*group*/ 1 && header_class_value !== (header_class_value = "" + (null_to_empty(`group-header ${/*group*/ ctx[0].type}`) + " svelte-yzsyxo"))) {
				attr(header, "class", header_class_value);
			}

			if (!/*isCollapsed*/ ctx[2]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*isCollapsed*/ 4) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block$1(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(ul, null);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (!current || dirty & /*groupNameAsClass*/ 64 && section_class_value !== (section_class_value = "group " + /*groupNameAsClass*/ ctx[6] + " svelte-yzsyxo")) {
				attr(section, "class", section_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			transition_in(if_block1);
			current = true;
		},
		o(local) {
			transition_out(icon.$$.fragment, local);
			transition_out(if_block1);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(section);
			if_block0.d();
			destroy_component(icon);
			if (if_block1) if_block1.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$1($$self, $$props, $$invalidate) {
	
	
	let { group } = $$props;
	let { mainTag } = $$props;
	let { isCollapsed } = $$props;
	let { lookAndFeel } = $$props;
	let { app } = $$props;
	let { onToggle } = $$props;
	let groupNameAsClass;

	function clickTitle(ev) {
		if (group.type === "page") navToFile(app, group.groupId, ev);
	}

	const click_handler = () => onToggle(group.groupId);

	$$self.$$set = $$props => {
		if ("group" in $$props) $$invalidate(0, group = $$props.group);
		if ("mainTag" in $$props) $$invalidate(1, mainTag = $$props.mainTag);
		if ("isCollapsed" in $$props) $$invalidate(2, isCollapsed = $$props.isCollapsed);
		if ("lookAndFeel" in $$props) $$invalidate(3, lookAndFeel = $$props.lookAndFeel);
		if ("app" in $$props) $$invalidate(4, app = $$props.app);
		if ("onToggle" in $$props) $$invalidate(5, onToggle = $$props.onToggle);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*group, mainTag*/ 3) {
			{
				const groupName = group.groupName || mainTag;
				const sanitzedGroupName = groupName.replace(/[^A-Za-z0-9]/g, "");

				const dasherizedGroupName = sanitzedGroupName.replace(/^([A-Z])|[\s\._](\w)/g, function (_, p1, p2) {
					if (p2) return "-" + p2.toLowerCase();
					return p1.toLowerCase();
				});

				$$invalidate(6, groupNameAsClass = `group-${dasherizedGroupName}`);
			}
		}
	};

	return [
		group,
		mainTag,
		isCollapsed,
		lookAndFeel,
		app,
		onToggle,
		groupNameAsClass,
		clickTitle,
		click_handler
	];
}

class ChecklistGroup extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-yzsyxo-style")) add_css$1();

		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
			group: 0,
			mainTag: 1,
			isCollapsed: 2,
			lookAndFeel: 3,
			app: 4,
			onToggle: 5
		});
	}
}

/* src/svelte/App.svelte generated by Svelte v3.38.2 */

function add_css() {
	var style = element("style");
	style.id = "svelte-1rowz1t-style";
	style.textContent = ".empty.svelte-1rowz1t{color:var(--text-faint);text-align:center}.checklist-plugin-main.svelte-1rowz1t{padding:initial;width:initial;height:initial;position:initial;overflow-y:initial;overflow-wrap:initial}";
	append(document.head, style);
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[17] = list[i];
	return child_ctx;
}

// (56:2) {:else}
function create_else_block_1(ctx) {
	let each_1_anchor;
	let current;
	let each_value = /*todoGroups*/ ctx[5];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty$1();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (dirty & /*todoGroups, app, lookAndFeel, todoTag, _collapsedSections, toggleGroup*/ 111) {
				each_value = /*todoGroups*/ ctx[5];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

// (48:36) 
function create_if_block_1(ctx) {
	let div;

	function select_block_type_1(ctx, dirty) {
		if (/*todoTag*/ ctx[0]) return create_if_block_2;
		return create_else_block;
	}

	let current_block_type = select_block_type_1(ctx);
	let if_block = current_block_type(ctx);

	return {
		c() {
			div = element("div");
			if_block.c();
			attr(div, "class", "empty svelte-1rowz1t");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if_block.m(div, null);
		},
		p(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div, null);
				}
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if_block.d();
		}
	};
}

// (46:2) {#if firstRun}
function create_if_block(ctx) {
	let loading;
	let current;
	loading = new Loading({});

	return {
		c() {
			create_component(loading.$$.fragment);
		},
		m(target, anchor) {
			mount_component(loading, target, anchor);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(loading.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(loading.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(loading, detaching);
		}
	};
}

// (57:4) {#each todoGroups as group}
function create_each_block(ctx) {
	let checklistgroup;
	let current;

	checklistgroup = new ChecklistGroup({
			props: {
				group: /*group*/ ctx[17],
				app: /*app*/ ctx[3],
				lookAndFeel: /*lookAndFeel*/ ctx[1],
				mainTag: /*todoTag*/ ctx[0],
				isCollapsed: /*_collapsedSections*/ ctx[2].includes(/*group*/ ctx[17].groupId),
				onToggle: /*toggleGroup*/ ctx[6]
			}
		});

	return {
		c() {
			create_component(checklistgroup.$$.fragment);
		},
		m(target, anchor) {
			mount_component(checklistgroup, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const checklistgroup_changes = {};
			if (dirty & /*todoGroups*/ 32) checklistgroup_changes.group = /*group*/ ctx[17];
			if (dirty & /*app*/ 8) checklistgroup_changes.app = /*app*/ ctx[3];
			if (dirty & /*lookAndFeel*/ 2) checklistgroup_changes.lookAndFeel = /*lookAndFeel*/ ctx[1];
			if (dirty & /*todoTag*/ 1) checklistgroup_changes.mainTag = /*todoTag*/ ctx[0];
			if (dirty & /*_collapsedSections, todoGroups*/ 36) checklistgroup_changes.isCollapsed = /*_collapsedSections*/ ctx[2].includes(/*group*/ ctx[17].groupId);
			checklistgroup.$set(checklistgroup_changes);
		},
		i(local) {
			if (current) return;
			transition_in(checklistgroup.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(checklistgroup.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(checklistgroup, detaching);
		}
	};
}

// (52:6) {:else}
function create_else_block(ctx) {
	let t;

	return {
		c() {
			t = text$1("No checklists found");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (50:6) {#if todoTag}
function create_if_block_2(ctx) {
	let t0;
	let t1;

	return {
		c() {
			t0 = text$1("No checklists found for tag: #");
			t1 = text$1(/*todoTag*/ ctx[0]);
		},
		m(target, anchor) {
			insert(target, t0, anchor);
			insert(target, t1, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*todoTag*/ 1) set_data(t1, /*todoTag*/ ctx[0]);
		},
		d(detaching) {
			if (detaching) detach(t0);
			if (detaching) detach(t1);
		}
	};
}

function create_fragment(ctx) {
	let div;
	let current_block_type_index;
	let if_block;
	let current;
	const if_block_creators = [create_if_block, create_if_block_1, create_else_block_1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*firstRun*/ ctx[4]) return 0;
		if (/*todoGroups*/ ctx[5].length === 0) return 1;
		return 2;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			div = element("div");
			if_block.c();
			attr(div, "class", "checklist-plugin-main markdown-preview-view svelte-1rowz1t");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if_blocks[current_block_type_index].m(div, null);
			current = true;
		},
		p(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(div, null);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if_blocks[current_block_type_index].d();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	
	
	
	let { todoTag } = $$props;
	let { showChecked } = $$props;
	let { groupBy } = $$props;
	let { sortDirection } = $$props;
	let { lookAndFeel } = $$props;
	let { ignoreFiles } = $$props;
	let { includeFiles } = $$props;
	let { _collapsedSections } = $$props;
	let { updateSetting } = $$props;
	let { rerenderKey } = $$props;
	let { app } = $$props;
	let todos = [];
	let todoGroups = [];
	let firstRun = true;

	const formGroups = _todos => {
		return groupTodos(showChecked ? _todos : _todos.filter(e => !e.checked), groupBy, sortDirection);
	};

	const recalcItems = () => __awaiter(void 0, void 0, void 0, function* () {
		todos = yield parseTodos(app.vault.getFiles(), todoTag, app.metadataCache, app.vault, ignoreFiles, includeFiles, sortDirection);
		$$invalidate(5, todoGroups = formGroups(todos));
		$$invalidate(4, firstRun = false);
	});

	const toggleGroup = id => {
		const newCollapsedSections = _collapsedSections.includes(id)
		? _collapsedSections.filter(e => e !== id)
		: [..._collapsedSections, id];

		updateSetting({ _collapsedSections: newCollapsedSections });
	};

	$$self.$$set = $$props => {
		if ("todoTag" in $$props) $$invalidate(0, todoTag = $$props.todoTag);
		if ("showChecked" in $$props) $$invalidate(7, showChecked = $$props.showChecked);
		if ("groupBy" in $$props) $$invalidate(8, groupBy = $$props.groupBy);
		if ("sortDirection" in $$props) $$invalidate(9, sortDirection = $$props.sortDirection);
		if ("lookAndFeel" in $$props) $$invalidate(1, lookAndFeel = $$props.lookAndFeel);
		if ("ignoreFiles" in $$props) $$invalidate(10, ignoreFiles = $$props.ignoreFiles);
		if ("includeFiles" in $$props) $$invalidate(11, includeFiles = $$props.includeFiles);
		if ("_collapsedSections" in $$props) $$invalidate(2, _collapsedSections = $$props._collapsedSections);
		if ("updateSetting" in $$props) $$invalidate(12, updateSetting = $$props.updateSetting);
		if ("rerenderKey" in $$props) $$invalidate(13, rerenderKey = $$props.rerenderKey);
		if ("app" in $$props) $$invalidate(3, app = $$props.app);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*rerenderKey, firstRun*/ 8208) {
			{
				if (firstRun) setTimeout(recalcItems, 600); else recalcItems();
			}
		}
	};

	return [
		todoTag,
		lookAndFeel,
		_collapsedSections,
		app,
		firstRun,
		todoGroups,
		toggleGroup,
		showChecked,
		groupBy,
		sortDirection,
		ignoreFiles,
		includeFiles,
		updateSetting,
		rerenderKey
	];
}

class App extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1rowz1t-style")) add_css();

		init(this, options, instance, create_fragment, safe_not_equal, {
			todoTag: 0,
			showChecked: 7,
			groupBy: 8,
			sortDirection: 9,
			lookAndFeel: 1,
			ignoreFiles: 10,
			includeFiles: 11,
			_collapsedSections: 2,
			updateSetting: 12,
			rerenderKey: 13,
			app: 3
		});
	}
}

class TodoListView extends obsidian.ItemView {
    constructor(leaf, plugin) {
        super(leaf);
        this.plugin = plugin;
    }
    getViewType() {
        return TODO_VIEW_TYPE;
    }
    getDisplayText() {
        return "Todo List";
    }
    getIcon() {
        return "checkmark";
    }
    async onClose() {
        this._app.$destroy();
    }
    getProps() {
        return {
            todoTag: this.plugin.getSettingValue("todoPageName"),
            showChecked: this.plugin.getSettingValue("showChecked"),
            groupBy: this.plugin.getSettingValue("groupBy"),
            sortDirection: this.plugin.getSettingValue("sortDirection"),
            ignoreFiles: this.plugin.getSettingValue("ignoreFiles"),
            includeFiles: this.plugin.getSettingValue("includeFiles"),
            lookAndFeel: this.plugin.getSettingValue("lookAndFeel"),
            rerenderKey: Symbol("[rerender]"),
            _collapsedSections: this.plugin.getSettingValue("_collapsedSections"),
            app: this.app,
            updateSetting: (updates) => this.plugin.updateSettings(updates),
        };
    }
    async onOpen() {
        this._app = new App({
            target: this.contentEl,
            props: this.getProps(),
        });
        this.registerEvent(this.app.metadataCache.on("resolved", (...args) => {
            this.rerender();
        }));
    }
    rerender() {
        this._app.$set(this.getProps());
    }
}

class TodoPlugin extends obsidian.Plugin {
    async onload() {
        await this.loadSettings();
        this.addSettingTab(new TodoSettingTab(this.app, this));
        this.registerView(TODO_VIEW_TYPE, (leaf) => {
            this.view = new TodoListView(leaf, this);
            return this.view;
        });
        if (this.app.workspace.layoutReady)
            this.initLeaf();
        else
            this.registerEvent(this.app.workspace.on("layout-ready", () => this.initLeaf()));
    }
    initLeaf() {
        if (this.app.workspace.getLeavesOfType(TODO_VIEW_TYPE).length)
            return;
        this.app.workspace.getRightLeaf(false).setViewState({
            type: TODO_VIEW_TYPE,
            active: true,
        });
    }
    async onunload() {
        var _a;
        await this.view.onClose();
        (_a = this.app.workspace.getLeavesOfType(TODO_VIEW_TYPE)[0]) === null || _a === void 0 ? void 0 : _a.detach();
    }
    async loadSettings() {
        const loadedData = await this.loadData();
        this.settings = Object.assign(Object.assign({}, DEFAULT_SETTINGS), loadedData);
    }
    async updateSettings(updates) {
        Object.assign(this.settings, updates);
        await this.saveData(this.settings);
        this.view.rerender();
    }
    getSettingValue(setting) {
        return this.settings[setting];
    }
}

module.exports = TodoPlugin;
