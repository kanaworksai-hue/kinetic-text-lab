#target aftereffects

/*
  KANA Kinetic Text Lab
  A dedicated After Effects ScriptUI panel for punchy title, lyric, logo,
  and cyber/glitch text effects.

  Install:
  Copy this file and the asset folder to:
  /Applications/Adobe After Effects 2026/Scripts/ScriptUI Panels/

  Then restart After Effects and open it from Window > KANA Kinetic Text Lab.jsx.
*/

(function KineticTextLab(thisObj) {
    var SCRIPT_NAME = "KANA Kinetic Text Lab";
    var PREFIX = "KTL";
    var X_URL = "https://x.com/KanaWorks_AI";
    var ASSET_FOLDER_NAME = "KANA Kinetic Text Lab Assets";
    var LOGO_FILENAME = "kana_logo_72.png";
    var X_LINK_MAC_FILENAME = "KanaWorks_AI.webloc";
    var X_LINK_WIN_FILENAME = "KanaWorks_AI.url";

    function buildUI(thisObj) {
        var pal = (thisObj instanceof Panel)
            ? thisObj
            : new Window("palette", SCRIPT_NAME, undefined, { resizeable: true });

        pal.orientation = "column";
        pal.alignChildren = ["fill", "top"];
        pal.spacing = 8;
        pal.margins = 10;

        var header = pal.add("group");
        header.orientation = "row";
        header.alignChildren = ["left", "center"];
        header.spacing = 10;
        header.alignment = ["fill", "top"];

        var logoFile = findLogoFile();
        if (logoFile) {
            try {
                var logo = header.add("image", undefined, ScriptUI.newImage(logoFile));
                logo.helpTip = "KanaWorks_AI";
            } catch (logoErr) {
            }
        }

        var brandColumn = header.add("group");
        brandColumn.orientation = "column";
        brandColumn.alignChildren = ["left", "top"];
        brandColumn.spacing = 4;

        var title = brandColumn.add("statictext", undefined, "KANA Kinetic Text Lab");
        title.alignment = ["fill", "top"];

        var help = brandColumn.add("statictext", undefined, "Select text layers, then click a preset.");
        help.alignment = ["fill", "top"];

        var promoRow = brandColumn.add("group");
        promoRow.orientation = "row";
        promoRow.alignChildren = ["left", "center"];
        var xBtn = promoRow.add("button", undefined, "X @KanaWorks_AI");
        xBtn.helpTip = "Open https://x.com/KanaWorks_AI";
        xBtn.onClick = function () {
            openExternalUrl(X_URL);
        };

        var controls = pal.add("panel", undefined, "Quick Controls");
        controls.orientation = "column";
        controls.alignChildren = ["fill", "top"];
        controls.margins = 10;

        var strengthRow = controls.add("group");
        strengthRow.orientation = "row";
        strengthRow.alignChildren = ["left", "center"];
        strengthRow.add("statictext", undefined, "Strength");
        var strengthInput = strengthRow.add("edittext", undefined, "45");
        strengthInput.characters = 5;

        var speedRow = controls.add("group");
        speedRow.orientation = "row";
        speedRow.alignChildren = ["left", "center"];
        speedRow.add("statictext", undefined, "Speed");
        var speedInput = speedRow.add("edittext", undefined, "12");
        speedInput.characters = 5;

        var durationRow = controls.add("group");
        durationRow.orientation = "row";
        durationRow.alignChildren = ["left", "center"];
        durationRow.add("statictext", undefined, "Reveal Sec");
        var durationInput = durationRow.add("edittext", undefined, "0.9");
        durationInput.characters = 5;

        var revealPanel = pal.add("panel", undefined, "Reveal");
        revealPanel.orientation = "column";
        revealPanel.alignChildren = ["fill", "top"];
        revealPanel.margins = 10;

        var revealRow1 = revealPanel.add("group");
        revealRow1.orientation = "row";
        revealRow1.alignChildren = ["fill", "top"];
        var glitchRevealBtn = revealRow1.add("button", undefined, "Glitch Reveal");
        var cyberDecodeBtn = revealRow1.add("button", undefined, "Cyber Decode");

        var revealRow2 = revealPanel.add("group");
        revealRow2.orientation = "row";
        revealRow2.alignChildren = ["fill", "top"];
        var typeOnBtn = revealRow2.add("button", undefined, "Type On");
        var scrambleLoopBtn = revealRow2.add("button", undefined, "Scramble Loop");

        var stylePanel = pal.add("panel", undefined, "Style");
        stylePanel.orientation = "column";
        stylePanel.alignChildren = ["fill", "top"];
        stylePanel.margins = 10;

        var styleRow1 = stylePanel.add("group");
        styleRow1.orientation = "row";
        styleRow1.alignChildren = ["fill", "top"];
        var neonBtn = styleRow1.add("button", undefined, "Neon Flicker");
        var hologramBtn = styleRow1.add("button", undefined, "Hologram");

        var styleRow2 = stylePanel.add("group");
        styleRow2.orientation = "row";
        styleRow2.alignChildren = ["fill", "top"];
        var rgbBtn = styleRow2.add("button", undefined, "RGB Split");
        var sliceBtn = styleRow2.add("button", undefined, "Slice Jitter");

        var motionPanel = pal.add("panel", undefined, "Motion");
        motionPanel.orientation = "column";
        motionPanel.alignChildren = ["fill", "top"];
        motionPanel.margins = 10;

        var motionRow = motionPanel.add("group");
        motionRow.orientation = "row";
        motionRow.alignChildren = ["fill", "top"];
        var impactBtn = motionRow.add("button", undefined, "Impact Title");
        var echoBtn = motionRow.add("button", undefined, "Echo Trail");
        var beatBtn = motionRow.add("button", undefined, "Beat Lyrics");

        var utility = pal.add("panel", undefined, "Utility");
        utility.orientation = "row";
        utility.alignChildren = ["fill", "top"];
        utility.margins = 10;
        var cleanBtn = utility.add("button", undefined, "Clean KTL");

        function strength() {
            return clampNumber(parseFloat(strengthInput.text), 1, 240, 45);
        }

        function speed() {
            return clampNumber(parseFloat(speedInput.text), 1, 80, 12);
        }

        function duration() {
            return clampNumber(parseFloat(durationInput.text), 0.15, 8, 0.9);
        }

        glitchRevealBtn.onClick = function () {
            runWithUndo("KTL Glitch Reveal", function () {
                applyGlitchReveal(strength(), speed(), duration());
            });
        };

        cyberDecodeBtn.onClick = function () {
            runWithUndo("KTL Cyber Decode", function () {
                applyCyberDecode(strength(), speed(), duration());
            });
        };

        typeOnBtn.onClick = function () {
            runWithUndo("KTL Type On", function () {
                applyTypeOn(strength(), speed(), duration());
            });
        };

        scrambleLoopBtn.onClick = function () {
            runWithUndo("KTL Scramble Loop", function () {
                applyScrambleLoop(strength(), speed(), duration());
            });
        };

        neonBtn.onClick = function () {
            runWithUndo("KTL Neon Flicker", function () {
                applyNeonFlicker(strength(), speed(), duration());
            });
        };

        hologramBtn.onClick = function () {
            runWithUndo("KTL Hologram", function () {
                applyHologram(strength(), speed(), duration());
            });
        };

        rgbBtn.onClick = function () {
            runWithUndo("KTL RGB Split", function () {
                applyRGBSplit(strength(), speed(), duration());
            });
        };

        sliceBtn.onClick = function () {
            runWithUndo("KTL Slice Jitter", function () {
                applySliceJitter(strength(), speed(), duration());
            });
        };

        impactBtn.onClick = function () {
            runWithUndo("KTL Impact Title", function () {
                applyImpactTitle(strength(), speed(), duration());
            });
        };

        echoBtn.onClick = function () {
            runWithUndo("KTL Echo Trail", function () {
                applyEchoTrail(strength(), speed(), duration());
            });
        };

        beatBtn.onClick = function () {
            runWithUndo("KTL Beat Lyrics", function () {
                applyBeatLyrics(strength(), speed(), duration());
            });
        };

        cleanBtn.onClick = function () {
            runWithUndo("KTL Clean", function () {
                cleanKTL();
            });
        };

        pal.layout.layout(true);
        pal.layout.resize();
        pal.onResizing = pal.onResize = function () {
            this.layout.resize();
        };

        return pal;
    }

    function runWithUndo(name, fn) {
        app.beginUndoGroup(name);
        try {
            fn();
        } catch (err) {
            alert(SCRIPT_NAME + " error:\n" + err.toString());
        } finally {
            app.endUndoGroup();
        }
    }

    function clampNumber(value, min, max, fallback) {
        if (isNaN(value)) {
            return fallback;
        }
        if (value < min) {
            return min;
        }
        if (value > max) {
            return max;
        }
        return value;
    }

    function findLogoFile() {
        return findAssetFile(LOGO_FILENAME);
    }

    function findXLinkFile() {
        var isWindows = $.os.toLowerCase().indexOf("windows") >= 0;
        return findAssetFile(isWindows ? X_LINK_WIN_FILENAME : X_LINK_MAC_FILENAME);
    }

    function findAssetFile(filename) {
        var scriptFolder = File($.fileName).parent;
        var candidates = [
            File(scriptFolder.fsName + "/" + ASSET_FOLDER_NAME + "/" + filename),
            File(scriptFolder.fsName + "/assets/" + filename),
            File(scriptFolder.fsName + "/" + filename)
        ];

        for (var i = 0; i < candidates.length; i++) {
            if (candidates[i].exists) {
                return candidates[i];
            }
        }
        return null;
    }

    function openExternalUrl(url) {
        var isWindows = $.os.toLowerCase().indexOf("windows") >= 0;

        try {
            var bundledLink = findXLinkFile();
            if (bundledLink && bundledLink.exists) {
                bundledLink.execute();
                return;
            }
        } catch (err0) {
        }

        try {
            if (typeof system !== "undefined" && system.callSystem) {
                if (isWindows) {
                    system.callSystem('cmd /c start "" "' + url + '"');
                } else {
                    system.callSystem('open "' + url + '"');
                }
                return;
            }
        } catch (err1) {
        }

        try {
            var linkFile;
            if (isWindows) {
                linkFile = File(Folder.temp.fsName + "/KANA_Kinetic_Text_Lab_X.url");
                linkFile.encoding = "UTF-8";
                if (linkFile.open("w")) {
                    linkFile.write("[InternetShortcut]\r\nURL=" + url + "\r\n");
                    linkFile.close();
                    linkFile.execute();
                    return;
                }
            } else {
                linkFile = File(Folder.temp.fsName + "/KANA_Kinetic_Text_Lab_X.webloc");
                linkFile.encoding = "UTF-8";
                if (linkFile.open("w")) {
                    linkFile.write("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
                    linkFile.write("<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" ");
                    linkFile.write("\"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">\n");
                    linkFile.write("<plist version=\"1.0\"><dict><key>URL</key><string>" + url + "</string></dict></plist>\n");
                    linkFile.close();
                    linkFile.execute();
                    return;
                }
            }
        } catch (err2) {
        }

        try {
            if (isWindows) {
                system.callSystem('cmd /c start "" "' + url + '"');
            } else {
                system.callSystem('open "' + url + '"');
            }
        } catch (err3) {
            alert("Open this URL:\n" + url);
        }
    }

    function getComp() {
        var item = app.project.activeItem;
        if (!(item && item instanceof CompItem)) {
            alert("Open a composition first.");
            return null;
        }
        return item;
    }

    function getSelectedTextLayers() {
        var comp = getComp();
        if (!comp) {
            return null;
        }

        var selected = comp.selectedLayers;
        if (selected.length === 0) {
            alert("Select one or more text layers first.");
            return null;
        }

        var textLayers = [];
        for (var i = 0; i < selected.length; i++) {
            if (isTextLayer(selected[i])) {
                textLayers.push(selected[i]);
            }
        }

        if (textLayers.length === 0) {
            alert("The selected layer is not a text layer.\nUse the Text Tool to create text, then select it.");
            return null;
        }

        return textLayers;
    }

    function isTextLayer(layer) {
        try {
            return layer.property("ADBE Text Properties") !== null;
        } catch (err) {
            return false;
        }
    }

    function effectParade(layer) {
        try {
            return layer.property("ADBE Effect Parade");
        } catch (err) {
            return null;
        }
    }

    function findEffect(layer, name) {
        var effects = effectParade(layer);
        if (!effects) {
            return null;
        }
        for (var i = 1; i <= effects.numProperties; i++) {
            if (effects.property(i).name === name) {
                return effects.property(i);
            }
        }
        return null;
    }

    function addOrGetEffect(layer, matchName, name) {
        var existing = findEffect(layer, name);
        if (existing) {
            return existing;
        }

        var effects = effectParade(layer);
        if (!effects) {
            return null;
        }

        try {
            var fx = effects.addProperty(matchName);
            fx.name = name;
            return fx;
        } catch (err) {
            return null;
        }
    }

    function setEffectValue(fx, index, value) {
        if (!fx) {
            return;
        }
        try {
            if (fx.property(index)) {
                fx.property(index).setValue(value);
            }
        } catch (err) {
        }
    }

    function colorValue(color) {
        if (color.length === 4) {
            return color;
        }
        return [color[0], color[1], color[2], 1];
    }

    function setFirstColorProperty(fx, color) {
        if (!fx) {
            return;
        }

        var value = colorValue(color);
        for (var i = 1; i <= fx.numProperties; i++) {
            try {
                if (fx.property(i).propertyValueType === PropertyValueType.COLOR) {
                    fx.property(i).setValue(value);
                    return;
                }
            } catch (err) {
            }
        }
    }

    function addSlider(layer, name, value) {
        var fx = addOrGetEffect(layer, "ADBE Slider Control", PREFIX + " " + name);
        setEffectValue(fx, 1, value);
        return fx;
    }

    function addCoreControls(layer, strength, speed, duration) {
        addSlider(layer, "Strength", strength);
        addSlider(layer, "Speed", speed);
        addSlider(layer, "Reveal Seconds", duration);
        addSlider(layer, "Seed", Math.floor(Math.random() * 9999));
    }

    function addFill(layer, color) {
        var fill = addOrGetEffect(layer, "ADBE Fill", PREFIX + " Color Fill");
        setFirstColorProperty(fill, color);
    }

    function addGlow(layer, intensity, radius) {
        var glow = addOrGetEffect(layer, "ADBE Glow", PREFIX + " Glow");
        setEffectValue(glow, 3, intensity);
        setEffectValue(glow, 4, radius);
    }

    function addNoise(layer, amount) {
        var noise = addOrGetEffect(layer, "ADBE Noise", PREFIX + " Noise");
        setEffectValue(noise, 1, amount);
    }

    function addPosterizeTime(layer, fps) {
        var posterize = addOrGetEffect(layer, "ADBE Posterize Time", PREFIX + " Stutter FPS");
        setEffectValue(posterize, 1, fps);
    }

    function addTurbulentDisplace(layer, amount, size) {
        var warp = addOrGetEffect(layer, "ADBE Turbulent Displace", PREFIX + " Digital Warp");
        setEffectValue(warp, 2, amount);
        setEffectValue(warp, 3, size);
    }

    function addWaveWarp(layer, height, width) {
        var wave = addOrGetEffect(layer, "ADBE Wave Warp", PREFIX + " Signal Wave");
        setEffectValue(wave, 2, height);
        setEffectValue(wave, 3, width);
    }

    function addVenetian(layer, width) {
        var blinds = addOrGetEffect(layer, "ADBE Venetian Blinds", PREFIX + " Scanlines");
        setEffectValue(blinds, 3, width);
    }

    function addBlur(layer, amount) {
        var blur = addOrGetEffect(layer, "ADBE Gaussian Blur 2", PREFIX + " Soft Blur");
        setEffectValue(blur, 1, amount);
        setEffectValue(blur, 3, true);
    }

    function setExpression(prop, expr) {
        try {
            if (prop && prop.canSetExpression) {
                prop.expression = expr;
                prop.expressionEnabled = true;
            }
        } catch (err) {
        }
    }

    function clearKTLExpression(prop) {
        try {
            if (prop && prop.canSetExpression && prop.expression && prop.expression.indexOf("// KTL") >= 0) {
                prop.expression = "";
            }
        } catch (err) {
        }
    }

    function getTransform(layer, propName) {
        try {
            return layer.property("ADBE Transform Group").property(propName);
        } catch (err) {
            return null;
        }
    }

    function getTextSource(layer) {
        try {
            return layer.property("ADBE Text Properties").property("ADBE Text Document");
        } catch (err) {
            return null;
        }
    }

    function textOriginalLine() {
        return "var original = (value.text !== undefined) ? value.text : value.toString();\n";
    }

    function decodeExpression(mode, density) {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&<>[]{}";
        if (mode === "cyber") {
            chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ_/-+=<>[]{}";
        }
        return "// KTL text decode\n" +
            textOriginalLine() +
            "var chars = '" + chars + "';\n" +
            "var dur = Math.max(0.05, effect('KTL Reveal Seconds')(1));\n" +
            "var speed = effect('KTL Speed')(1);\n" +
            "var seed = effect('KTL Seed')(1);\n" +
            "var progress = clamp((time - inPoint) / dur, 0, 1);\n" +
            "var revealCount = Math.floor(original.length * progress);\n" +
            "var out = '';\n" +
            "for (var i = 0; i < original.length; i++) {\n" +
            "  if (original.charAt(i) == ' ') {\n" +
            "    out += ' ';\n" +
            "  } else if (i < revealCount) {\n" +
            "    out += original.charAt(i);\n" +
            "  } else {\n" +
            "    seedRandom(i * " + density + " + Math.floor(time * speed * 8) + seed, true);\n" +
            "    out += chars.charAt(Math.floor(random(chars.length)));\n" +
            "  }\n" +
            "}\n" +
            "out;";
    }

    function typeOnExpression() {
        return "// KTL type on\n" +
            textOriginalLine() +
            "var dur = Math.max(0.05, effect('KTL Reveal Seconds')(1));\n" +
            "var progress = clamp((time - inPoint) / dur, 0, 1);\n" +
            "var count = Math.floor(original.length * progress);\n" +
            "original.substr(0, count);";
    }

    function scrambleLoopExpression() {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&<>[]{}";
        return "// KTL scramble loop\n" +
            textOriginalLine() +
            "var chars = '" + chars + "';\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var speed = effect('KTL Speed')(1);\n" +
            "var seed = effect('KTL Seed')(1);\n" +
            "var chance = clamp(strength / 180, 0.02, 0.65);\n" +
            "var out = '';\n" +
            "for (var i = 0; i < original.length; i++) {\n" +
            "  if (original.charAt(i) == ' ') { out += ' '; }\n" +
            "  else {\n" +
            "    seedRandom(i * 101 + Math.floor(time * speed * 7) + seed, true);\n" +
            "    out += (random(0, 1) < chance) ? chars.charAt(Math.floor(random(chars.length))) : original.charAt(i);\n" +
            "  }\n" +
            "}\n" +
            "out;";
    }

    function positionShakeExpression(multiplier) {
        return "// KTL position shake\n" +
            "var amp = effect('KTL Strength')(1) * " + multiplier + ";\n" +
            "var spd = effect('KTL Speed')(1);\n" +
            "var seed = effect('KTL Seed')(1);\n" +
            "seedRandom(Math.floor(time * spd) + seed + index * 31, true);\n" +
            "var dx = random(-amp, amp);\n" +
            "var dy = random(-amp, amp);\n" +
            "(value.length == 3) ? value + [dx, dy, 0] : value + [dx, dy];";
    }

    function opacityFlickerExpression(minValue) {
        return "// KTL opacity flicker\n" +
            "var spd = effect('KTL Speed')(1);\n" +
            "var seed = effect('KTL Seed')(1);\n" +
            "seedRandom(Math.floor(time * spd * 3) + seed + index * 71, true);\n" +
            "var gate = random(0, 1);\n" +
            "gate > 0.24 ? value : value * random(" + minValue + ", 0.82);";
    }

    function impactScaleExpression() {
        return "// KTL impact scale\n" +
            "var amp = effect('KTL Strength')(1) * 0.68;\n" +
            "var t = time - inPoint;\n" +
            "var burst = Math.exp(-t * 7) * Math.sin(t * 40) * amp;\n" +
            "var add = Math.max(0, burst);\n" +
            "(value.length == 3) ? value + [add, add, 0] : value + [add, add];";
    }

    function rgbPositionExpression(direction, yMul) {
        return "// KTL RGB split\n" +
            "var amp = effect('KTL Strength')(1) * 0.34;\n" +
            "var spd = effect('KTL Speed')(1);\n" +
            "var seed = effect('KTL Seed')(1);\n" +
            "seedRandom(Math.floor(time * spd) + seed + index * 43, true);\n" +
            "var dx = random(amp * 0.25, amp) * " + direction + ";\n" +
            "var dy = random(-amp * 0.16, amp * 0.16) * " + yMul + ";\n" +
            "(value.length == 3) ? value + [dx, dy, 0] : value + [dx, dy];";
    }

    function echoPositionExpression(order) {
        return "// KTL echo trail\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var drift = strength * " + order + " * 0.08;\n" +
            "(value.length == 3) ? value + [-drift, drift, 0] : value + [-drift, drift];";
    }

    function beatScaleExpression() {
        return "// KTL beat lyrics scale\n" +
            "var amp = 0;\n" +
            "try { amp = thisComp.layer('Audio Amplitude').effect('Both Channels')(1); } catch (err1) { try { amp = thisComp.layer('Audio Amplitude').effect(3)(1); } catch (err2) { amp = 0; } }\n" +
            "var strength = effect('KTL Strength')(1) * 0.45;\n" +
            "var pulse = amp * strength / 22;\n" +
            "(value.length == 3) ? value + [pulse, pulse, 0] : value + [pulse, pulse];";
    }

    function beatOpacityExpression() {
        return "// KTL beat lyrics opacity\n" +
            "var amp = 0;\n" +
            "try { amp = thisComp.layer('Audio Amplitude').effect('Both Channels')(1); } catch (err1) { try { amp = thisComp.layer('Audio Amplitude').effect(3)(1); } catch (err2) { amp = 0; } }\n" +
            "clamp(value + amp * 1.2, 20, 100);";
    }

    function applyGlitchReveal(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            addCoreControls(layer, strength, speed, duration);
            setExpression(getTextSource(layer), decodeExpression("glitch", 17));
            setExpression(getTransform(layer, "ADBE Position"), positionShakeExpression(0.12));
            setExpression(getTransform(layer, "ADBE Opacity"), opacityFlickerExpression(0.55));
            addFill(layer, [1, 1, 1]);
            addGlow(layer, 1.15, 28);
            addNoise(layer, Math.min(55, strength * 0.55));
            addPosterizeTime(layer, 16);
        }
    }

    function applyCyberDecode(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            addCoreControls(layer, strength * 0.9, speed * 1.4, duration * 1.15);
            setExpression(getTextSource(layer), decodeExpression("cyber", 31));
            addFill(layer, [0.68, 1, 0.18]);
            addGlow(layer, 1.45, 34);
            addPosterizeTime(layer, 20);
        }
    }

    function applyTypeOn(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            addCoreControls(layer, strength * 0.45, speed, duration);
            setExpression(getTextSource(layer), typeOnExpression());
            setExpression(getTransform(layer, "ADBE Opacity"), opacityFlickerExpression(0.84));
            addFill(layer, [1, 1, 1]);
            addGlow(layer, 0.7, 16);
        }
    }

    function applyScrambleLoop(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            addCoreControls(layer, strength, speed, duration);
            setExpression(getTextSource(layer), scrambleLoopExpression());
            setExpression(getTransform(layer, "ADBE Position"), positionShakeExpression(0.05));
            addFill(layer, [0.12, 0.92, 1]);
            addGlow(layer, 0.95, 20);
            addPosterizeTime(layer, 15);
        }
    }

    function applyNeonFlicker(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            addCoreControls(layer, strength, speed, duration);
            setExpression(getTransform(layer, "ADBE Opacity"), opacityFlickerExpression(0.18));
            addFill(layer, [0.04, 0.95, 1]);
            addGlow(layer, 1.9, 52);
            makeTextGhost(layer, "Neon Magenta", [1, 0.05, 0.62], -0.45, 28);
        }
    }

    function applyHologram(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            addCoreControls(layer, strength, speed, duration);
            setExpression(getTransform(layer, "ADBE Position"), positionShakeExpression(0.08));
            setExpression(getTransform(layer, "ADBE Opacity"), opacityFlickerExpression(0.52));
            addFill(layer, [0.1, 0.86, 1]);
            addGlow(layer, 1.35, 36);
            addVenetian(layer, 4);
            addWaveWarp(layer, Math.min(18, strength * 0.22), 72);
            addNoise(layer, Math.min(38, strength * 0.42));
        }
    }

    function applyRGBSplit(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            addCoreControls(layer, strength, speed, duration);
            addFill(layer, [1, 1, 1]);
            addGlow(layer, 0.65, 14);
            makeRGBGhost(layer, "Red", [1, 0.04, 0.02], -1, 1);
            makeRGBGhost(layer, "Cyan", [0.04, 0.86, 1], 1, -1);
        }
    }

    function applySliceJitter(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            addCoreControls(layer, strength, speed, duration);
            setExpression(getTransform(layer, "ADBE Position"), positionShakeExpression(0.16));
            setExpression(getTransform(layer, "ADBE Opacity"), opacityFlickerExpression(0.62));
            addTurbulentDisplace(layer, Math.min(46, strength * 0.62), 14);
            addWaveWarp(layer, Math.min(28, strength * 0.32), 42);
            addPosterizeTime(layer, 12);
            addNoise(layer, Math.min(45, strength * 0.5));
            makeRGBGhost(layer, "Slice Red", [1, 0.08, 0.04], -0.55, 0.5);
        }
    }

    function applyImpactTitle(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            addCoreControls(layer, strength, speed, duration);
            setExpression(getTransform(layer, "ADBE Scale"), impactScaleExpression());
            setExpression(getTransform(layer, "ADBE Position"), positionShakeExpression(0.08));
            addFill(layer, [1, 1, 1]);
            addGlow(layer, 1.75, 42);
            addNoise(layer, Math.min(35, strength * 0.36));
            makeTextGhost(layer, "Impact Echo", [0.25, 0.85, 1], 0.35, 24);
        }
    }

    function applyEchoTrail(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            addCoreControls(layer, strength, speed, duration);
            addFill(layer, [1, 1, 1]);
            addGlow(layer, 0.85, 20);
            makeEchoLayer(layer, 1, [0.25, 0.92, 1], 34);
            makeEchoLayer(layer, 2, [1, 0.22, 0.72], 22);
            makeEchoLayer(layer, 3, [0.9, 1, 0.25], 14);
        }
    }

    function applyBeatLyrics(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        var comp = getComp();
        var hasAudioAmplitude = findLayerByName(comp, "Audio Amplitude") !== null;
        if (!hasAudioAmplitude) {
            var convert = confirm("No 'Audio Amplitude' layer was found.\n\nIf you selected an audio layer too, click OK to run AE's 'Convert Audio to Keyframes'.\nIf not, click Cancel and create it later.");
            if (convert) {
                try {
                    app.executeCommand(app.findMenuCommandId("Convert Audio to Keyframes"));
                } catch (err) {
                    alert("Could not run Convert Audio to Keyframes.\nSelect an audio layer, then use Animation > Keyframe Assistant > Convert Audio to Keyframes.");
                }
            }
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            addCoreControls(layer, strength, speed, duration);
            setExpression(getTransform(layer, "ADBE Scale"), beatScaleExpression());
            setExpression(getTransform(layer, "ADBE Opacity"), beatOpacityExpression());
            addFill(layer, [1, 1, 1]);
            addGlow(layer, 1.45, 38);
        }
    }

    function makeRGBGhost(sourceLayer, label, color, direction, yMul) {
        var ghost = sourceLayer.duplicate();
        ghost.name = PREFIX + " RGB " + label + " - " + sourceLayer.name;
        ghost.moveBefore(sourceLayer);
        ghost.label = 13;
        addCoreControls(ghost, 38, 16, 0.8);
        addFill(ghost, color);
        try {
            ghost.blendingMode = BlendingMode.ADD;
        } catch (err) {
        }
        try {
            getTransform(ghost, "ADBE Opacity").setValue(34);
        } catch (err2) {
        }
        setExpression(getTransform(ghost, "ADBE Position"), rgbPositionExpression(direction, yMul));
        setExpression(getTransform(ghost, "ADBE Opacity"), opacityFlickerExpression(0.28));
    }

    function makeTextGhost(sourceLayer, label, color, direction, opacity) {
        var ghost = sourceLayer.duplicate();
        ghost.name = PREFIX + " Ghost " + label + " - " + sourceLayer.name;
        ghost.moveAfter(sourceLayer);
        ghost.label = 10;
        addCoreControls(ghost, 30, 12, 0.7);
        addFill(ghost, color);
        addBlur(ghost, 2.5);
        try {
            ghost.blendingMode = BlendingMode.ADD;
        } catch (err) {
        }
        try {
            getTransform(ghost, "ADBE Opacity").setValue(opacity);
        } catch (err2) {
        }
        setExpression(getTransform(ghost, "ADBE Position"), rgbPositionExpression(direction, 0.25));
    }

    function makeEchoLayer(sourceLayer, order, color, opacity) {
        var echo = sourceLayer.duplicate();
        echo.name = PREFIX + " Echo " + order + " - " + sourceLayer.name;
        echo.moveAfter(sourceLayer);
        echo.label = 11;
        addCoreControls(echo, 44, 8, 0.8);
        addFill(echo, color);
        addBlur(echo, order * 1.4);
        try {
            echo.blendingMode = BlendingMode.ADD;
        } catch (err) {
        }
        try {
            getTransform(echo, "ADBE Opacity").setValue(opacity);
        } catch (err2) {
        }
        setExpression(getTransform(echo, "ADBE Position"), echoPositionExpression(order));
    }

    function findLayerByName(comp, name) {
        for (var i = 1; i <= comp.numLayers; i++) {
            if (comp.layer(i).name === name) {
                return comp.layer(i);
            }
        }
        return null;
    }

    function cleanKTL() {
        var comp = getComp();
        if (!comp) {
            return;
        }

        for (var i = comp.numLayers; i >= 1; i--) {
            var layer = comp.layer(i);

            if (layer.name.indexOf(PREFIX + " RGB ") === 0 ||
                layer.name.indexOf(PREFIX + " Ghost ") === 0 ||
                layer.name.indexOf(PREFIX + " Echo ") === 0) {
                layer.remove();
                continue;
            }

            clearKTLExpression(getTextSource(layer));
            clearKTLExpression(getTransform(layer, "ADBE Position"));
            clearKTLExpression(getTransform(layer, "ADBE Scale"));
            clearKTLExpression(getTransform(layer, "ADBE Opacity"));

            var effects = effectParade(layer);
            if (!effects) {
                continue;
            }

            for (var fxIndex = effects.numProperties; fxIndex >= 1; fxIndex--) {
                var fx = effects.property(fxIndex);
                if (fx.name.indexOf(PREFIX + " ") === 0) {
                    fx.remove();
                }
            }
        }
    }

    var myPal = buildUI(thisObj);
    if (myPal instanceof Window) {
        myPal.center();
        myPal.show();
    }
})(this);
