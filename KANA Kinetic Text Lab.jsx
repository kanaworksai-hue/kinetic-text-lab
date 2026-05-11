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
    var X_BUTTON_TEXT = "Want more?";
    var X_PROMO_TEXT = "Want to learn more? Follow me";
    var ASSET_FOLDER_NAME = "KANA Kinetic Text Lab Assets";
    var LOGO_FILENAME = "kana_logo_72.png";

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
        var xBtn = promoRow.add("button", undefined, X_BUTTON_TEXT);
        xBtn.helpTip = X_PROMO_TEXT + " " + X_URL;
        xBtn.onClick = function () {
            showXPromo(X_URL);
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

        var effectsGrid = pal.add("group");
        effectsGrid.orientation = "row";
        effectsGrid.alignChildren = ["fill", "top"];
        effectsGrid.spacing = 8;
        effectsGrid.alignment = ["fill", "top"];

        var leftColumn = effectsGrid.add("group");
        leftColumn.orientation = "column";
        leftColumn.alignChildren = ["fill", "top"];
        leftColumn.spacing = 6;
        leftColumn.alignment = ["fill", "top"];

        var rightColumn = effectsGrid.add("group");
        rightColumn.orientation = "column";
        rightColumn.alignChildren = ["fill", "top"];
        rightColumn.spacing = 6;
        rightColumn.alignment = ["fill", "top"];

        var revealPanel = leftColumn.add("panel", undefined, "Reveal");
        revealPanel.orientation = "column";
        revealPanel.alignChildren = ["fill", "top"];
        revealPanel.margins = 8;

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

        var stylePanel = rightColumn.add("panel", undefined, "Style");
        stylePanel.orientation = "column";
        stylePanel.alignChildren = ["fill", "top"];
        stylePanel.margins = 8;

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

        var styleRow3 = stylePanel.add("group");
        styleRow3.orientation = "row";
        styleRow3.alignChildren = ["fill", "top"];
        var tearBtn = styleRow3.add("button", undefined, "Tear Shift");
        var edmBtn = styleRow3.add("button", undefined, "EDM Pulse");

        var styleRow4 = stylePanel.add("group");
        styleRow4.orientation = "row";
        styleRow4.alignChildren = ["fill", "top"];
        var twistBtn = styleRow4.add("button", undefined, "Cute Roll");
        var danceBtn = styleRow4.add("button", undefined, "Dance");

        var motionPanel = leftColumn.add("panel", undefined, "Motion");
        motionPanel.orientation = "column";
        motionPanel.alignChildren = ["fill", "top"];
        motionPanel.margins = 8;

        var motionRow = motionPanel.add("group");
        motionRow.orientation = "row";
        motionRow.alignChildren = ["fill", "top"];
        var impactBtn = motionRow.add("button", undefined, "Impact Title");
        var echoBtn = motionRow.add("button", undefined, "Echo Trail");

        var motionRow2 = motionPanel.add("group");
        motionRow2.orientation = "row";
        motionRow2.alignChildren = ["fill", "top"];
        var knifeBtn = motionRow2.add("button", undefined, "Knife Shatter");

        var motionRow3 = motionPanel.add("group");
        motionRow3.orientation = "row";
        motionRow3.alignChildren = ["fill", "top"];
        var echoBurstBtn = motionRow3.add("button", undefined, "Echo Burst");
        var mischiefBtn = motionRow3.add("button", undefined, "Mischief Text");

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

        tearBtn.onClick = function () {
            runWithUndo("KTL Tear Shift", function () {
                applyTearShift(strength(), speed(), duration());
            });
        };

        edmBtn.onClick = function () {
            runWithUndo("KTL EDM Pulse", function () {
                applyEDMPulse(strength(), speed(), duration());
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

        knifeBtn.onClick = function () {
            runWithUndo("KTL Knife Shatter", function () {
                applyKnifeShatter(strength(), speed(), duration());
            });
        };

        echoBurstBtn.onClick = function () {
            runWithUndo("KTL Echo Burst", function () {
                applyEchoBurst(strength(), speed(), duration());
            });
        };

        mischiefBtn.onClick = function () {
            runWithUndo("KTL Mischief Text", function () {
                applyMischiefText(strength(), speed(), duration());
            });
        };

        twistBtn.onClick = function () {
            runWithUndo("KTL Cute Roll", function () {
                applyTwistWarp(strength(), speed(), duration());
            });
        };

        danceBtn.onClick = function () {
            runWithUndo("KTL Dance", function () {
                applyDance(strength(), speed(), duration());
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

    function showXPromo(url) {
        alert(getXPromoMessage(url));
    }

    function getXPromoMessage(url) {
        return X_PROMO_TEXT + "\n" + url;
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

    function quoteForExpression(text) {
        return text.toString().replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
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
        return fill;
    }

    function addGlow(layer, intensity, radius) {
        var glow = addOrGetEffect(layer, "ADBE Glow", PREFIX + " Glow");
        setEffectValue(glow, 3, intensity);
        setEffectValue(glow, 4, radius);
        return glow;
    }

    function addNoise(layer, amount) {
        var noise = addOrGetEffect(layer, "ADBE Noise", PREFIX + " Noise");
        setEffectValue(noise, 1, amount);
        return noise;
    }

    function addPosterizeTime(layer, fps) {
        var posterize = addOrGetEffect(layer, "ADBE Posterize Time", PREFIX + " Stutter FPS");
        setEffectValue(posterize, 1, fps);
        return posterize;
    }

    function addTurbulentDisplace(layer, amount, size) {
        var warp = addOrGetEffect(layer, "ADBE Turbulent Displace", PREFIX + " Digital Warp");
        setEffectValue(warp, 2, amount);
        setEffectValue(warp, 3, size);
        return warp;
    }

    function addWaveWarp(layer, height, width) {
        var wave = addOrGetEffect(layer, "ADBE Wave Warp", PREFIX + " Signal Wave");
        setEffectValue(wave, 2, height);
        setEffectValue(wave, 3, width);
        return wave;
    }

    function addGrowBounds(layer, pixels) {
        var grow = addOrGetEffect(layer, "ADBE GROW BOUNDS", PREFIX + " Grow Bounds");
        setEffectValue(grow, 1, pixels);
        return grow;
    }

    function addVenetian(layer, width) {
        var blinds = addOrGetEffect(layer, "ADBE Venetian Blinds", PREFIX + " Scanlines");
        setEffectValue(blinds, 3, width);
        return blinds;
    }

    function addBlur(layer, amount) {
        var blur = addOrGetEffect(layer, "ADBE Gaussian Blur 2", PREFIX + " Soft Blur");
        setEffectValue(blur, 1, amount);
        setEffectValue(blur, 3, true);
        return blur;
    }

    function addDirectionalBlur(layer, direction, length) {
        var blur = addOrGetEffect(layer, "ADBE Motion Blur", PREFIX + " Motion Blur");
        setEffectValue(blur, 1, direction);
        setEffectValue(blur, 2, length);
        return blur;
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

    function getRotation(layer) {
        return getTransform(layer, "ADBE Rotate Z") || getTransform(layer, "ADBE Rotation");
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
        return "// KTL type on realistic cursor\n" +
            textOriginalLine() +
            "var dur = Math.max(0.08, effect('KTL Reveal Seconds')(1));\n" +
            "var seed = effect('KTL Seed')(1);\n" +
            "var progress = clamp((time - inPoint) / dur, 0, 1);\n" +
            "var units = [];\n" +
            "var total = 0;\n" +
            "for (var i = 0; i < original.length; i++) {\n" +
            "  seedRandom(seed + i * 97, true);\n" +
            "  var ch = original.charAt(i);\n" +
            "  var u = (ch == ' ') ? random(0.35, 0.58) : random(0.72, 1.38);\n" +
            "  if ('.,!?;:，。！？；：、'.indexOf(ch) >= 0) { u += random(0.55, 1.05); }\n" +
            "  units.push(u);\n" +
            "  total += u;\n" +
            "}\n" +
            "var target = total * progress;\n" +
            "var acc = 0;\n" +
            "var count = 0;\n" +
            "for (var j = 0; j < units.length; j++) {\n" +
            "  acc += units[j];\n" +
            "  if (target >= acc || progress >= 1) { count = j + 1; }\n" +
            "}\n" +
            "var typed = original.substr(0, count);\n" +
            "var blink = Math.floor((time - inPoint) * 3.2) % 2 == 0;\n" +
            "typed + (blink ? '|' : '');";
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
        return "// KTL readable trailer impact scale\n" +
            "var dur = Math.max(0.25, effect('KTL Reveal Seconds')(1));\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var t = Math.max(0, time - inPoint);\n" +
            "var hit = Math.min(0.56, dur * 0.68);\n" +
            "var p = clamp(t / hit, 0, 1);\n" +
            "var peak = 112 + Math.min(24, strength * 0.22);\n" +
            "var s;\n" +
            "if (p < 0.18) { s = ease(p, 0, 0.18, 62, peak); }\n" +
            "else if (p < 0.34) { s = ease(p, 0.18, 0.34, peak, 96); }\n" +
            "else { s = 100 + Math.sin((p - 0.34) * Math.PI * 4.2) * Math.exp(-(p - 0.34) * 4.2) * Math.min(8, strength * 0.08); }\n" +
            "(value.length == 3) ? [value[0] * s / 100, value[1] * s / 100, value[2]] : [value[0] * s / 100, value[1] * s / 100];";
    }

    function impactShakeExpression() {
        return "// KTL readable trailer impact shake\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var seed = effect('KTL Seed')(1);\n" +
            "var t = Math.max(0, time - inPoint);\n" +
            "var amp = Math.min(14, strength * 0.14) * Math.exp(-t * 8.8);\n" +
            "seedRandom(seed + Math.floor(t * 48), true);\n" +
            "var dx = random(-amp, amp);\n" +
            "var dy = random(-amp * 0.52, amp * 0.52);\n" +
            "(value.length == 3) ? value + [dx, dy, 0] : value + [dx, dy];";
    }

    function echoSourceMotionExpression() {
        return "// KTL echo trail source motion\n" +
            "var dur = Math.max(0.2, effect('KTL Reveal Seconds')(1));\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var p = clamp((time - inPoint) / dur, 0, 1);\n" +
            "var easeOut = 1 - Math.pow(1 - p, 3);\n" +
            "var travel = Math.min(260, strength * 2.6);\n" +
            "var x = -travel * (1 - easeOut);\n" +
            "var y = -Math.sin(p * Math.PI) * Math.min(34, strength * 0.32);\n" +
            "(value.length == 3) ? value + [x, y, 0] : value + [x, y];";
    }

    function echoTrailPositionExpression(sourceName, order) {
        return "// KTL delayed echo trail\n" +
            "var src = thisComp.layer(\"" + quoteForExpression(sourceName) + "\");\n" +
            "var delay = Math.max(thisComp.frameDuration * 1.5, effect('KTL Reveal Seconds')(1) * 0.045) * " + order + ";\n" +
            "var p = src.transform.position.valueAtTime(time - delay);\n" +
            "var drift = effect('KTL Strength')(1) * " + order + " * 0.035;\n" +
            "if (p.length == 3) { [p[0] - drift, p[1] + drift * 0.35, p[2]]; } else { [p[0] - drift, p[1] + drift * 0.35]; }";
    }

    function echoTrailOpacityExpression(order) {
        return "// KTL echo trail opacity\n" +
            "var dur = Math.max(0.2, effect('KTL Reveal Seconds')(1));\n" +
            "var p = clamp((time - inPoint) / dur, 0, 1);\n" +
            "var entrance = ease(p, 0, 0.18, 0, 1);\n" +
            "value * entrance * Math.pow(0.84, " + order + ");";
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

    function tearStripPositionExpression(order, direction) {
        return "// KTL tear strip position\n" +
            "var amp = effect('KTL Strength')(1) * (0.18 + " + order + " * 0.055);\n" +
            "var spd = effect('KTL Speed')(1);\n" +
            "var seed = effect('KTL Seed')(1);\n" +
            "seedRandom(Math.floor(time * spd * 2.3) + seed + index * 17 + " + order + " * 101, true);\n" +
            "var gate = random(0, 1) > 0.36 ? 1 : 0;\n" +
            "var dx = random(amp * 0.25, amp) * " + direction + " * gate;\n" +
            "var dy = random(-amp * 0.18, amp * 0.18) * gate;\n" +
            "(value.length == 3) ? value + [dx, dy, 0] : value + [dx, dy];";
    }

    function offsetSlamPositionExpression() {
        return "// KTL offset slam\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var spd = effect('KTL Speed')(1);\n" +
            "var seed = effect('KTL Seed')(1);\n" +
            "var beat = Math.floor((time - inPoint) * spd * 1.6);\n" +
            "seedRandom(beat + seed + index * 29, true);\n" +
            "var hit = random(0, 1) > 0.42 ? 1 : 0;\n" +
            "var dx = random(-strength * 0.85, strength * 0.85) * hit;\n" +
            "var dy = random(-strength * 0.28, strength * 0.28) * hit;\n" +
            "(value.length == 3) ? value + [dx, dy, 0] : value + [dx, dy];";
    }

    function signalCrashOpacityExpression() {
        return "// KTL signal crash opacity\n" +
            "var spd = effect('KTL Speed')(1);\n" +
            "var seed = effect('KTL Seed')(1);\n" +
            "seedRandom(Math.floor(time * spd * 5.5) + seed + index * 41, true);\n" +
            "var r = random(0, 1);\n" +
            "r < 0.12 ? 0 : (r < 0.32 ? random(18, 62) : value);";
    }

    function edmScaleExpression() {
        return "// KTL readable EDM pulse scale\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var spd = effect('KTL Speed')(1);\n" +
            "var t = Math.max(0, time - inPoint) * spd;\n" +
            "var phase = t - Math.floor(t);\n" +
            "var kick = Math.exp(-phase * 9) * strength * 0.18;\n" +
            "var wobble = Math.sin(t * Math.PI * 2) * strength * 0.035;\n" +
            "var add = kick + wobble;\n" +
            "(value.length == 3) ? value + [add, add, 0] : value + [add, add];";
    }

    function edmOpacityExpression() {
        return "// KTL EDM core micro flicker\n" +
            "var spd = effect('KTL Speed')(1);\n" +
            "var seed = effect('KTL Seed')(1);\n" +
            "seedRandom(Math.floor(time * spd * 4) + seed + index * 53, true);\n" +
            "random(0, 1) > 0.1 ? value : value * random(0.82, 0.94);";
    }

    function edmGlowScaleExpression(boost) {
        return "// KTL EDM neon aura scale\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var spd = effect('KTL Speed')(1);\n" +
            "var t = Math.max(0, time - inPoint) * spd;\n" +
            "var phase = t - Math.floor(t);\n" +
            "var kick = Math.exp(-phase * 8.2) * strength * 0.18;\n" +
            "var breathe = Math.sin(t * Math.PI * 2 + " + boost + ") * strength * 0.035;\n" +
            "var s = 1 + (" + boost + " + kick + breathe) / 100;\n" +
            "(value.length == 3) ? [value[0] * s, value[1] * s, value[2]] : [value[0] * s, value[1] * s];";
    }

    function edmGlowOpacityExpression(baseOpacity, pulseAmount) {
        return "// KTL EDM neon aura opacity\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var spd = effect('KTL Speed')(1);\n" +
            "var t = Math.max(0, time - inPoint) * spd;\n" +
            "var phase = t - Math.floor(t);\n" +
            "var kick = Math.exp(-phase * 7.8) * Math.min(" + pulseAmount + ", strength * 0.28);\n" +
            "var strobe = (Math.sin(t * Math.PI * 2) + 1) * 0.5 * " + pulseAmount + " * 0.22;\n" +
            "clamp(" + baseOpacity + " + kick + strobe, 0, 78);";
    }

    function dancePositionExpression(xOffset, yOffset) {
        return "// KTL dance position\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var spd = effect('KTL Speed')(1) * 0.42;\n" +
            "var t = Math.max(0, time - inPoint) * spd;\n" +
            "var phase = t - Math.floor(t);\n" +
            "var kick = Math.exp(-phase * 8.5);\n" +
            "var bob = Math.abs(Math.sin(t * Math.PI * 2));\n" +
            "var dx = Math.sin(t * Math.PI * 1.04) * strength * 0.08 + kick * strength * 0.07 + " + xOffset + ";\n" +
            "var dy = -bob * strength * 0.11 - kick * strength * 0.08 + " + yOffset + ";\n" +
            "(value.length == 3) ? value + [dx, dy, 0] : value + [dx, dy];";
    }

    function danceScaleExpression(scaleBoost) {
        return "// KTL dance squash scale\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var spd = effect('KTL Speed')(1) * 0.42;\n" +
            "var t = Math.max(0, time - inPoint) * spd;\n" +
            "var phase = t - Math.floor(t);\n" +
            "var kick = Math.exp(-phase * 8.5);\n" +
            "var sway = Math.sin(t * Math.PI * 2);\n" +
            "var x = 1 + " + scaleBoost + " / 100 + kick * Math.min(0.11, strength * 0.0019) + sway * 0.025;\n" +
            "var y = 1 + " + scaleBoost + " / 100 - kick * Math.min(0.09, strength * 0.0016) - sway * 0.018;\n" +
            "(value.length == 3) ? [value[0] * x, value[1] * y, value[2]] : [value[0] * x, value[1] * y];";
    }

    function danceRotationExpression(direction) {
        return "// KTL dance rotation\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var spd = effect('KTL Speed')(1) * 0.42;\n" +
            "var t = Math.max(0, time - inPoint) * spd;\n" +
            "var phase = t - Math.floor(t);\n" +
            "var kick = Math.exp(-phase * 8.5);\n" +
            "var tilt = Math.sin(t * Math.PI * 2) * Math.min(5.2, strength * 0.055) + kick * Math.min(4.2, strength * 0.045) * " + direction + ";\n" +
            "value + tilt;";
    }

    function danceLetterBounceAmountExpression(phaseOffset) {
        return "// KTL dance letter bounce amount\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var spd = effect('KTL Speed')(1) * 0.42;\n" +
            "var t = Math.max(0, time - inPoint) * spd + " + phaseOffset + ";\n" +
            "var wave = Math.sin(t * Math.PI * 2 - textIndex * 0.62);\n" +
            "var hop = Math.max(0, wave);\n" +
            "var phase = t - Math.floor(t);\n" +
            "var kick = Math.exp(-phase * 9);\n" +
            "clamp(hop * 72 + kick * 36, 0, 100);";
    }

    function danceSmearAmountExpression(phaseOffset) {
        return "// KTL dance smear amount\n" +
            "var spd = effect('KTL Speed')(1) * 0.42;\n" +
            "var t = Math.max(0, time - inPoint) * spd * 0.18 + " + phaseOffset + ";\n" +
            "var p = t - Math.floor(t);\n" +
            "var hit = (p < 0.18) ? Math.sin(p / 0.18 * Math.PI) : 0;\n" +
            "var center = linear(p, 0, 0.18, 1, textTotal);\n" +
            "var falloff = Math.max(0, 1 - Math.abs(textIndex - center) / 2.4);\n" +
            "clamp(hit * falloff * 88, 0, 100);";
    }

    function danceTwisterCompletionExpression(phaseOffset) {
        return "// KTL dance twister completion\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var spd = effect('KTL Speed')(1) * 0.42;\n" +
            "var t = Math.max(0, time - inPoint) * spd * 0.18 + " + phaseOffset + ";\n" +
            "var p = t - Math.floor(t);\n" +
            "var hit = (p < 0.18) ? Math.sin(p / 0.18 * Math.PI) : 0;\n" +
            "hit * clamp(strength / 150, 0.18, 0.42);";
    }

    function danceTwisterCenterExpression(center, span, phaseOffset) {
        return "// KTL dance twister center\n" +
            "var spd = effect('KTL Speed')(1) * 0.42;\n" +
            "var t = Math.max(0, time - inPoint) * spd * 0.18 + " + phaseOffset + ";\n" +
            "var p = t - Math.floor(t);\n" +
            "var travel = (p < 0.18) ? linear(p, 0, 0.18, -" + span + ", " + span + ") : " + span + ";\n" +
            "[" + center[0] + " + travel, " + center[1] + " + Math.sin(p * Math.PI * 2) * " + (span * 0.08) + "];";
    }

    function danceTwisterAxisExpression(phaseOffset) {
        return "// KTL dance twister axis\n" +
            "var spd = effect('KTL Speed')(1) * 0.42;\n" +
            "var t = Math.max(0, time - inPoint) * spd * 0.18 + " + phaseOffset + ";\n" +
            "var p = t - Math.floor(t);\n" +
            "90 + Math.sin(p * Math.PI * 2) * 8;";
    }

    function danceBurstOpacityExpression(phaseOffset, maxOpacity) {
        return "// KTL dance burst opacity\n" +
            "var spd = effect('KTL Speed')(1) * 0.42;\n" +
            "var t = Math.max(0, time - inPoint) * spd * 0.18 + " + phaseOffset + ";\n" +
            "var p = t - Math.floor(t);\n" +
            "var flash = (p < 0.18) ? Math.sin(p / 0.18 * Math.PI) : 0;\n" +
            "flash * " + maxOpacity + ";";
    }

    function danceBurstScaleExpression(baseScale, phaseOffset) {
        return "// KTL dance burst scale\n" +
            "var spd = effect('KTL Speed')(1) * 0.42;\n" +
            "var t = Math.max(0, time - inPoint) * spd * 0.18 + " + phaseOffset + ";\n" +
            "var p = t - Math.floor(t);\n" +
            "var flash = (p < 0.22) ? Math.sin(p / 0.22 * Math.PI) : 0;\n" +
            "var s = " + baseScale + " + flash * 24;\n" +
            "[s, s];";
    }

    function danceBurstRotationExpression(phaseOffset) {
        return "// KTL dance burst rotation\n" +
            "var spd = effect('KTL Speed')(1) * 0.42;\n" +
            "var t = Math.max(0, time - inPoint) * spd * 0.18 + " + phaseOffset + ";\n" +
            "value + Math.sin(t * Math.PI * 2) * 5;";
    }

    function echoBurstPositionExpression(order, xDir, yDir) {
        return "// KTL echo burst position\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var spd = effect('KTL Speed')(1);\n" +
            "var t = Math.max(0, time - inPoint);\n" +
            "var pulse = (1 - Math.exp(-t * (2.8 + " + order + "))) * Math.exp(-t * 0.7);\n" +
            "var drift = strength * " + order + " * 0.16 * pulse;\n" +
            "var wob = Math.sin((time - inPoint) * spd + " + order + ") * strength * 0.035;\n" +
            "(value.length == 3) ? value + [drift * " + xDir + " + wob, drift * " + yDir + ", 0] : value + [drift * " + xDir + " + wob, drift * " + yDir + "];";
    }

    function echoBurstScaleExpression(order) {
        return "// KTL echo burst scale\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var t = Math.max(0, time - inPoint);\n" +
            "var add = Math.exp(-t * 1.7) * strength * " + order + " * 0.08;\n" +
            "(value.length == 3) ? value + [add, add, 0] : value + [add, add];";
    }

    function mischiefTextExpression() {
        return "// KTL mischief text\n" +
            textOriginalLine() +
            "var chars = '*!?~<>_';\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var spd = effect('KTL Speed')(1);\n" +
            "var seed = effect('KTL Seed')(1);\n" +
            "var chance = clamp(strength / 230, 0.04, 0.38);\n" +
            "var out = '';\n" +
            "for (var i = 0; i < original.length; i++) {\n" +
            "  var c = original.charAt(i);\n" +
            "  if (c == ' ') { out += ' '; continue; }\n" +
            "  seedRandom(i * 97 + Math.floor(time * spd * 3.7) + seed, true);\n" +
            "  var r = random(0, 1);\n" +
            "  if (r < chance * 0.28) { out += chars.charAt(Math.floor(random(chars.length))); }\n" +
            "  else if (r < chance * 0.62) { out += c.toUpperCase(); }\n" +
            "  else if (r < chance) { out += c.toLowerCase(); }\n" +
            "  else { out += c; }\n" +
            "}\n" +
            "out;";
    }

    function mischiefRotationExpression(multiplier) {
        return "// KTL mischief rotation\n" +
            "var amp = effect('KTL Strength')(1) * " + multiplier + ";\n" +
            "var spd = effect('KTL Speed')(1);\n" +
            "var seed = effect('KTL Seed')(1);\n" +
            "seedRandom(Math.floor(time * spd * 2.2) + seed + index * 13, true);\n" +
            "value + random(-amp, amp);";
    }

    function mischiefScaleExpression() {
        return "// KTL mischief scale\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var spd = effect('KTL Speed')(1);\n" +
            "var b = Math.sin((time - inPoint) * spd * 2.4) * strength * 0.08;\n" +
            "(value.length == 3) ? value + [b, -b * 0.4, 0] : value + [b, -b * 0.4];";
    }

    function threeDRotationExpression() {
        return "// KTL 3D text rotation\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var spd = effect('KTL Speed')(1);\n" +
            "var t = Math.max(0, time - inPoint);\n" +
            "value + Math.sin(t * spd * 0.62) * Math.min(28, strength * 0.2);";
    }

    function handwritingPositionExpression() {
        return "// KTL handwriting ink drift\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var spd = effect('KTL Speed')(1);\n" +
            "var amp = Math.min(7, strength * 0.08);\n" +
            "var x = Math.sin((time - inPoint) * spd * 1.7 + index) * amp;\n" +
            "var y = Math.cos((time - inPoint) * spd * 2.1 + index * 0.4) * amp * 0.45;\n" +
            "(value.length == 3) ? value + [x, y, 0] : value + [x, y];";
    }

    function sandGhostPositionExpression(order, xDir, yDir, reverse) {
        return "// KTL sand drift\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var dur = Math.max(0.08, effect('KTL Reveal Seconds')(1));\n" +
            "var spd = effect('KTL Speed')(1);\n" +
            "var p = clamp((time - inPoint) / dur, 0, 1);\n" +
            "var ease = " + (reverse ? "p" : "(1 - p)") + ";\n" +
            "var drift = strength * " + order + " * 0.74 * ease;\n" +
            "var wob = Math.sin((time - inPoint) * spd * 2 + " + order + ") * strength * 0.08;\n" +
            "(value.length == 3) ? value + [drift * " + xDir + " + wob, drift * " + yDir + ", 0] : value + [drift * " + xDir + " + wob, drift * " + yDir + "];";
    }

    function sandGhostOpacityExpression(reverse, phase) {
        return "// KTL sand opacity\n" +
            "var dur = Math.max(0.08, effect('KTL Reveal Seconds')(1));\n" +
            "var p = clamp((time - inPoint) / dur, 0, 1);\n" +
            "var wave = " + (reverse ? "p" : "(1 - p)") + ";\n" +
            "var flicker = Math.sin((time - inPoint) * effect('KTL Speed')(1) * 3 + " + phase + ") * 12;\n" +
            "clamp(value * wave + flicker, 0, 78);";
    }

    function kineticTypePositionExpression() {
        return "// KTL kinetic typography position\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var spd = effect('KTL Speed')(1);\n" +
            "var t = Math.max(0, time - inPoint);\n" +
            "var punch = Math.exp(-t * 4.5) * Math.sin(t * spd * 2.2) * strength * 0.38;\n" +
            "var slide = Math.exp(-t * 3.2) * strength * -1.25;\n" +
            "(value.length == 3) ? value + [slide + punch, punch * -0.35, 0] : value + [slide + punch, punch * -0.35];";
    }

    function kineticTypeScaleExpression() {
        return "// KTL kinetic typography scale\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var spd = effect('KTL Speed')(1);\n" +
            "var t = Math.max(0, time - inPoint);\n" +
            "var hit = Math.exp(-t * 5.8) * Math.sin(t * spd * 2.9) * strength * 0.45;\n" +
            "(value.length == 3) ? value + [hit, hit * 0.72, 0] : value + [hit, hit * 0.72];";
    }

    function kineticTypeRotationExpression() {
        return "// KTL kinetic typography rotation\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var spd = effect('KTL Speed')(1);\n" +
            "var t = Math.max(0, time - inPoint);\n" +
            "value + Math.exp(-t * 4.8) * Math.sin(t * spd * 2.4) * Math.min(18, strength * 0.14);";
    }

    function twistRotationExpression() {
        return "// KTL cute roll rotation\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var spd = effect('KTL Speed')(1);\n" +
            "var t = time - inPoint;\n" +
            "var roll = Math.sin(t * spd * 0.72) * Math.min(4.5, strength * 0.04);\n" +
            "var wiggle = Math.sin(t * spd * 1.25 + 0.8) * Math.min(1.5, strength * 0.014);\n" +
            "value + roll + wiggle;";
    }

    function twistScaleExpression() {
        return "// KTL cute roll squash\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var spd = effect('KTL Speed')(1);\n" +
            "var t = time - inPoint;\n" +
            "var wave = Math.sin(t * spd * 0.72);\n" +
            "var squash = wave * Math.min(7, strength * 0.065);\n" +
            "var hop = Math.abs(wave) * Math.min(3, strength * 0.026);\n" +
            "(value.length == 3) ? value + [squash, -squash * 0.45 + hop, 0] : value + [squash, -squash * 0.45 + hop];";
    }

    function cuteRollPositionExpression(multiplier) {
        return "// KTL cute roll hop\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var spd = effect('KTL Speed')(1);\n" +
            "var t = time - inPoint;\n" +
            "var wave = Math.sin(t * spd * 0.72 + " + multiplier + ");\n" +
            "var hop = Math.abs(wave) * Math.min(5, strength * 0.045);\n" +
            "var sway = Math.sin(t * spd * 0.42 + " + multiplier + ") * Math.min(3, strength * 0.028);\n" +
            "(value.length == 3) ? value + [sway, -hop, 0] : value + [sway, -hop];";
    }

    function cuteRollYRotationExpression(phase) {
        return "// KTL cute roll y flip\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var spd = effect('KTL Speed')(1);\n" +
            "var t = time - inPoint;\n" +
            "value + Math.sin(t * spd * 0.95 + " + phase + ") * Math.min(18, strength * 0.16);";
    }

    function cuteRollLetterAmountExpression(phase) {
        return "// KTL cute roll sequential flip\n" +
            "var dur = Math.max(0.2, effect('KTL Reveal Seconds')(1));\n" +
            "var count = Math.max(textTotal, 1);\n" +
            "var flipDur = Math.max(thisComp.frameDuration * 6, dur / Math.max(2.8, Math.min(7.5, count * 0.72)));\n" +
            "flipDur = Math.min(flipDur, dur);\n" +
            "var gap = (count > 1) ? (dur - flipDur) / (count - 1) : 0;\n" +
            "var local = time - inPoint - (textIndex - 1) * gap + " + phase + ";\n" +
            "var p = clamp(local / flipDur, 0, 1);\n" +
            "p = p * p * (3 - 2 * p);\n" +
            "p * 100;";
    }

    function cuteRollPulseAmountExpression(phase) {
        return "// KTL cute roll sequential pulse\n" +
            "var dur = Math.max(0.2, effect('KTL Reveal Seconds')(1));\n" +
            "var count = Math.max(textTotal, 1);\n" +
            "var flipDur = Math.max(thisComp.frameDuration * 6, dur / Math.max(2.8, Math.min(7.5, count * 0.72)));\n" +
            "flipDur = Math.min(flipDur, dur);\n" +
            "var gap = (count > 1) ? (dur - flipDur) / (count - 1) : 0;\n" +
            "var local = time - inPoint - (textIndex - 1) * gap + " + phase + ";\n" +
            "var p = clamp(local / flipDur, 0, 1);\n" +
            "var active = (local >= 0 && local <= flipDur) ? 1 : 0;\n" +
            "Math.sin(p * Math.PI) * 100 * active;";
    }

    function cuteRollWaveAmountExpression(phase) {
        return "// KTL cute roll per-letter wave\n" +
            "var dur = Math.max(0.2, effect('KTL Reveal Seconds')(1));\n" +
            "var count = Math.max(textTotal, 1);\n" +
            "var pulseDur = Math.max(thisComp.frameDuration * 6, dur / Math.max(2.25, Math.min(4.2, count * 0.42)));\n" +
            "pulseDur = Math.min(pulseDur, dur);\n" +
            "var gap = (count > 1) ? (dur - pulseDur) / (count - 1) : 0;\n" +
            "var local = time - inPoint - (textIndex - 1) * gap + " + phase + ";\n" +
            "var p = clamp(local / pulseDur, 0, 1);\n" +
            "var active = (local >= 0 && local <= pulseDur) ? 1 : 0;\n" +
            "var wave = Math.sin(p * Math.PI);\n" +
            "Math.pow(wave, 0.72) * 100 * active;";
    }

    function cuteRollWaveFlipAmountExpression(phase) {
        return "// KTL cute roll per-letter flip side\n" +
            "var dur = Math.max(0.2, effect('KTL Reveal Seconds')(1));\n" +
            "var count = Math.max(textTotal, 1);\n" +
            "var pulseDur = Math.max(thisComp.frameDuration * 6, dur / Math.max(2.25, Math.min(4.2, count * 0.42)));\n" +
            "pulseDur = Math.min(pulseDur, dur);\n" +
            "var gap = (count > 1) ? (dur - pulseDur) / (count - 1) : 0;\n" +
            "var local = time - inPoint - (textIndex - 1) * gap + " + phase + ";\n" +
            "var p = clamp(local / pulseDur, 0, 1);\n" +
            "var active = (local >= 0 && local <= pulseDur) ? 1 : 0;\n" +
            "Math.sin(p * Math.PI * 2) * 50 * active;";
    }

    function cuteRollTwisterCompletionExpression(phase) {
        return "// KTL cute roll twister completion\n" +
            "var dur = Math.max(0.2, effect('KTL Reveal Seconds')(1));\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var p = clamp((time - inPoint) / dur, 0, 1);\n" +
            "var env = Math.sin(p * Math.PI);\n" +
            "var wobble = 0.78 + 0.22 * Math.sin(p * Math.PI * 3 + " + phase + ");\n" +
            "var amount = clamp(strength / 90, 0.28, 0.68);\n" +
            "env * wobble * amount * 100;";
    }

    function cuteRollTwisterAxisExpression(phase) {
        return "// KTL cute roll twister axis\n" +
            "var dur = Math.max(0.2, effect('KTL Reveal Seconds')(1));\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var p = clamp((time - inPoint) / dur, 0, 1);\n" +
            "var env = Math.sin(p * Math.PI);\n" +
            "90 + Math.sin(p * Math.PI * 2 + " + phase + ") * env * Math.min(10, strength * 0.08);";
    }

    function cuteRollTwisterCenterExpression(phase, span) {
        return "// KTL cute roll moving twist center\n" +
            "var dur = Math.max(0.2, effect('KTL Reveal Seconds')(1));\n" +
            "var p = clamp((time - inPoint) / dur, 0, 1);\n" +
            "var eased = p * p * (3 - 2 * p);\n" +
            "var x = linear(eased, 0, 1, -" + span + ", " + span + ");\n" +
            "var y = Math.sin(p * Math.PI * 2 + " + phase + ") * Math.min(14, " + span + " * 0.035);\n" +
            "value + [x, y];";
    }

    function cuteRollLayerTiltExpression(phase) {
        return "// KTL cute roll whole-word tilt\n" +
            "var dur = Math.max(0.2, effect('KTL Reveal Seconds')(1));\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var p = clamp((time - inPoint) / dur, 0, 1);\n" +
            "var env = Math.sin(p * Math.PI);\n" +
            "value + Math.sin(p * Math.PI * 2 + " + phase + ") * env * Math.min(7, strength * 0.07);";
    }

    function cuteRollLayerScaleExpression(phase) {
        return "// KTL cute roll soft squeeze\n" +
            "var dur = Math.max(0.2, effect('KTL Reveal Seconds')(1));\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var p = clamp((time - inPoint) / dur, 0, 1);\n" +
            "var env = Math.sin(p * Math.PI);\n" +
            "var squeeze = env * Math.min(5, strength * 0.045);\n" +
            "(value.length == 3) ? [value[0] + squeeze * 0.35, value[1] - squeeze, value[2]] : [value[0] + squeeze * 0.35, value[1] - squeeze];";
    }

    function cloneSplitPositionExpression(order, xDir, yDir) {
        return "// KTL clone split position\n" +
            "var strength = effect('KTL Strength')(1);\n" +
            "var spd = effect('KTL Speed')(1);\n" +
            "var seed = effect('KTL Seed')(1);\n" +
            "var beat = Math.floor((time - inPoint) * spd * 1.2);\n" +
            "seedRandom(seed + beat + index * 19 + " + order + " * 41, true);\n" +
            "var gate = random(0, 1) > 0.18 ? 1 : -0.35;\n" +
            "var drift = strength * " + order + " * 0.16 * gate;\n" +
            "var wob = Math.sin((time - inPoint) * spd * 1.6 + " + order + ") * strength * 0.045;\n" +
            "(value.length == 3) ? value + [drift * " + xDir + " + wob, drift * " + yDir + ", 0] : value + [drift * " + xDir + " + wob, drift * " + yDir + "];";
    }

    function cloneSplitOpacityExpression(order) {
        return "// KTL clone split opacity\n" +
            "var spd = effect('KTL Speed')(1);\n" +
            "var seed = effect('KTL Seed')(1);\n" +
            "seedRandom(Math.floor((time - inPoint) * spd * 2) + seed + " + order + " * 59, true);\n" +
            "random(0, 1) > 0.12 ? value : value * random(0.28, 0.7);";
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
            removeEffectByName(layer, PREFIX + " Color Fill");
            addCoreControls(layer, strength * 0.45, speed, duration);
            setExpression(getTextSource(layer), typeOnExpression());
            setPropertyValue(getTransform(layer, "ADBE Opacity"), 100);
        }
    }

    function applyScrambleLoop(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            removeEffectByName(layer, PREFIX + " Color Fill");
            addCoreControls(layer, strength, speed, duration);
            setExpression(getTextSource(layer), scrambleLoopExpression());
            setExpression(getTransform(layer, "ADBE Position"), positionShakeExpression(0.05));
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

    function applyTearShift(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            removeEffectByName(layer, PREFIX + " Color Fill");
            addCoreControls(layer, strength, speed * 1.15, duration);
            setExpression(getTransform(layer, "ADBE Position"), positionShakeExpression(0.06));
            setExpression(getTransform(layer, "ADBE Opacity"), opacityFlickerExpression(0.5));
            addGlow(layer, 0.95, 18);
            addTurbulentDisplace(layer, Math.min(52, strength * 0.7), 12);
            addWaveWarp(layer, Math.min(34, strength * 0.38), 36);
            addNoise(layer, Math.min(52, strength * 0.62));
            addPosterizeTime(layer, 12);
            makeTearStrip(layer, 1, [1, 0.05, 0.04], -1);
            makeTearStrip(layer, 2, [0.05, 0.9, 1], 1);
            makeTearStrip(layer, 3, [1, 1, 1], -1);
            makeTearStrip(layer, 4, [1, 0.12, 0.75], 1);
        }
    }

    function applyOffsetSlam(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            addCoreControls(layer, strength, speed, duration);
            setExpression(getTransform(layer, "ADBE Position"), offsetSlamPositionExpression());
            addFill(layer, [1, 1, 1]);
            addGlow(layer, 0.85, 18);
            addPosterizeTime(layer, 10);
            makeOffsetGhost(layer, "Left Punch", [1, 0.08, 0.05], -1, 0.25);
            makeOffsetGhost(layer, "Right Punch", [0.05, 0.95, 1], 1, -0.25);
        }
    }

    function applySignalCrash(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            addCoreControls(layer, strength * 1.15, speed * 1.35, duration);
            setExpression(getTransform(layer, "ADBE Position"), positionShakeExpression(0.22));
            setExpression(getTransform(layer, "ADBE Opacity"), signalCrashOpacityExpression());
            addFill(layer, [0.88, 1, 1]);
            addGlow(layer, 1.3, 34);
            addNoise(layer, Math.min(88, strength * 0.98));
            addPosterizeTime(layer, 8);
            addTurbulentDisplace(layer, Math.min(72, strength * 0.92), 9);
            addWaveWarp(layer, Math.min(46, strength * 0.58), 26);
            addVenetian(layer, 3);
            makeRGBGhost(layer, "Crash Red", [1, 0.02, 0.02], -1.35, 0.6);
            makeRGBGhost(layer, "Crash Blue", [0.02, 0.35, 1], 1.35, -0.6);
        }
    }

    function applyEDMPulse(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            addCoreControls(layer, strength, speed * 1.65, duration);
            removeEffectByName(layer, PREFIX + " Color Fill");
            removeEffectByName(layer, PREFIX + " Glow");
            removeEffectByName(layer, PREFIX + " Noise");
            setExpression(getTransform(layer, "ADBE Scale"), edmScaleExpression());
            setExpression(getTransform(layer, "ADBE Opacity"), edmOpacityExpression());
            addGrowBounds(layer, clampNumber(getTextFontSize(layer, 120) * 1.2, 70, 180, 120));
            addPosterizeTime(layer, 18);
            makeEDMNeonLayer(layer, "Dark Core", [0, 0, 0], 34, 1.4, 4, 0.25, 7, 7, false);
            makeEDMNeonLayer(layer, "Cyan Aura", [0.02, 0.95, 1], 26, 7.5, 10, 0.6, 0, 0, true);
            makeEDMNeonLayer(layer, "Magenta Aura", [1, 0.05, 0.66], 22, 11, 16, -0.55, -2, 0, true);
            makeEDMNeonLayer(layer, "Lime Spark", [0.82, 1, 0.08], 14, 4.2, 7, 0.42, 2, 0, true);
        }
    }

    function applyImpactTitle(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            var baseScale = getTransform(layer, "ADBE Scale").value;
            var basePosition = getTransform(layer, "ADBE Position").value;
            var fontSize = getTextFontSize(layer, 120);
            addCoreControls(layer, strength, speed, duration);
            removeEffectByName(layer, PREFIX + " Color Fill");
            removeEffectByName(layer, PREFIX + " Glow");
            removeEffectByName(layer, PREFIX + " Noise");
            setPropertyValue(getTransform(layer, "ADBE Opacity"), 100);
            setExpression(getTransform(layer, "ADBE Scale"), impactScaleExpression());
            setExpression(getTransform(layer, "ADBE Position"), impactShakeExpression());
            try {
                layer.motionBlur = true;
                layer.containingComp.motionBlur = true;
                layer.containingComp.shutterAngle = Math.max(layer.containingComp.shutterAngle, 180);
            } catch (motionErr) {
            }
            addGrowBounds(layer, clampNumber(fontSize * 1.4, 80, 220, 140));
            var blur = addDirectionalBlur(layer, 90, 0);
            setEffectKeyframes(blur, 2, layer.containingComp.time, layer.containingComp.time + Math.max(0.1, duration * 0.16), Math.min(18, strength * 0.2), 0);
            makeImpactSlamLayer(layer, "Shadow", [0, 0, 0], 46, baseScale, basePosition, duration, strength, 0.94, 1.12, 1.22, 2.4, 7, 7, false);
            makeImpactSlamLayer(layer, "Cyan Shock", [0.08, 0.9, 1], 28, baseScale, basePosition, duration, strength, 0.98, 1.18, 1.52, 7.5, 0, 0, true);
            makeImpactSlamLayer(layer, "Gold Shock", [1, 0.72, 0.12], 18, baseScale, basePosition, duration, strength, 1.0, 1.28, 1.78, 13, 0, 0, true);
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
            setExpression(getTransform(layer, "ADBE Position"), echoSourceMotionExpression());
            try {
                layer.motionBlur = true;
                layer.containingComp.motionBlur = true;
            } catch (motionErr) {
            }
            addGlow(layer, 0.85, 20);
            makeEchoLayer(layer, 1, [0.25, 0.92, 1], 38);
            makeEchoLayer(layer, 2, [1, 0.22, 0.72], 30);
            makeEchoLayer(layer, 3, [0.9, 1, 0.25], 23);
            makeEchoLayer(layer, 4, [0.18, 0.45, 1], 18);
            makeEchoLayer(layer, 5, [1, 0.44, 0.12], 13);
            makeEchoLayer(layer, 6, [0.55, 0.18, 1], 9);
        }
    }

    function applyKnifeShatter(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        var comp = getComp();
        if (!comp) {
            return;
        }

        var startTime = comp.time;
        var endTime = startTime + Math.max(0.25, duration);

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            addCoreControls(layer, strength, speed, duration);
            addFill(layer, [1, 1, 1]);
            addGlow(layer, 1.05, 28);
            addNoise(layer, Math.min(40, strength * 0.4));
            revealOriginalAfterShatter(layer, startTime, endTime);
            makeKnifeShards(layer, startTime, endTime, strength);
        }
    }

    function applyEchoBurst(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            addCoreControls(layer, strength, speed, duration);
            addFill(layer, [1, 1, 1]);
            addGlow(layer, 1.05, 28);
            makeEchoBurstLayer(layer, 1, [0.08, 0.9, 1], 42, -1, 0.15);
            makeEchoBurstLayer(layer, 2, [1, 0.12, 0.72], 32, 1, 0.35);
            makeEchoBurstLayer(layer, 3, [0.9, 1, 0.12], 24, -0.35, -1);
            makeEchoBurstLayer(layer, 4, [0.62, 0.16, 1], 16, 0.45, 1);
        }
    }

    function applyMischiefText(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            addCoreControls(layer, strength, speed * 1.2, duration);
            setExpression(getTextSource(layer), mischiefTextExpression());
            setExpression(getTransform(layer, "ADBE Position"), positionShakeExpression(0.08));
            setExpression(getRotation(layer), mischiefRotationExpression(0.05));
            setExpression(getTransform(layer, "ADBE Scale"), mischiefScaleExpression());
            addFill(layer, [1, 0.92, 0.12]);
            addGlow(layer, 1.2, 30);
            addPosterizeTime(layer, 14);
            makeTextGhost(layer, "Mischief Pop", [1, 0.12, 0.52], 0.35, 24);
        }
    }

    function applyShatteredText(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        var comp = getComp();
        if (!comp) {
            return;
        }

        var startTime = comp.time;
        var endTime = startTime + Math.max(0.38, duration);

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            addCoreControls(layer, strength * 1.1, speed, duration);
            addFill(layer, [1, 1, 1]);
            addGlow(layer, 1.25, 32);
            addNoise(layer, Math.min(46, strength * 0.52));
            revealOriginalAfterShatter(layer, startTime, endTime);
            makeShatteredPieces(layer, startTime, endTime, strength);
        }
    }

    function apply3DText(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            addCoreControls(layer, strength, speed, duration);
            try {
                layer.threeDLayer = true;
            } catch (err) {
            }
            addFill(layer, [1, 1, 1]);
            addGlow(layer, 1.35, 36);
            setExpression(getTransform(layer, "ADBE Rotate Y"), threeDRotationExpression());
            setPropertyValue(getTransform(layer, "ADBE Rotate X"), -8);
            make3DDepthLayers(layer, strength);
            makeTextGhost(layer, "3D Rim Cyan", [0.08, 0.92, 1], 0.34, 22);
        }
    }

    function applyHandwritingReveal(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            addCoreControls(layer, strength * 0.6, speed * 0.85, duration * 1.25);
            setExpression(getTextSource(layer), typeOnExpression());
            setExpression(getTransform(layer, "ADBE Position"), handwritingPositionExpression());
            addFill(layer, [1, 1, 1]);
            addGlow(layer, 0.75, 18);
            makeHandwritingInkLayer(layer, 1, [0.2, 0.92, 1], 42);
            makeHandwritingInkLayer(layer, 2, [1, 0.24, 0.66], 22);
        }
    }

    function applySandGather(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        var comp = getComp();
        if (!comp) {
            return;
        }

        var startTime = comp.time;
        var endTime = startTime + Math.max(0.35, duration);

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            addCoreControls(layer, strength, speed, duration);
            addFill(layer, [0.98, 0.88, 0.56]);
            var blur = addBlur(layer, Math.min(24, strength * 0.2));
            var noise = addNoise(layer, Math.min(80, strength * 0.9));
            var warp = addTurbulentDisplace(layer, Math.min(82, strength * 0.92), 18);
            addGlow(layer, 0.62, 18);
            setOpacityKeys(layer, startTime, endTime, 0, 100);
            setEffectKeyframes(blur, 1, startTime, endTime, Math.min(28, strength * 0.22), 0);
            setEffectKeyframes(noise, 1, startTime, endTime, Math.min(92, strength * 0.95), 8);
            setEffectKeyframes(warp, 2, startTime, endTime, Math.min(90, strength), 0);
            makeSandLayer(layer, 1, [0.95, 0.76, 0.35], false, -1.35, -0.22, 62);
            makeSandLayer(layer, 2, [0.78, 0.58, 0.28], false, -1.05, 0.42, 46);
            makeSandLayer(layer, 3, [1, 0.92, 0.72], false, -0.65, -0.68, 34);
        }
    }

    function applySandDissolve(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        var comp = getComp();
        if (!comp) {
            return;
        }

        var startTime = comp.time;
        var endTime = startTime + Math.max(0.35, duration);

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            addCoreControls(layer, strength, speed, duration);
            addFill(layer, [1, 0.9, 0.62]);
            var blur = addBlur(layer, 0);
            var noise = addNoise(layer, Math.min(42, strength * 0.46));
            var warp = addTurbulentDisplace(layer, Math.min(34, strength * 0.44), 18);
            setOpacityKeys(layer, startTime, endTime, 100, 0);
            setEffectKeyframes(blur, 1, startTime, endTime, 0, Math.min(28, strength * 0.24));
            setEffectKeyframes(noise, 1, startTime, endTime, 12, Math.min(96, strength));
            setEffectKeyframes(warp, 2, startTime, endTime, 0, Math.min(96, strength * 1.05));
            makeSandLayer(layer, 1, [0.94, 0.74, 0.32], true, 1.35, -0.22, 68);
            makeSandLayer(layer, 2, [0.8, 0.58, 0.27], true, 1.0, 0.45, 52);
            makeSandLayer(layer, 3, [1, 0.9, 0.66], true, 0.62, -0.78, 36);
        }
    }

    function applyKineticType(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            addCoreControls(layer, strength, speed * 1.1, duration);
            setExpression(getTransform(layer, "ADBE Position"), kineticTypePositionExpression());
            setExpression(getTransform(layer, "ADBE Scale"), kineticTypeScaleExpression());
            setExpression(getRotation(layer), kineticTypeRotationExpression());
            addFill(layer, [1, 1, 1]);
            addGlow(layer, 1.1, 26);
            addPosterizeTime(layer, 18);
            makeKineticAccentLayer(layer, 1, [0.08, 0.88, 1], -1, 0.18);
            makeKineticAccentLayer(layer, 2, [1, 0.18, 0.58], 1, -0.16);
            makeKineticAccentLayer(layer, 3, [0.92, 1, 0.16], -0.4, -0.65);
        }
    }

    function applyTwistWarp(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        var sourceLayers = [];
        for (var sourceIndex = 0; sourceIndex < layers.length; sourceIndex++) {
            if (layers[sourceIndex].name.indexOf(PREFIX + " ") !== 0) {
                sourceLayers.push(layers[sourceIndex]);
            }
        }

        if (sourceLayers.length === 0) {
            alert("Select the original text layer, not a KTL helper layer.");
            return;
        }

        removeCuteRollHelperLayers(sourceLayers[0].containingComp);

        for (var i = 0; i < sourceLayers.length; i++) {
            var layer = sourceLayers[i];
            removeKTLEffects(layer);
            removeKTLTextAnimators(layer);
            clearKTLExpression(getTextSource(layer));
            clearKTLExpression(getTransform(layer, "ADBE Position"));
            clearKTLExpression(getTransform(layer, "ADBE Scale"));
            clearKTLExpression(getTransform(layer, "ADBE Opacity"));
            clearKTLExpression(getTransform(layer, "ADBE Rotate X"));
            clearKTLExpression(getTransform(layer, "ADBE Rotate Y"));
            clearKTLExpression(getTransform(layer, "ADBE Rotate Z"));
            addCoreControls(layer, strength * 0.95, speed * 0.85, duration);
            layer.enabled = true;
            var fontSize = getTextFontSize(layer, 86);
            var mainStroke = clampNumber(fontSize * 0.065, 4, 8, 5);
            var outlineStroke = clampNumber(fontSize * 0.18, 11, 24, 15);
            var shadowStroke = clampNumber(fontSize * 0.24, 16, 32, 20);
            setPropertyValue(getTransform(layer, "ADBE Opacity"), 100);
            applyCartoonTextStyle(layer, [1, 0.02, 0.28], [0.02, 0.02, 0.02], mainStroke, 1, -20);
            addCuteRollTwistEffects(layer, 0);
            addCuteRollWaveTextAnimators(layer, 0);
            setCuteRollLayerMotionKeys(layer, 0);
            makeTwistEchoLayer(layer, 1, [0, 0, 0], [0, 0, 0], shadowStroke, 0, 100, 1, 12, 14, 0);
            makeTwistEchoLayer(layer, 2, [0.88, 1, 0.03], [0.02, 0.02, 0.02], outlineStroke, 0, 100, 1, 3, 5, 0);
        }
    }

    function applyDance(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        var sourceLayers = [];
        for (var sourceIndex = 0; sourceIndex < layers.length; sourceIndex++) {
            if (layers[sourceIndex].name.indexOf(PREFIX + " ") !== 0) {
                sourceLayers.push(layers[sourceIndex]);
            }
        }

        if (sourceLayers.length === 0) {
            alert("Select the original text layer, not a KTL helper layer.");
            return;
        }

        var comp = sourceLayers[0].containingComp;
        removeDanceHelperLayers(comp);
        makeDanceBackdrop(comp);

        for (var i = 0; i < sourceLayers.length; i++) {
            var layer = sourceLayers[i];
            removeKTLEffects(layer);
            removeKTLTextAnimators(layer);
            clearKTLExpression(getTextSource(layer));
            clearKTLExpression(getTransform(layer, "ADBE Position"));
            clearKTLExpression(getTransform(layer, "ADBE Scale"));
            clearKTLExpression(getTransform(layer, "ADBE Opacity"));
            clearKTLExpression(getTransform(layer, "ADBE Rotate X"));
            clearKTLExpression(getTransform(layer, "ADBE Rotate Y"));
            clearKTLExpression(getTransform(layer, "ADBE Rotate Z"));

            addCoreControls(layer, strength * 1.02, speed * 0.92, duration);
            layer.enabled = true;
            var fontSize = getTextFontSize(layer, 86);
            var mainStroke = clampNumber(fontSize * 0.07, 4, 9, 6);
            var outlineStroke = clampNumber(fontSize * 0.18, 11, 24, 16);
            var shadowStroke = clampNumber(fontSize * 0.25, 17, 34, 22);

            makeDanceBurstLayer(layer, "Orange Burst", [1, 0.56, 0.0], 9, 1.35, 0, 58);
            makeDanceBurstLayer(layer, "Red Edge", [1, 0.05, 0.16], 10, 0.98, 0.04, 70);
            makeDanceBurstLayer(layer, "Lime Burst", [0.52, 1, 0.02], 10, 0.9, 0.08, 82);
            makeDanceTextLayer(layer, "Black Shadow", [0, 0, 0], [0, 0, 0], shadowStroke, 100, 1, 12, 15, 0.08, false);
            makeDanceTextLayer(layer, "Lime Outline", [0.88, 1, 0.03], [0.02, 0.02, 0.02], outlineStroke, 100, 1, 3, 5, 0.03, false);

            setPropertyValue(getTransform(layer, "ADBE Opacity"), 100);
            applyCartoonTextStyle(layer, [1, 0.02, 0.28], [0.02, 0.02, 0.02], mainStroke, 1, -18);
            addGrowBounds(layer, clampNumber(fontSize * 2.5, 90, 280, 180));
            addDanceTwisterEffects(layer, 0);
            addDanceTextAnimators(layer, 0);
            setDanceLayerExpressions(layer, 0, 0, 1);
        }
    }

    function applyCloneSplit(strength, speed, duration) {
        var layers = getSelectedTextLayers();
        if (!layers) {
            return;
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            addCoreControls(layer, strength, speed, duration);
            addFill(layer, [1, 1, 1]);
            addGlow(layer, 0.95, 22);
            makeCloneSplitLayer(layer, 1, [0.1, 0.9, 1], -1, 0.12, 46);
            makeCloneSplitLayer(layer, 2, [1, 0.12, 0.6], 1, -0.12, 40);
            makeCloneSplitLayer(layer, 3, [0.8, 1, 0.18], -0.25, -1, 30);
            makeCloneSplitLayer(layer, 4, [0.58, 0.2, 1], 0.35, 1, 24);
        }
    }

    function makeTearStrip(sourceLayer, order, color, direction) {
        var rect = getTextBounds(sourceLayer);
        var stripCount = 4;
        var y0 = rect.top + rect.height * (order - 1) / stripCount;
        var y1 = rect.top + rect.height * order / stripCount;
        var jitter = Math.max(3, rect.height * 0.045);
        var vertices = [
            [rect.left - 12, y0 + randomBetween(-jitter, jitter)],
            [rect.left + rect.width + 12, y0 + randomBetween(-jitter, jitter)],
            [rect.left + rect.width + 12, y1 + randomBetween(-jitter, jitter)],
            [rect.left - 12, y1 + randomBetween(-jitter, jitter)]
        ];

        var strip = sourceLayer.duplicate();
        strip.name = PREFIX + " Tear " + order + " - " + sourceLayer.name;
        strip.moveBefore(sourceLayer);
        strip.label = 9;
        addIrregularMask(strip, PREFIX + " Tear Mask " + order, vertices);
        addCoreControls(strip, 54, 18, 0.8);
        addFill(strip, color);
        addBlur(strip, 0.8 + order * 0.35);
        try {
            strip.blendingMode = BlendingMode.ADD;
        } catch (err) {
        }
        try {
            getTransform(strip, "ADBE Opacity").setValue(42);
        } catch (err2) {
        }
        setExpression(getTransform(strip, "ADBE Position"), tearStripPositionExpression(order, direction));
        setExpression(getTransform(strip, "ADBE Opacity"), opacityFlickerExpression(0.24));
    }

    function makeOffsetGhost(sourceLayer, label, color, direction, yMul) {
        var ghost = sourceLayer.duplicate();
        ghost.name = PREFIX + " Offset " + label + " - " + sourceLayer.name;
        ghost.moveAfter(sourceLayer);
        ghost.label = 14;
        addCoreControls(ghost, 52, 14, 0.8);
        addFill(ghost, color);
        addBlur(ghost, 1.2);
        try {
            ghost.blendingMode = BlendingMode.ADD;
        } catch (err) {
        }
        try {
            getTransform(ghost, "ADBE Opacity").setValue(38);
        } catch (err2) {
        }
        setExpression(getTransform(ghost, "ADBE Position"), rgbPositionExpression(direction, yMul));
        setExpression(getTransform(ghost, "ADBE Opacity"), opacityFlickerExpression(0.32));
    }

    function revealOriginalAfterShatter(layer, startTime, endTime) {
        var opacity = getTransform(layer, "ADBE Opacity");
        if (!opacity) {
            return;
        }

        clearKTLExpression(opacity);
        try {
            var originalOpacity = opacity.value;
            opacity.setValueAtTime(startTime, 0);
            opacity.setValueAtTime(Math.max(startTime, endTime - 0.04), 0);
            opacity.setValueAtTime(endTime, originalOpacity);
        } catch (err) {
        }
    }

    function makeKnifeShards(sourceLayer, startTime, endTime, strength) {
        var rect = getTextBounds(sourceLayer);
        var rows = 3;
        var cols = 4;
        var shardIndex = 1;
        var cellW = rect.width / cols;
        var cellH = rect.height / rows;
        var jitter = Math.max(4, Math.min(cellW, cellH) * 0.22);

        for (var row = 0; row < rows; row++) {
            for (var col = 0; col < cols; col++) {
                var x0 = rect.left + cellW * col;
                var x1 = rect.left + cellW * (col + 1);
                var y0 = rect.top + cellH * row;
                var y1 = rect.top + cellH * (row + 1);
                var vertices = [
                    [x0 + randomBetween(-jitter, jitter), y0 + randomBetween(-jitter, jitter)],
                    [x1 + randomBetween(-jitter, jitter), y0 + randomBetween(-jitter, jitter)],
                    [x1 + randomBetween(-jitter, jitter), y1 + randomBetween(-jitter, jitter)],
                    [x0 + randomBetween(-jitter, jitter), y1 + randomBetween(-jitter, jitter)]
                ];
                makeKnifeShard(sourceLayer, shardIndex, vertices, startTime, endTime, strength);
                shardIndex++;
            }
        }
    }

    function makeKnifeShard(sourceLayer, shardIndex, vertices, startTime, endTime, strength) {
        var shard = sourceLayer.duplicate();
        shard.name = PREFIX + " Shard " + shardIndex + " - " + sourceLayer.name;
        shard.moveBefore(sourceLayer);
        shard.label = 12;
        addIrregularMask(shard, PREFIX + " Knife Mask " + shardIndex, vertices);
        addCoreControls(shard, Math.max(35, strength), 12, Math.max(0.25, endTime - startTime));
        addGlow(shard, 0.75, 18);
        addNoise(shard, Math.min(34, strength * 0.32));

        var amp = Math.max(80, strength * 2.4);
        var dx = randomBetween(-amp, amp);
        var dy = randomBetween(-amp * 0.75, amp * 0.75);
        var pos = getTransform(shard, "ADBE Position");
        if (pos) {
            try {
                var basePos = pos.value;
                pos.setValueAtTime(startTime, offsetPositionValue(basePos, dx, dy));
                pos.setValueAtTime(startTime + (endTime - startTime) * 0.45, offsetPositionValue(basePos, dx * 0.45, dy * 0.45));
                pos.setValueAtTime(endTime, basePos);
            } catch (err) {
            }
        }

        var rot = getRotation(shard);
        if (rot) {
            try {
                var baseRot = rot.value;
                rot.setValueAtTime(startTime, baseRot + randomBetween(-42, 42));
                rot.setValueAtTime(endTime, baseRot);
            } catch (err2) {
            }
        }

        var scale = getTransform(shard, "ADBE Scale");
        if (scale) {
            try {
                var baseScale = scale.value;
                var scaleMul = randomBetween(0.86, 1.08);
                var startScale = (baseScale.length == 3)
                    ? [baseScale[0] * scaleMul, baseScale[1] * scaleMul, baseScale[2]]
                    : [baseScale[0] * scaleMul, baseScale[1] * scaleMul];
                scale.setValueAtTime(startTime, startScale);
                scale.setValueAtTime(endTime, baseScale);
            } catch (err3) {
            }
        }

        var opacity = getTransform(shard, "ADBE Opacity");
        if (opacity) {
            try {
                var baseOpacity = Math.max(55, opacity.value);
                opacity.setValueAtTime(startTime, baseOpacity);
                opacity.setValueAtTime(Math.max(startTime, endTime - 0.03), baseOpacity);
                opacity.setValueAtTime(endTime + 0.05, 0);
            } catch (err4) {
            }
        }
    }

    function makeEchoBurstLayer(sourceLayer, order, color, opacity, xDir, yDir) {
        var echo = sourceLayer.duplicate();
        echo.name = PREFIX + " Echo Burst " + order + " - " + sourceLayer.name;
        echo.moveAfter(sourceLayer);
        echo.label = 11;
        addCoreControls(echo, 58, 11, 0.8);
        addFill(echo, color);
        addBlur(echo, order * 1.8);
        try {
            echo.blendingMode = BlendingMode.ADD;
        } catch (err) {
        }
        try {
            getTransform(echo, "ADBE Opacity").setValue(opacity);
        } catch (err2) {
        }
        setExpression(getTransform(echo, "ADBE Position"), echoBurstPositionExpression(order, xDir, yDir));
        setExpression(getTransform(echo, "ADBE Scale"), echoBurstScaleExpression(order));
        setExpression(getTransform(echo, "ADBE Opacity"), opacityFlickerExpression(0.22));
    }

    function makeShatteredPieces(sourceLayer, startTime, endTime, strength) {
        var rect = getTextBounds(sourceLayer);
        var rows = 4;
        var cols = 5;
        var shardIndex = 1;
        var cellW = rect.width / cols;
        var cellH = rect.height / rows;
        var jitter = Math.max(5, Math.min(cellW, cellH) * 0.28);

        for (var row = 0; row < rows; row++) {
            for (var col = 0; col < cols; col++) {
                var x0 = rect.left + cellW * col;
                var x1 = rect.left + cellW * (col + 1);
                var y0 = rect.top + cellH * row;
                var y1 = rect.top + cellH * (row + 1);
                var vertices = [
                    [x0 + randomBetween(-jitter, jitter), y0 + randomBetween(-jitter, jitter)],
                    [x1 + randomBetween(-jitter, jitter), y0 + randomBetween(-jitter, jitter)],
                    [x1 + randomBetween(-jitter, jitter), y1 + randomBetween(-jitter, jitter)],
                    [x0 + randomBetween(-jitter, jitter), y1 + randomBetween(-jitter, jitter)]
                ];
                makeShatteredPiece(sourceLayer, shardIndex, vertices, startTime, endTime, strength, row, col);
                shardIndex++;
            }
        }
    }

    function makeShatteredPiece(sourceLayer, shardIndex, vertices, startTime, endTime, strength, row, col) {
        var shard = sourceLayer.duplicate();
        shard.name = PREFIX + " Shattered " + shardIndex + " - " + sourceLayer.name;
        shard.moveBefore(sourceLayer);
        shard.label = 12;
        addIrregularMask(shard, PREFIX + " Shattered Mask " + shardIndex, vertices);
        addCoreControls(shard, Math.max(40, strength), 14, Math.max(0.35, endTime - startTime));
        addGlow(shard, 0.85, 20);
        addNoise(shard, Math.min(48, strength * 0.5));

        var centerX = vertices[0][0] + (vertices[2][0] - vertices[0][0]) * 0.5;
        var centerY = vertices[0][1] + (vertices[2][1] - vertices[0][1]) * 0.5;
        var dirX = centerX >= 0 ? 1 : -1;
        var dirY = centerY >= 0 ? 1 : -1;
        var amp = Math.max(90, strength * 2.8);
        var dx = dirX * randomBetween(amp * 0.35, amp) + randomBetween(-amp * 0.28, amp * 0.28);
        var dy = dirY * randomBetween(amp * 0.25, amp * 0.82) + randomBetween(-amp * 0.22, amp * 0.22);

        var pos = getTransform(shard, "ADBE Position");
        if (pos) {
            var basePos = pos.value;
            removePropertyKeys(pos);
            setValueAtTime(pos, startTime, offsetPositionValue(basePos, dx, dy));
            setValueAtTime(pos, startTime + (endTime - startTime) * 0.52, offsetPositionValue(basePos, dx * 0.25, dy * 0.25));
            setValueAtTime(pos, endTime, basePos);
        }

        var rot = getRotation(shard);
        if (rot) {
            var baseRot = rot.value;
            removePropertyKeys(rot);
            setValueAtTime(rot, startTime, baseRot + randomBetween(-78, 78));
            setValueAtTime(rot, endTime, baseRot);
        }

        var scale = getTransform(shard, "ADBE Scale");
        if (scale) {
            var baseScale = scale.value;
            var startScale = scaleValue(baseScale, randomBetween(0.78, 1.18), randomBetween(0.78, 1.18));
            removePropertyKeys(scale);
            setValueAtTime(scale, startTime, startScale);
            setValueAtTime(scale, endTime, baseScale);
        }

        var opacity = getTransform(shard, "ADBE Opacity");
        if (opacity) {
            removePropertyKeys(opacity);
            setValueAtTime(opacity, startTime, randomBetween(58, 88));
            setValueAtTime(opacity, Math.max(startTime, endTime - 0.05), randomBetween(58, 88));
            setValueAtTime(opacity, endTime + 0.04, 0);
        }
    }

    function make3DDepthLayers(sourceLayer, strength) {
        var depthCount = Math.max(4, Math.min(9, Math.round(strength / 12)));
        for (var i = 1; i <= depthCount; i++) {
            var depth = sourceLayer.duplicate();
            depth.name = PREFIX + " 3D Depth " + i + " - " + sourceLayer.name;
            depth.moveAfter(sourceLayer);
            depth.label = 8;
            try {
                depth.threeDLayer = true;
            } catch (err) {
            }
            addCoreControls(depth, strength, 8, 0.8);
            addFill(depth, i % 2 === 0 ? [0.04, 0.38, 0.9] : [0.02, 0.18, 0.42]);
            addBlur(depth, Math.min(2.2, i * 0.18));
            setPropertyValue(getTransform(depth, "ADBE Opacity"), Math.max(18, 78 - i * 7));
            var pos = getTransform(depth, "ADBE Position");
            if (pos) {
                setPropertyValue(pos, offsetPosition3D(pos.value, i * 2.6, i * 2.1, i * -18));
            }
            setPropertyValue(getTransform(depth, "ADBE Rotate X"), -8);
            setExpression(getTransform(depth, "ADBE Rotate Y"), threeDRotationExpression());
        }
    }

    function makeHandwritingInkLayer(sourceLayer, order, color, opacityValue) {
        var ink = sourceLayer.duplicate();
        ink.name = PREFIX + " Handwriting Ink " + order + " - " + sourceLayer.name;
        ink.moveAfter(sourceLayer);
        ink.label = 11;
        addCoreControls(ink, 28, 9, 1.1);
        setExpression(getTextSource(ink), typeOnExpression());
        setExpression(getTransform(ink, "ADBE Position"), handwritingPositionExpression());
        addFill(ink, color);
        addBlur(ink, order * 1.8);
        try {
            ink.blendingMode = BlendingMode.ADD;
        } catch (err) {
        }
        setPropertyValue(getTransform(ink, "ADBE Opacity"), opacityValue);
    }

    function makeSandLayer(sourceLayer, order, color, reverse, xDir, yDir, opacityValue) {
        var comp = sourceLayer.containingComp;
        var startTime = comp ? comp.time : sourceLayer.inPoint;
        var endTime = startTime + Math.max(0.35, getSliderValue(sourceLayer, PREFIX + " Reveal Seconds", 0.9));
        var mode = reverse ? "Dissolve" : "Gather";
        var sand = sourceLayer.duplicate();
        sand.name = PREFIX + " Sand " + mode + " " + order + " - " + sourceLayer.name;
        sand.moveAfter(sourceLayer);
        sand.label = 15;
        addCoreControls(sand, Math.max(42, getSliderValue(sourceLayer, PREFIX + " Strength", 45)), getSliderValue(sourceLayer, PREFIX + " Speed", 12), Math.max(0.35, endTime - startTime));
        addFill(sand, color);
        addNoise(sand, Math.min(96, getSliderValue(sourceLayer, PREFIX + " Strength", 45) * 1.1));
        addTurbulentDisplace(sand, Math.min(92, getSliderValue(sourceLayer, PREFIX + " Strength", 45)), 12 + order * 8);
        addBlur(sand, order * 1.7);
        try {
            sand.blendingMode = BlendingMode.ADD;
        } catch (err) {
        }
        setExpression(getTransform(sand, "ADBE Position"), sandGhostPositionExpression(order, xDir, yDir, reverse));
        var opacity = getTransform(sand, "ADBE Opacity");
        if (opacity) {
            clearKTLExpression(opacity);
            removePropertyKeys(opacity);
            if (reverse) {
                setValueAtTime(opacity, startTime, 0);
                setValueAtTime(opacity, startTime + (endTime - startTime) * 0.12, opacityValue);
                setValueAtTime(opacity, startTime + (endTime - startTime) * 0.72, opacityValue * 0.58);
                setValueAtTime(opacity, endTime, 0);
            } else {
                setValueAtTime(opacity, startTime, opacityValue);
                setValueAtTime(opacity, startTime + (endTime - startTime) * 0.68, opacityValue * 0.55);
                setValueAtTime(opacity, endTime, 0);
            }
        }
    }

    function makeKineticAccentLayer(sourceLayer, order, color, xDir, yDir) {
        var accent = sourceLayer.duplicate();
        accent.name = PREFIX + " Kinetic Accent " + order + " - " + sourceLayer.name;
        accent.moveAfter(sourceLayer);
        accent.label = 13;
        addCoreControls(accent, 52, 13, 0.8);
        addFill(accent, color);
        addBlur(accent, 0.8 + order * 0.9);
        try {
            accent.blendingMode = BlendingMode.ADD;
        } catch (err) {
        }
        setPropertyValue(getTransform(accent, "ADBE Opacity"), Math.max(20, 50 - order * 7));
        setExpression(getTransform(accent, "ADBE Position"), cloneSplitPositionExpression(order, xDir, yDir));
        setExpression(getTransform(accent, "ADBE Scale"), kineticTypeScaleExpression());
    }

    function makeTwistEchoLayer(sourceLayer, order, fillColor, strokeColor, strokeWidth, phase, opacityValue, scaleMul, xOffset, yOffset, blurAmount) {
        var echo = sourceLayer.duplicate();
        echo.name = PREFIX + " Cute Roll " + order + " - " + sourceLayer.name;
        echo.moveAfter(sourceLayer);
        echo.label = 10;
        removeKTLEffects(echo);
        addCoreControls(echo, getSliderValue(sourceLayer, PREFIX + " Strength", 45), getSliderValue(sourceLayer, PREFIX + " Speed", 12), getSliderValue(sourceLayer, PREFIX + " Reveal Seconds", 0.9));
        removeKTLTextAnimators(echo);
        applyCartoonTextStyle(echo, fillColor, strokeColor, strokeWidth, scaleMul, -20);
        if (blurAmount > 0) {
            addBlur(echo, blurAmount);
        }
        try {
            echo.blendingMode = BlendingMode.NORMAL;
        } catch (err) {
        }
        setPropertyValue(getTransform(echo, "ADBE Opacity"), opacityValue);
        var pos = getTransform(echo, "ADBE Position");
        if (pos) {
            setPropertyValue(pos, offsetPosition3D(pos.value, xOffset, yOffset, 0));
        }
        addCuteRollTwistEffects(echo, phase);
        addCuteRollWaveTextAnimators(echo, phase);
        setCuteRollLayerMotionKeys(echo, phase);
    }

    function getTextFontSize(layer, fallback) {
        var source = getTextSource(layer);
        if (!source) {
            return fallback;
        }
        try {
            return source.value.fontSize || fallback;
        } catch (err) {
            return fallback;
        }
    }

    function applyCartoonTextStyle(layer, fillColor, strokeColor, strokeWidth, fontScale, tracking) {
        var source = getTextSource(layer);
        if (!source) {
            return false;
        }

        try {
            var doc = source.value;
            var originalFontSize = doc.fontSize || 80;
            var fontCandidates = [
                "Impact",
                "Arial-BlackMT",
                "AvenirNext-Heavy",
                "Futura-CondensedExtraBold",
                "DINCondensed-Bold",
                "ArialRoundedMTBold"
            ];
            for (var fontIndex = 0; fontIndex < fontCandidates.length; fontIndex++) {
                try {
                    doc.font = fontCandidates[fontIndex];
                    break;
                } catch (fontErr) {
                }
            }
            doc.applyFill = true;
            doc.fillColor = fillColor;
            doc.applyStroke = true;
            doc.strokeColor = strokeColor;
            doc.strokeWidth = strokeWidth;
            doc.strokeOverFill = false;
            try {
                doc.fauxBold = true;
            } catch (boldErr) {
            }
            try {
                doc.tracking = tracking;
            } catch (trackingErr) {
            }
            try {
                doc.horizontalScale = 1;
                doc.verticalScale = 1;
            } catch (scaleErr) {
            }
            try {
                doc.fontSize = Math.max(8, originalFontSize * fontScale);
            } catch (sizeErr) {
            }
            source.setValue(doc);
            return true;
        } catch (err) {
        }
        return false;
    }

    function removeCuteRollHelperLayers(comp) {
        if (!comp) {
            return;
        }
        for (var i = comp.numLayers; i >= 1; i--) {
            var layer = comp.layer(i);
            if (layer.name.indexOf(PREFIX + " Cute Roll ") === 0 ||
                layer.name.indexOf(PREFIX + " Twist ") === 0 ||
                layer.name.indexOf(PREFIX + " Twi") === 0) {
                try {
                    layer.remove();
                } catch (err) {
                }
            }
        }
    }

    function removeDanceHelperLayers(comp) {
        if (!comp) {
            return;
        }
        for (var i = comp.numLayers; i >= 1; i--) {
            var layer = comp.layer(i);
            if (layer.name.indexOf(PREFIX + " Dance ") === 0) {
                try {
                    layer.remove();
                } catch (err) {
                }
            }
        }
    }

    function makeDanceBackdrop(comp) {
        if (!comp || findLayerByName(comp, PREFIX + " Dance Backdrop")) {
            return;
        }
        try {
            var bg = comp.layers.addSolid([0.02, 0.66, 0.86], PREFIX + " Dance Backdrop", comp.width, comp.height, comp.pixelAspect, comp.duration);
            bg.moveToEnd();
            bg.label = 12;
        } catch (err) {
        }
    }

    function makeDanceTextLayer(sourceLayer, label, fillColor, strokeColor, strokeWidth, opacityValue, scaleMul, xOffset, yOffset, phase, additive) {
        var echo = sourceLayer.duplicate();
        echo.name = PREFIX + " Dance " + label + " - " + sourceLayer.name;
        echo.moveAfter(sourceLayer);
        echo.label = additive ? 10 : 11;
        removeKTLEffects(echo);
        removeKTLTextAnimators(echo);
        addCoreControls(echo, getSliderValue(sourceLayer, PREFIX + " Strength", 45), getSliderValue(sourceLayer, PREFIX + " Speed", 12), getSliderValue(sourceLayer, PREFIX + " Reveal Seconds", 0.9));
        applyCartoonTextStyle(echo, fillColor, strokeColor, strokeWidth, scaleMul, -18);
        addGrowBounds(echo, clampNumber(getTextFontSize(echo, 86) * 2.6, 90, 300, 190));
        try {
            echo.blendingMode = additive ? BlendingMode.ADD : BlendingMode.NORMAL;
        } catch (err) {
        }
        setPropertyValue(getTransform(echo, "ADBE Opacity"), opacityValue);
        addDanceTwisterEffects(echo, phase);
        addDanceTextAnimators(echo, phase);
        setDanceLayerExpressions(echo, xOffset, yOffset, 1);
    }

    function makeDanceBurstLayer(sourceLayer, label, color, points, radiusMul, phase, opacityValue) {
        try {
            var comp = sourceLayer.containingComp;
            var solidSize = Math.max(comp.width, comp.height) * 2;
            var burst = comp.layers.addSolid(color, PREFIX + " Dance " + label + " - " + sourceLayer.name, solidSize, solidSize, comp.pixelAspect, comp.duration);
            burst.moveAfter(sourceLayer);
            burst.label = 14;
            addCoreControls(burst, getSliderValue(sourceLayer, PREFIX + " Strength", 45), getSliderValue(sourceLayer, PREFIX + " Speed", 12), getSliderValue(sourceLayer, PREFIX + " Reveal Seconds", 0.9));
            var rect = sourceLayer.sourceRectAtTime(comp.time, false);
            var radius = clampNumber(Math.max(rect.width, rect.height) * radiusMul, 170, Math.max(comp.width, comp.height) * 0.76, 320);
            addStarMask(burst, PREFIX + " Dance Star " + label, points, radius, radius * 0.48);
            var pos = getTransform(sourceLayer, "ADBE Position").value;
            setPropertyValue(getTransform(burst, "ADBE Position"), (pos.length == 3) ? [pos[0], pos[1], 0] : [pos[0], pos[1]]);
            setExpression(getTransform(burst, "ADBE Opacity"), danceBurstOpacityExpression(phase, opacityValue));
            setExpression(getTransform(burst, "ADBE Scale"), danceBurstScaleExpression(100, phase));
            setExpression(getRotation(burst), danceBurstRotationExpression(phase));
        } catch (err) {
        }
    }

    function addStarMask(layer, name, points, outerRadius, innerRadius) {
        try {
            var width = layer.source.width;
            var height = layer.source.height;
            var centerX = width / 2;
            var centerY = height / 2;
            var vertices = [];
            var count = Math.max(6, points * 2);
            for (var i = 0; i < count; i++) {
                var angle = -Math.PI / 2 + i * Math.PI * 2 / count;
                var radius = (i % 2 === 0) ? outerRadius : innerRadius;
                vertices.push([centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius]);
            }
            var masks = layer.property("ADBE Mask Parade");
            var mask = masks.addProperty("ADBE Mask Atom");
            mask.name = name;
            var shape = new Shape();
            shape.vertices = vertices;
            shape.inTangents = zeroTangents(vertices.length);
            shape.outTangents = zeroTangents(vertices.length);
            shape.closed = true;
            mask.property("ADBE Mask Shape").setValue(shape);
            try {
                mask.maskMode = MaskMode.ADD;
            } catch (maskErr) {
            }
        } catch (err) {
        }
    }

    function setDanceLayerExpressions(layer, xOffset, yOffset, direction) {
        setExpression(getTransform(layer, "ADBE Position"), dancePositionExpression(xOffset, yOffset));
        setExpression(getTransform(layer, "ADBE Scale"), danceScaleExpression(0));
        setExpression(getRotation(layer), danceRotationExpression(direction));
    }

    function addDanceTwisterEffects(layer, phase) {
        var fontSize = getTextFontSize(layer, 86);
        var span = getCuteRollEffectSpan(layer) * 0.9;
        var baseCenter = getCuteRollEffectCenter(layer);
        addGrowBounds(layer, clampNumber(fontSize * 2.7, 90, 300, 190));

        var twister = addOrGetEffect(layer, "CC Twister", PREFIX + " Dance Twister");
        setEffectValue(twister, 2, true);
        setEffectValue(twister, 3, 1);
        setEffectValue(twister, 4, baseCenter);
        setEffectValue(twister, 5, 90);
        try {
            setExpression(twister.property(1), danceTwisterCompletionExpression(phase));
            setExpression(twister.property(4), danceTwisterCenterExpression(baseCenter, span, phase));
            setExpression(twister.property(5), danceTwisterAxisExpression(phase));
        } catch (err) {
        }
    }

    function addDanceTextAnimators(layer, phase) {
        try {
            var textProps = layer.property("ADBE Text Properties");
            var animators = textProps.property("ADBE Text Animators");

            var bounce = animators.addProperty("ADBE Text Animator");
            bounce.name = PREFIX + " Dance Letter Bounce";
            var bounceProps = bounce.property("ADBE Text Animator Properties");
            setPropertyValue(bounceProps.addProperty("ADBE Text Scale 3D"), [112, 86, 100]);
            setPropertyValue(bounceProps.addProperty("ADBE Text Position 3D"), [0, -14, 0]);
            setPropertyValue(bounceProps.addProperty("ADBE Text Rotation"), -5);
            try {
                setPropertyValue(bounceProps.addProperty("ADBE Text Skew"), 8);
            } catch (skewErr) {
            }
            addCuteRollSelector(bounce, PREFIX + " Dance Bounce Selector", danceLetterBounceAmountExpression(phase));

            var smear = animators.addProperty("ADBE Text Animator");
            smear.name = PREFIX + " Dance Twist Smear";
            var smearProps = smear.property("ADBE Text Animator Properties");
            setPropertyValue(smearProps.addProperty("ADBE Text Scale 3D"), [54, 92, 100]);
            setPropertyValue(smearProps.addProperty("ADBE Text Rotation Y"), -52);
            setPropertyValue(smearProps.addProperty("ADBE Text Rotation"), -6);
            setPropertyValue(smearProps.addProperty("ADBE Text Position 3D"), [0, -5, 0]);
            try {
                setPropertyValue(smearProps.addProperty("ADBE Text Tracking Amount"), -16);
            } catch (trackingErr) {
            }
            addCuteRollSelector(smear, PREFIX + " Dance Smear Selector", danceSmearAmountExpression(phase));
        } catch (err) {
        }
    }

    function getCuteRollEffectCenter(layer) {
        var localCenter = null;
        try {
            var rect = layer.sourceRectAtTime(layer.containingComp.time, false);
            if (rect.width > 1 && rect.height > 1 &&
                rect.width < layer.containingComp.width * 4 &&
                rect.height < layer.containingComp.height * 4) {
                localCenter = [rect.left + rect.width / 2, rect.top + rect.height / 2];
                try {
                    var compCenter = layer.sourcePointToComp(localCenter);
                    return [compCenter[0], compCenter[1]];
                } catch (pointErr) {
                }
            }
        } catch (rectErr) {
        }

        try {
            if (localCenter) {
                var anchor = getTransform(layer, "ADBE Anchor Point").value;
                var position = getTransform(layer, "ADBE Position").value;
                var scale = getTransform(layer, "ADBE Scale").value;
                return [
                    position[0] + (localCenter[0] - anchor[0]) * scale[0] / 100,
                    position[1] + (localCenter[1] - anchor[1]) * scale[1] / 100
                ];
            }
        } catch (manualErr) {
        }

        try {
            var pos = getTransform(layer, "ADBE Position").value;
            return [pos[0], pos[1]];
        } catch (posErr) {
            return [0, 0];
        }
    }

    function getCuteRollEffectSpan(layer) {
        try {
            var rect = layer.sourceRectAtTime(layer.containingComp.time, false);
            if (rect.width > 1 && rect.width < layer.containingComp.width * 4) {
                return clampNumber(rect.width * 0.54, 80, layer.containingComp.width * 0.48, 180);
            }
        } catch (err) {
        }
        try {
            return clampNumber(layer.containingComp.width * 0.24, 80, 320, 180);
        } catch (compErr) {
            return 180;
        }
    }

    function addCuteRollTwistEffects(layer, phase) {
        var fontSize = getTextFontSize(layer, 86);
        var span = getCuteRollEffectSpan(layer);
        var startTime = layer.containingComp.time;
        var duration = getSliderValue(layer, PREFIX + " Reveal Seconds", 0.9);
        var maxTwist = clampNumber(getSliderValue(layer, PREFIX + " Strength", 45) / 100, 0.34, 0.68, 0.45);
        var baseCenter = getCuteRollEffectCenter(layer);
        addGrowBounds(layer, clampNumber(fontSize * 2.6, 90, 280, 180));

        var twister = addOrGetEffect(layer, "CC Twister", PREFIX + " Cute Roll Twister");
        setEffectValue(twister, 2, true);
        setEffectValue(twister, 3, 1);
        setEffectValue(twister, 4, baseCenter);
        setEffectValue(twister, 5, 90);
        try {
            var completion = twister.property(1);
            clearKTLExpression(completion);
            removePropertyKeys(completion);
            setValueAtTime(completion, startTime, 0);
            setValueAtTime(completion, startTime + duration * 0.24, maxTwist * 0.88);
            setValueAtTime(completion, startTime + duration * 0.5, maxTwist);
            setValueAtTime(completion, startTime + duration * 0.76, maxTwist * 0.78);
            setValueAtTime(completion, startTime + duration, 0);

            var center = twister.property(4);
            clearKTLExpression(center);
            removePropertyKeys(center);
            setValueAtTime(center, startTime, [baseCenter[0] - span, baseCenter[1]]);
            setValueAtTime(center, startTime + duration * 0.24, [baseCenter[0] - span * 0.55, baseCenter[1] + 10]);
            setValueAtTime(center, startTime + duration * 0.5, baseCenter);
            setValueAtTime(center, startTime + duration * 0.76, [baseCenter[0] + span * 0.55, baseCenter[1] - 10]);
            setValueAtTime(center, startTime + duration, [baseCenter[0] + span, baseCenter[1]]);

            var axis = twister.property(5);
            clearKTLExpression(axis);
            removePropertyKeys(axis);
            setValueAtTime(axis, startTime, 90);
            setValueAtTime(axis, startTime + duration * 0.24, 98);
            setValueAtTime(axis, startTime + duration * 0.5, 90);
            setValueAtTime(axis, startTime + duration * 0.76, 82);
            setValueAtTime(axis, startTime + duration, 90);
        } catch (err) {
        }
    }

    function setCuteRollLayerMotionKeys(layer, phase) {
        try {
            var startTime = layer.containingComp.time;
            var duration = getSliderValue(layer, PREFIX + " Reveal Seconds", 0.9);
            var strength = getSliderValue(layer, PREFIX + " Strength", 45);
            var tilt = Math.min(7, strength * 0.07);

            var rotation = getRotation(layer);
            if (rotation) {
                var baseRotation = rotation.value;
                clearKTLExpression(rotation);
                removePropertyKeys(rotation);
                setValueAtTime(rotation, startTime, baseRotation);
                setValueAtTime(rotation, startTime + duration * 0.24, baseRotation - tilt);
                setValueAtTime(rotation, startTime + duration * 0.5, baseRotation + tilt * 0.42);
                setValueAtTime(rotation, startTime + duration * 0.76, baseRotation + tilt);
                setValueAtTime(rotation, startTime + duration, baseRotation);
            }

            var scale = getTransform(layer, "ADBE Scale");
            if (scale) {
                var baseScale = scale.value;
                clearKTLExpression(scale);
                removePropertyKeys(scale);
                setValueAtTime(scale, startTime, baseScale);
                setValueAtTime(scale, startTime + duration * 0.24, scaleValue(baseScale, 1.01, 0.96));
                setValueAtTime(scale, startTime + duration * 0.5, scaleValue(baseScale, 1.015, 0.94));
                setValueAtTime(scale, startTime + duration * 0.76, scaleValue(baseScale, 1.01, 0.96));
                setValueAtTime(scale, startTime + duration, baseScale);
            }
        } catch (err) {
        }
    }

    function addCuteRollSelector(animator, selectorName, amountExpression) {
        try {
            var selectors = animator.property("ADBE Text Selectors");
            while (selectors.numProperties > 0) {
                selectors.property(selectors.numProperties).remove();
            }
            var selector = selectors.addProperty("ADBE Text Expressible Selector");
            selector.name = selectorName;
            var amount = selector.property("ADBE Text Expressible Amount");
            setExpression(amount, amountExpression);
        } catch (err) {
        }
    }

    function addCuteRollWaveTextAnimators(layer, phase) {
        try {
            var textProps = layer.property("ADBE Text Properties");
            var animators = textProps.property("ADBE Text Animators");

            var pinch = animators.addProperty("ADBE Text Animator");
            pinch.name = PREFIX + " Cute Roll Letter Wave";
            var pinchProps = pinch.property("ADBE Text Animator Properties");
            setPropertyValue(pinchProps.addProperty("ADBE Text Scale 3D"), [34, 90, 100]);
            setPropertyValue(pinchProps.addProperty("ADBE Text Position 3D"), [0, -5, 0]);
            setPropertyValue(pinchProps.addProperty("ADBE Text Rotation Y"), -82);
            setPropertyValue(pinchProps.addProperty("ADBE Text Rotation"), -7);
            try {
                setPropertyValue(pinchProps.addProperty("ADBE Text Tracking Amount"), -26);
            } catch (trackingErr) {
            }
            try {
                setPropertyValue(pinchProps.addProperty("ADBE Text Skew"), 14);
            } catch (skewErr) {
            }
            addCuteRollSelector(pinch, PREFIX + " Cute Roll Wave Peak", cuteRollWaveAmountExpression(phase));

            var flip = animators.addProperty("ADBE Text Animator");
            flip.name = PREFIX + " Cute Roll Letter Flip";
            var flipProps = flip.property("ADBE Text Animator Properties");
            setPropertyValue(flipProps.addProperty("ADBE Text Rotation X"), -64);
            setPropertyValue(flipProps.addProperty("ADBE Text Rotation Y"), 38);
            setPropertyValue(flipProps.addProperty("ADBE Text Position 3D"), [0, 5, 0]);
            addCuteRollSelector(flip, PREFIX + " Cute Roll Wave Side", cuteRollWaveFlipAmountExpression(phase));
        } catch (err) {
        }
    }

    function addCuteRollFlipAnimators(layer, phase) {
        try {
            var textProps = layer.property("ADBE Text Properties");
            var animators = textProps.property("ADBE Text Animators");

            var flip = animators.addProperty("ADBE Text Animator");
            flip.name = PREFIX + " Cute Roll Flip";
            var flipProps = flip.property("ADBE Text Animator Properties");
            setPropertyValue(flipProps.addProperty("ADBE Text Rotation X"), -360);
            addCuteRollSelector(flip, PREFIX + " Cute Roll Progress", cuteRollLetterAmountExpression(phase));

            var twist = animators.addProperty("ADBE Text Animator");
            twist.name = PREFIX + " Cute Roll Twist";
            var twistProps = twist.property("ADBE Text Animator Properties");
            setPropertyValue(twistProps.addProperty("ADBE Text Rotation Y"), -58);
            setPropertyValue(twistProps.addProperty("ADBE Text Rotation"), -7);
            setPropertyValue(twistProps.addProperty("ADBE Text Position 3D"), [0, -10, 0]);
            setPropertyValue(twistProps.addProperty("ADBE Text Scale 3D"), [112, 88, 100]);
            try {
                setPropertyValue(twistProps.addProperty("ADBE Text Skew"), 8);
            } catch (skewErr) {
            }
            addCuteRollSelector(twist, PREFIX + " Cute Roll Bend", cuteRollPulseAmountExpression(phase));
        } catch (err) {
        }
    }

    function removeKTLTextAnimators(layer) {
        try {
            var textProps = layer.property("ADBE Text Properties");
            if (!textProps) {
                return;
            }
            var animators = textProps.property("ADBE Text Animators");
            if (!animators) {
                return;
            }
            for (var i = animators.numProperties; i >= 1; i--) {
                var animator = animators.property(i);
                if (animator.name.indexOf(PREFIX + " ") === 0) {
                    animator.remove();
                }
            }
        } catch (err) {
        }
    }

    function makeCloneSplitLayer(sourceLayer, order, color, xDir, yDir, opacityValue) {
        var clone = sourceLayer.duplicate();
        clone.name = PREFIX + " Clone Split " + order + " - " + sourceLayer.name;
        clone.moveAfter(sourceLayer);
        clone.label = 14;
        addCoreControls(clone, 58, 15, 0.75);
        addFill(clone, color);
        addBlur(clone, order * 0.9);
        try {
            clone.blendingMode = BlendingMode.ADD;
        } catch (err) {
        }
        setPropertyValue(getTransform(clone, "ADBE Opacity"), opacityValue);
        setExpression(getTransform(clone, "ADBE Position"), cloneSplitPositionExpression(order, xDir, yDir));
        setExpression(getTransform(clone, "ADBE Opacity"), cloneSplitOpacityExpression(order));
    }

    function getTextBounds(layer) {
        try {
            var rect = layer.sourceRectAtTime(layer.containingComp.time, false);
            if (rect.width > 1 && rect.height > 1) {
                return {
                    left: rect.left - 10,
                    top: rect.top - 10,
                    width: rect.width + 20,
                    height: rect.height + 20
                };
            }
        } catch (err) {
        }

        return {
            left: -220,
            top: -80,
            width: 440,
            height: 160
        };
    }

    function addIrregularMask(layer, name, vertices) {
        try {
            var masks = layer.property("ADBE Mask Parade");
            var mask = masks.addProperty("ADBE Mask Atom");
            mask.name = name;
            var shape = new Shape();
            shape.vertices = vertices;
            shape.inTangents = zeroTangents(vertices.length);
            shape.outTangents = zeroTangents(vertices.length);
            shape.closed = true;
            mask.property("ADBE Mask Shape").setValue(shape);
            try {
                mask.maskMode = MaskMode.ADD;
            } catch (err2) {
            }
        } catch (err) {
        }
    }

    function zeroTangents(count) {
        var tangents = [];
        for (var i = 0; i < count; i++) {
            tangents.push([0, 0]);
        }
        return tangents;
    }

    function offsetPositionValue(baseValue, dx, dy) {
        if (baseValue.length == 3) {
            return [baseValue[0] + dx, baseValue[1] + dy, baseValue[2]];
        }
        return [baseValue[0] + dx, baseValue[1] + dy];
    }

    function offsetPosition3D(baseValue, dx, dy, dz) {
        if (baseValue.length == 3) {
            return [baseValue[0] + dx, baseValue[1] + dy, baseValue[2] + dz];
        }
        return [baseValue[0] + dx, baseValue[1] + dy];
    }

    function scaleValue(baseValue, xMul, yMul) {
        if (baseValue.length == 3) {
            return [baseValue[0] * xMul, baseValue[1] * yMul, baseValue[2]];
        }
        return [baseValue[0] * xMul, baseValue[1] * yMul];
    }

    function removePropertyKeys(prop) {
        if (!prop) {
            return;
        }
        try {
            while (prop.numKeys && prop.numKeys > 0) {
                prop.removeKey(prop.numKeys);
            }
        } catch (err) {
        }
    }

    function setValueAtTime(prop, timeValue, value) {
        if (!prop) {
            return;
        }
        try {
            prop.setValueAtTime(timeValue, value);
        } catch (err) {
        }
    }

    function setPropertyValue(prop, value) {
        if (!prop) {
            return;
        }
        try {
            clearKTLExpression(prop);
            removePropertyKeys(prop);
            prop.setValue(value);
        } catch (err) {
        }
    }

    function removeEffectByName(layer, name) {
        try {
            var fx = findEffect(layer, name);
            if (fx) {
                fx.remove();
            }
        } catch (err) {
        }
    }

    function setOpacityKeys(layer, startTime, endTime, fromValue, toValue) {
        var opacity = getTransform(layer, "ADBE Opacity");
        if (!opacity) {
            return;
        }
        clearKTLExpression(opacity);
        removePropertyKeys(opacity);
        setValueAtTime(opacity, startTime, fromValue);
        setValueAtTime(opacity, startTime + (endTime - startTime) * 0.72, fromValue + (toValue - fromValue) * 0.58);
        setValueAtTime(opacity, endTime, toValue);
    }

    function setEffectKeyframes(fx, index, startTime, endTime, fromValue, toValue) {
        if (!fx) {
            return;
        }
        try {
            var prop = fx.property(index);
            if (!prop) {
                return;
            }
            clearKTLExpression(prop);
            removePropertyKeys(prop);
            setValueAtTime(prop, startTime, fromValue);
            setValueAtTime(prop, endTime, toValue);
        } catch (err) {
        }
    }

    function removeKTLEffects(layer) {
        var effects = effectParade(layer);
        if (!effects) {
            return;
        }

        for (var fxIndex = effects.numProperties; fxIndex >= 1; fxIndex--) {
            var fx = effects.property(fxIndex);
            if (fx.name.indexOf(PREFIX + " ") === 0) {
                try {
                    fx.remove();
                } catch (err) {
                }
            }
        }
    }

    function getSliderValue(layer, name, fallback) {
        var fx = findEffect(layer, name);
        if (!fx) {
            return fallback;
        }
        try {
            return fx.property(1).value;
        } catch (err) {
            return fallback;
        }
    }

    function randomBetween(minValue, maxValue) {
        return minValue + Math.random() * (maxValue - minValue);
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

    function makeEDMNeonLayer(sourceLayer, label, color, opacityValue, blurAmount, scaleBoost, direction, xOffset, yOffset, additive) {
        var ghost = sourceLayer.duplicate();
        ghost.name = PREFIX + " Ghost EDM " + label + " - " + sourceLayer.name;
        ghost.moveAfter(sourceLayer);
        ghost.label = additive ? 10 : 16;
        removeKTLEffects(ghost);
        removeKTLTextAnimators(ghost);
        addCoreControls(ghost, getSliderValue(sourceLayer, PREFIX + " Strength", 44), getSliderValue(sourceLayer, PREFIX + " Speed", 10), getSliderValue(sourceLayer, PREFIX + " Reveal Seconds", 0.8));
        addFill(ghost, color);
        addBlur(ghost, blurAmount);
        addGrowBounds(ghost, clampNumber(80 + blurAmount * 10, 110, 260, 150));
        try {
            if (additive) {
                ghost.blendingMode = BlendingMode.ADD;
            } else {
                ghost.blendingMode = BlendingMode.NORMAL;
            }
        } catch (err) {
        }
        setPropertyValue(getTransform(ghost, "ADBE Position"), offsetPositionValue(getTransform(sourceLayer, "ADBE Position").value, xOffset, yOffset));
        setExpression(getTransform(ghost, "ADBE Position"), rgbPositionExpression(direction, 0.16));
        setExpression(getTransform(ghost, "ADBE Scale"), edmGlowScaleExpression(scaleBoost));
        setExpression(getTransform(ghost, "ADBE Opacity"), edmGlowOpacityExpression(opacityValue, opacityValue));
    }

    function makeImpactSlamLayer(sourceLayer, label, color, opacityValue, baseScale, basePosition, duration, strength, scaleStart, scaleHit, scaleEnd, blurAmount, xOffset, yOffset, additive) {
        var ghost = sourceLayer.duplicate();
        ghost.name = PREFIX + " Ghost Impact " + label + " - " + sourceLayer.name;
        ghost.moveAfter(sourceLayer);
        ghost.label = additive ? 11 : 16;
        removeKTLEffects(ghost);
        removeKTLTextAnimators(ghost);
        addFill(ghost, color);
        addBlur(ghost, blurAmount);
        addGrowBounds(ghost, clampNumber(90 + strength * 1.25 + blurAmount * 7, 110, 320, 180));
        try {
            if (additive) {
                ghost.blendingMode = BlendingMode.ADD;
            } else {
                ghost.blendingMode = BlendingMode.NORMAL;
            }
            ghost.motionBlur = true;
        } catch (err) {
        }

        var startTime = sourceLayer.containingComp.time;
        var hitTime = startTime + Math.max(sourceLayer.containingComp.frameDuration * 2, Math.min(0.08, duration * 0.12));
        var endTime = startTime + Math.max(0.22, duration * 0.48 + blurAmount * 0.006);
        var scale = getTransform(ghost, "ADBE Scale");
        if (scale) {
            clearKTLExpression(scale);
            removePropertyKeys(scale);
            setValueAtTime(scale, startTime, scaleValue(baseScale, scaleStart, scaleStart));
            setValueAtTime(scale, hitTime, scaleValue(baseScale, scaleHit, scaleHit));
            setValueAtTime(scale, endTime, scaleValue(baseScale, scaleEnd, scaleEnd));
        }

        var position = getTransform(ghost, "ADBE Position");
        if (position) {
            clearKTLExpression(position);
            removePropertyKeys(position);
            setValueAtTime(position, startTime, offsetPositionValue(basePosition, xOffset, yOffset));
            setValueAtTime(position, endTime, offsetPositionValue(basePosition, xOffset * 1.5, yOffset * 1.5));
        }

        var opacity = getTransform(ghost, "ADBE Opacity");
        if (opacity) {
            clearKTLExpression(opacity);
            removePropertyKeys(opacity);
            setValueAtTime(opacity, startTime, 0);
            setValueAtTime(opacity, hitTime, opacityValue);
            setValueAtTime(opacity, endTime, 0);
        }
    }

    function makeEchoLayer(sourceLayer, order, color, opacity) {
        var echo = sourceLayer.duplicate();
        echo.name = PREFIX + " Echo " + order + " - " + sourceLayer.name;
        echo.moveAfter(sourceLayer);
        echo.label = 11;
        addCoreControls(echo, getSliderValue(sourceLayer, PREFIX + " Strength", 44), getSliderValue(sourceLayer, PREFIX + " Speed", 8), getSliderValue(sourceLayer, PREFIX + " Reveal Seconds", 0.8));
        addFill(echo, color);
        addBlur(echo, order * 1.15);
        try {
            echo.blendingMode = BlendingMode.ADD;
            echo.motionBlur = true;
        } catch (err) {
        }
        try {
            getTransform(echo, "ADBE Opacity").setValue(opacity);
        } catch (err2) {
        }
        setExpression(getTransform(echo, "ADBE Position"), echoTrailPositionExpression(sourceLayer.name, order));
        setExpression(getTransform(echo, "ADBE Opacity"), echoTrailOpacityExpression(order));
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
                layer.name.indexOf(PREFIX + " Echo ") === 0 ||
                layer.name.indexOf(PREFIX + " Tear ") === 0 ||
                layer.name.indexOf(PREFIX + " Offset ") === 0 ||
                layer.name.indexOf(PREFIX + " Shard ") === 0 ||
                layer.name.indexOf(PREFIX + " Shattered ") === 0 ||
                layer.name.indexOf(PREFIX + " 3D Depth ") === 0 ||
                layer.name.indexOf(PREFIX + " Handwriting ") === 0 ||
                layer.name.indexOf(PREFIX + " Sand ") === 0 ||
                layer.name.indexOf(PREFIX + " Kinetic ") === 0 ||
                layer.name.indexOf(PREFIX + " Twist ") === 0 ||
                layer.name.indexOf(PREFIX + " Cute Roll ") === 0 ||
                layer.name.indexOf(PREFIX + " Dance ") === 0 ||
                layer.name.indexOf(PREFIX + " Clone ") === 0) {
                layer.remove();
                continue;
            }

            clearKTLExpression(getTextSource(layer));
            clearKTLExpression(getTransform(layer, "ADBE Position"));
            clearKTLExpression(getTransform(layer, "ADBE Scale"));
            clearKTLExpression(getTransform(layer, "ADBE Opacity"));
            clearKTLExpression(getTransform(layer, "ADBE Rotate X"));
            clearKTLExpression(getTransform(layer, "ADBE Rotate Y"));
            clearKTLExpression(getTransform(layer, "ADBE Rotate Z"));
            removeKTLTextAnimators(layer);

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
