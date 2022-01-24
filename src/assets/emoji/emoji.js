/* eslint-disable */

(function(){
    var emojiIDLookup = {};

    //first let's intialize an emoji db

    function fixedFromCharCode (codePt) {
        if (codePt > 0xFFFF) {
            codePt -= 0x10000;
            return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF));
        }
        else {
            return String.fromCharCode(codePt);
        }
    }


    var emojiUnicodeEntries = [//disabled ©, ®, and ™ processing
        /*0x00a9,0x00ae,*/0x1f004,0x1f0cf,0x1f170,0x1f171,0x1f17e,0x1f17f,0x1f18e,0x1f191,0x1f192,0x1f193,0x1f194,0x1f195,
        0x1f196,0x1f197,0x1f198,0x1f199,0x1f19a,0x1f1e6,0x1f1e7,0x1f1e8,0x1f1e9,0x1f1ea,0x1f1eb,0x1f1ec,0x1f1ed,0x1f1ee,
        0x1f1ef,0x1f1f0,0x1f1f1,0x1f1f2,0x1f1f3,0x1f1f4,0x1f1f5,0x1f1f6,0x1f1f7,0x1f1f8,0x1f1f9,0x1f1fa,0x1f1fb,0x1f1fc,
        0x1f1fd,0x1f1fe,0x1f1ff,0x1f201,0x1f202,0x1f21a,0x1f22f,0x1f232,0x1f233,0x1f234,0x1f235,0x1f236,0x1f237,0x1f238,
        0x1f239,0x1f23a,0x1f250,0x1f251,0x1f300,0x1f301,0x1f302,0x1f303,0x1f304,0x1f305,0x1f306,0x1f307,0x1f308,0x1f309,
        0x1f30a,0x1f30b,0x1f30c,0x1f30d,0x1f30e,0x1f30f,0x1f310,0x1f311,0x1f312,0x1f313,0x1f314,0x1f315,0x1f316,0x1f317,
        0x1f318,0x1f319,0x1f31a,0x1f31b,0x1f31c,0x1f31d,0x1f31e,0x1f31f,0x1f320,0x1f330,0x1f331,0x1f332,0x1f333,0x1f334,
        0x1f335,0x1f337,0x1f338,0x1f339,0x1f33a,0x1f33b,0x1f33c,0x1f33d,0x1f33e,0x1f33f,0x1f340,0x1f341,0x1f342,0x1f343,
        0x1f344,0x1f345,0x1f346,0x1f347,0x1f348,0x1f349,0x1f34a,0x1f34b,0x1f34c,0x1f34d,0x1f34e,0x1f34f,0x1f350,0x1f351,
        0x1f352,0x1f353,0x1f354,0x1f355,0x1f356,0x1f357,0x1f358,0x1f359,0x1f35a,0x1f35b,0x1f35c,0x1f35d,0x1f35e,0x1f35f,
        0x1f360,0x1f361,0x1f362,0x1f363,0x1f364,0x1f365,0x1f366,0x1f367,0x1f368,0x1f369,0x1f36a,0x1f36b,0x1f36c,0x1f36d,
        0x1f36e,0x1f36f,0x1f370,0x1f371,0x1f372,0x1f373,0x1f374,0x1f375,0x1f376,0x1f377,0x1f378,0x1f379,0x1f37a,0x1f37b,
        0x1f37c,0x1f380,0x1f381,0x1f382,0x1f383,0x1f384,0x1f385,0x1f386,0x1f387,0x1f388,0x1f389,0x1f38a,0x1f38b,0x1f38c,
        0x1f38d,0x1f38e,0x1f38f,0x1f390,0x1f391,0x1f392,0x1f393,0x1f3a0,0x1f3a1,0x1f3a2,0x1f3a3,0x1f3a4,0x1f3a5,0x1f3a6,
        0x1f3a7,0x1f3a8,0x1f3a9,0x1f3aa,0x1f3ab,0x1f3ac,0x1f3ad,0x1f3ae,0x1f3af,0x1f3b0,0x1f3b1,0x1f3b2,0x1f3b3,0x1f3b4,
        0x1f3b5,0x1f3b6,0x1f3b7,0x1f3b8,0x1f3b9,0x1f3ba,0x1f3bb,0x1f3bc,0x1f3bd,0x1f3be,0x1f3bf,0x1f3c0,0x1f3c1,0x1f3c2,
        0x1f3c3,0x1f3c4,0x1f3c6,0x1f3c7,0x1f3c8,0x1f3c9,0x1f3ca,0x1f3e0,0x1f3e1,0x1f3e2,0x1f3e3,0x1f3e4,0x1f3e5,0x1f3e6,
        0x1f3e7,0x1f3e8,0x1f3e9,0x1f3ea,0x1f3eb,0x1f3ec,0x1f3ed,0x1f3ee,0x1f3ef,0x1f3f0,0x1f400,0x1f401,0x1f402,0x1f403,
        0x1f404,0x1f405,0x1f406,0x1f407,0x1f408,0x1f409,0x1f40a,0x1f40b,0x1f40c,0x1f40d,0x1f40e,0x1f40f,0x1f410,0x1f411,
        0x1f412,0x1f413,0x1f414,0x1f415,0x1f416,0x1f417,0x1f418,0x1f419,0x1f41a,0x1f41b,0x1f41c,0x1f41d,0x1f41e,0x1f41f,
        0x1f420,0x1f421,0x1f422,0x1f423,0x1f424,0x1f425,0x1f426,0x1f427,0x1f428,0x1f429,0x1f42a,0x1f42b,0x1f42c,0x1f42d,
        0x1f42e,0x1f42f,0x1f430,0x1f431,0x1f432,0x1f433,0x1f434,0x1f435,0x1f436,0x1f437,0x1f438,0x1f439,0x1f43a,0x1f43b,
        0x1f43c,0x1f43d,0x1f43e,0x1f440,0x1f442,0x1f443,0x1f444,0x1f445,0x1f446,0x1f447,0x1f448,0x1f449,0x1f44a,0x1f44b,
        0x1f44c,0x1f44d,0x1f44e,0x1f44f,0x1f450,0x1f451,0x1f452,0x1f453,0x1f454,0x1f455,0x1f456,0x1f457,0x1f458,0x1f459,
        0x1f45a,0x1f45b,0x1f45c,0x1f45d,0x1f45e,0x1f45f,0x1f460,0x1f461,0x1f462,0x1f463,0x1f464,0x1f465,0x1f466,0x1f467,
        0x1f468,0x1f469,0x1f46a,0x1f46b,0x1f46c,0x1f46d,0x1f46e,0x1f46f,0x1f470,0x1f471,0x1f472,0x1f473,0x1f474,0x1f475,
        0x1f476,0x1f477,0x1f478,0x1f479,0x1f47a,0x1f47b,0x1f47c,0x1f47d,0x1f47e,0x1f47f,0x1f480,0x1f481,0x1f482,0x1f483,
        0x1f484,0x1f485,0x1f486,0x1f487,0x1f488,0x1f489,0x1f48a,0x1f48b,0x1f48c,0x1f48d,0x1f48e,0x1f48f,0x1f490,0x1f491,
        0x1f492,0x1f493,0x1f494,0x1f495,0x1f496,0x1f497,0x1f498,0x1f499,0x1f49a,0x1f49b,0x1f49c,0x1f49d,0x1f49e,0x1f49f,
        0x1f4a0,0x1f4a1,0x1f4a2,0x1f4a3,0x1f4a4,0x1f4a5,0x1f4a6,0x1f4a7,0x1f4a8,0x1f4a9,0x1f4aa,0x1f4ab,0x1f4ac,0x1f4ad,
        0x1f4ae,0x1f4af,0x1f4b0,0x1f4b1,0x1f4b2,0x1f4b3,0x1f4b4,0x1f4b5,0x1f4b6,0x1f4b7,0x1f4b8,0x1f4b9,0x1f4ba,0x1f4bb,
        0x1f4bc,0x1f4bd,0x1f4be,0x1f4bf,0x1f4c0,0x1f4c1,0x1f4c2,0x1f4c3,0x1f4c4,0x1f4c5,0x1f4c6,0x1f4c7,0x1f4c8,0x1f4c9,
        0x1f4ca,0x1f4cb,0x1f4cc,0x1f4cd,0x1f4ce,0x1f4cf,0x1f4d0,0x1f4d1,0x1f4d2,0x1f4d3,0x1f4d4,0x1f4d5,0x1f4d6,0x1f4d7,
        0x1f4d8,0x1f4d9,0x1f4da,0x1f4db,0x1f4dc,0x1f4dd,0x1f4de,0x1f4df,0x1f4e0,0x1f4e1,0x1f4e2,0x1f4e3,0x1f4e4,0x1f4e5,
        0x1f4e6,0x1f4e7,0x1f4e8,0x1f4e9,0x1f4ea,0x1f4eb,0x1f4ec,0x1f4ed,0x1f4ee,0x1f4ef,0x1f4f0,0x1f4f1,0x1f4f2,0x1f4f3,
        0x1f4f4,0x1f4f5,0x1f4f6,0x1f4f7,0x1f4f9,0x1f4fa,0x1f4fb,0x1f4fc,0x1f500,0x1f501,0x1f502,0x1f503,0x1f504,0x1f505,
        0x1f506,0x1f507,0x1f508,0x1f509,0x1f50a,0x1f50b,0x1f50c,0x1f50d,0x1f50e,0x1f50f,0x1f510,0x1f511,0x1f512,0x1f513,
        0x1f514,0x1f515,0x1f516,0x1f517,0x1f518,0x1f519,0x1f51a,0x1f51b,0x1f51c,0x1f51d,0x1f51e,0x1f51f,0x1f520,0x1f521,
        0x1f522,0x1f523,0x1f524,0x1f525,0x1f526,0x1f527,0x1f528,0x1f529,0x1f52a,0x1f52b,0x1f52c,0x1f52d,0x1f52e,0x1f52f,
        0x1f530,0x1f531,0x1f532,0x1f533,0x1f534,0x1f535,0x1f536,0x1f537,0x1f538,0x1f539,0x1f53a,0x1f53b,0x1f53c,0x1f53d,
        0x1f550,0x1f551,0x1f552,0x1f553,0x1f554,0x1f555,0x1f556,0x1f557,0x1f558,0x1f559,0x1f55a,0x1f55b,0x1f55c,0x1f55d,
        0x1f55e,0x1f55f,0x1f560,0x1f561,0x1f562,0x1f563,0x1f564,0x1f565,0x1f566,0x1f567,0x1f5fb,0x1f5fc,0x1f5fd,0x1f5fe,
        0x1f5ff,0x1f600,0x1f601,0x1f602,0x1f603,0x1f604,0x1f605,0x1f606,0x1f607,0x1f608,0x1f609,0x1f60a,0x1f60b,0x1f60c,
        0x1f60d,0x1f60e,0x1f60f,0x1f610,0x1f611,0x1f612,0x1f613,0x1f614,0x1f615,0x1f616,0x1f617,0x1f618,0x1f619,0x1f61a,
        0x1f61b,0x1f61c,0x1f61d,0x1f61e,0x1f61f,0x1f620,0x1f621,0x1f622,0x1f623,0x1f624,0x1f625,0x1f626,0x1f627,0x1f628,
        0x1f629,0x1f62a,0x1f62b,0x1f62c,0x1f62d,0x1f62e,0x1f62f,0x1f630,0x1f631,0x1f632,0x1f633,0x1f634,0x1f635,0x1f636,
        0x1f637,0x1f638,0x1f639,0x1f63a,0x1f63b,0x1f63c,0x1f63d,0x1f63e,0x1f63f,0x1f640,0x1f645,0x1f646,0x1f647,0x1f648,
        0x1f649,0x1f64a,0x1f64b,0x1f64c,0x1f64d,0x1f64e,0x1f64f,0x1f680,0x1f681,0x1f682,0x1f683,0x1f684,0x1f685,0x1f686,
        0x1f687,0x1f688,0x1f689,0x1f68a,0x1f68b,0x1f68c,0x1f68d,0x1f68e,0x1f68f,0x1f690,0x1f691,0x1f692,0x1f693,0x1f694,
        0x1f695,0x1f696,0x1f697,0x1f698,0x1f699,0x1f69a,0x1f69b,0x1f69c,0x1f69d,0x1f69e,0x1f69f,0x1f6a0,0x1f6a1,0x1f6a2,
        0x1f6a3,0x1f6a4,0x1f6a5,0x1f6a6,0x1f6a7,0x1f6a8,0x1f6a9,0x1f6aa,0x1f6ab,0x1f6ac,0x1f6ad,0x1f6ae,0x1f6af,0x1f6b0,
        0x1f6b1,0x1f6b2,0x1f6b3,0x1f6b4,0x1f6b5,0x1f6b6,0x1f6b7,0x1f6b8,0x1f6b9,0x1f6ba,0x1f6bb,0x1f6bc,0x1f6bd,0x1f6be,
        0x1f6bf,0x1f6c0,0x1f6c1,0x1f6c2,0x1f6c3,0x1f6c4,0x1f6c5,0x203c,0x2049,/*0x20e3,0x2122,*/0x2139,0x2194,0x2195,0x2196,
        0x2197,0x2198,0x2199,0x21a9,0x21aa,0x231a,0x231b,0x23e9,0x23ea,0x23eb,0x23ec,0x23f0,0x23f3,0x24c2,0x25aa,0x25ab,
        /*0x25b6,0x25c0,*/0x25fb,0x25fc,0x25fd,0x25fe,0x2600,0x2601,0x260e,0x2611,0x2614,0x2615,0x261d,0x263a,0x2648,0x2649,
        0x264a,0x264b,0x264c,0x264d,0x264e,0x264f,0x2650,0x2651,0x2652,0x2653,0x2660,0x2663,0x2665,0x2666,0x2668,0x267b,
        0x267f,0x2693,0x26a0,0x26a1,0x26aa,0x26ab,0x26bd,0x26be,0x26c4,0x26c5,0x26ce,0x26d4,0x26ea,0x26f2,0x26f3,0x26f5,
        0x26fa,0x26fd,0x2702,0x2705,0x2708,0x2709,0x270a,0x270b,0x270c,0x270f,0x2712,0x2714,0x2716,0x2728,0x2733,0x2734,
        0x2744,0x2747,0x274c,0x274e,0x2753,0x2754,0x2755,0x2757,0x2764,0x2795,0x2796,0x2797,0x27a1,0x27b0,0x27bf,0x2934,
        0x2935,0x2b05,0x2b06,0x2b07,0x2b1b,0x2b1c,0x2b50,0x2b55,0x3030,0x303d,0x3297,0x3299,0xfe4e5,0xfe4e6,0xfe4e7,0xfe4e8,
        0xfe4e9,0xfe4ea,0xfe4eb,0xfe4ec,0xfe4ed,0xfe4ee
    ];

    var softBankMapping = {//TODO: some softbank characters are unaccounted for
        0xE24E: 0x00A9,0xE24F: 0x00AE,0xE537: 0x2122,0xE237: 0x2196,0xE236: 0x2197,0xE238: 0x2198,0xE239: 0x2199,0xE23C: 0x23E9,
        0xE23D: 0x23EA,0xE02D: 0x1F559,0xE434: 0x1F687,0xE21A: 0x1F535,0xE21B: 0x1F534,0xE23A: 0x25B6,0xE23B: 0x25C0,0xE04A: 0x2600,
        0xE049: 0x2601,0xE009: 0x260E,0xE04B: 0x2614,0xE045: 0x2615,0xE00F: 0x261D,0xE414: 0x263A,0xE23F: 0x2648,0xE240: 0x2649,
        0xE241: 0x264A,0xE242: 0x264B,0xE243: 0x264C,0xE244: 0x264D,0xE245: 0x264E,0xE246: 0x264F,0xE247: 0x2650,0xE248: 0x2651,
        0xE249: 0x2652,0xE24A: 0x2653,0xE20E: 0x2660,0xE20F: 0x2663,0xE20C: 0x2665,0xE20D: 0x2666,0xE123: 0x2668,0xE20A: 0x267F,
        0xE202: 0x1F6A2,0xE252: 0x26A0,0xE13D: 0x26A1,0xE219: 0x1F534,0xE018: 0x26BD,0xE016: 0x26BE,0xE048: 0x26C4,0xE24B: 0x26CE,
        0xE137: 0x1F6A7,0xE037: 0x26EA,0xE121: 0x26F2,0xE014: 0x26F3,0xE01C: 0x26F5,0xE122: 0x26FA,0xE03A: 0x26FD,0xE313: 0x2702,
        0xE01D: 0x2708,0xE103: 0x1F4E9,0xE010: 0x270A,0xE012: 0x270B,0xE011: 0x270C,0xE301: 0x270F,0xE333: 0x2716,0xE32E: 0x2728,
        0xE206: 0x2733,0xE205: 0x2734,0xE020: 0x2753,0xE336: 0x2754,0xE337: 0x2755,0xE021: 0x2757,0xE022: 0x2764,0xE234: 0x27A1,
        0xE211: 0x27BF,0xE235: 0x2B05,0xE232: 0x2B06,0xE233: 0x2B07,0xE32F: 0x2B50,0xE332: 0x2B55,0xE12C: 0x303D,0xE30D: 0x3297,
        0xE315: 0x3299,0xE12D: 0x1F004,0xE532: 0x1F170,0xE533: 0x1F171,0xE535: 0x1F17E,0xE14F: 0x1F17F,0xE534: 0x1F18E,0xE214: 0x1F192,
        0xE229: 0x1F194,0xE212: 0x1F195,0xE24D: 0x1F197,0xE213: 0x1F199,0xE12E: 0x1F19A,0xE203: 0x1F201,0xE228: 0x1F202,0xE216: 0x1F21A,
        0xE22C: 0x1F22F,0xE22B: 0x1F233,0xE22A: 0x1F235,0xE215: 0x1F236,0xE217: 0x1F237,0xE218: 0x1F238,0xE227: 0x1F239,0xE22D: 0x1F23A,
        0xE226: 0x1F250,0xE443: 0x1F300,0xE43C: 0x1F302,0xE44B: 0x1F303,0xE04D: 0x1F304,0xE449: 0x1F305,0xE146: 0x1F306,0xE44A: 0x1F307,
        0xE44C: 0x1F308,0xE43E: 0x1F30A,0xE04C: 0x1F319,0xE335: 0x1F31F,0xE110: 0x1F340,0xE307: 0x1F334,0xE308: 0x1F335,0xE304: 0x1F337,
        0xE030: 0x1F338,0xE032: 0x1F339,0xE303: 0x1F33A,0xE305: 0x1F33B,0xE444: 0x1F33E,0xE118: 0x1F341,0xE119: 0x1F342,0xE447: 0x1F343,
        0xE349: 0x1F345,0xE34A: 0x1F346,0xE348: 0x1F349,0xE346: 0x1F34A,0xE345: 0x1F34E,0xE347: 0x1F353,0xE120: 0x1F354,0xE33D: 0x1F358,
        0xE342: 0x1F359,0xE33E: 0x1F35A,0xE341: 0x1F35B,0xE340: 0x1F35C,0xE33F: 0x1F35D,0xE339: 0x1F35E,0xE33B: 0x1F35F,0xE33C: 0x1F361,
        0xE343: 0x1F362,0xE344: 0x1F363,0xE33A: 0x1F366,0xE43F: 0x1F367,0xE046: 0x1F370,0xE34C: 0x1F371,0xE34D: 0x1F372,0xE147: 0x1F373,
        0xE043: 0x1F374,0xE338: 0x1F375,0xE30B: 0x1F376,0xE044: 0x1F377,0xE047: 0x1F37A,0xE30C: 0x1F37B,0xE314: 0x1F380,0xE112: 0x1F381,
        0xE34B: 0x1F382,0xE445: 0x1F383,0xE033: 0x1F384,0xE448: 0x1F385,0xE117: 0x1F386,0xE440: 0x1F387,0xE310: 0x1F388,0xE312: 0x1F389,
        0xE143: 0x1F38C,0xE436: 0x1F38D,0xE438: 0x1F38E,0xE43B: 0x1F38F,0xE442: 0x1F390,0xE446: 0x1F391,0xE43A: 0x1F392,0xE439: 0x1F393,
        0xE124: 0x1F3A1,0xE433: 0x1F3A2,0xE019: 0x1F41F,0xE03C: 0x1F3A4,0xE03D: 0x1F3A5,0xE507: 0x1F3A6,0xE30A: 0x1F3A7,0xE502: 0x1F3A8,
        0xE503: 0x1F3A9,0xE125: 0x1F3AB,0xE324: 0x1F3AC,0xE130: 0x1F3AF,0xE133: 0x1F3B0,0xE42C: 0x1F3B1,0xE03E: 0x1F3B5,0xE326: 0x1F3B6,
        0xE040: 0x1F3B7,0xE041: 0x1F3B8,0xE042: 0x1F3BA,0xE015: 0x1F3BE,0xE013: 0x1F3BF,0xE42A: 0x1F3C0,0xE132: 0x1F3C1,0xE115: 0x1F3C3,
        0xE017: 0x1F3C4,0xE131: 0x1F3C6,0xE42B: 0x1F3C8,0xE42D: 0x1F3CA,0xE036: 0x1F3E0,0xE038: 0x1F3E2,0xE153: 0x1F3E3,0xE155: 0x1F3E5,
        0xE14D: 0x1F3E6,0xE154: 0x1F3E7,0xE158: 0x1F3E8,0xE501: 0x1F3E9,0xE156: 0x1F3EA,0xE157: 0x1F3EB,0xE504: 0x1F3EC,0xE508: 0x1F3ED,
        0xE505: 0x1F3EF,0xE506: 0x1F3F0,0xE52D: 0x1F40D,0xE134: 0x1F40E,0xE529: 0x1F411,0xE528: 0x1F412,0xE52E: 0x1F414,0xE52F: 0x1F417,
        0xE526: 0x1F418,0xE10A: 0x1F419,0xE441: 0x1F41A,0xE525: 0x1F41B,0xE522: 0x1F420,0xE523: 0x1F424,0xE521: 0x1F426,0xE055: 0x1F427,
        0xE527: 0x1F428,0xE052: 0x1F436,0xE530: 0x1F42B,0xE520: 0x1F42C,0xE053: 0x1F42D,0xE52B: 0x1F42E,0xE050: 0x1F42F,0xE52C: 0x1F430,
        0xE04F: 0x1F431,0xE054: 0x1F433,0xE01A: 0x1F434,0xE109: 0x1F435,0xE10B: 0x1F437,0xE531: 0x1F438,0xE524: 0x1F439,0xE52A: 0x1F43A,
        0xE051: 0x1F43B,0xE536: 0x1F463,0xE419: 0x1F440,0xE41B: 0x1F442,0xE41A: 0x1F443,0xE41C: 0x1F444,0xE409: 0x1F61D,0xE22E: 0x1F446,
        0xE22F: 0x1F447,0xE230: 0x1F448,0xE231: 0x1F449,0xE00D: 0x1F44A,0xE41E: 0x1F44B,0xE420: 0x1F44C,0xE00E: 0x1F44D,0xE421: 0x1F44E,
        0xE41F: 0x1F44F,0xE422: 0x1F450,0xE10E: 0x1F451,0xE318: 0x1F452,0xE302: 0x1F454,0xE006: 0x1F455,0xE319: 0x1F457,0xE321: 0x1F458,
        0xE322: 0x1F459,0xE323: 0x1F45C,0xE007: 0x1F45E,0xE13E: 0x1F460,0xE31A: 0x1F461,0xE31B: 0x1F462,0xE001: 0x1F466,0xE002: 0x1F467,
        0xE004: 0x1F468,0xE005: 0x1F469,0xE428: 0x1F46B,0xE152: 0x1F46E,0xE429: 0x1F46F,0xE515: 0x1F471,0xE516: 0x1F472,0xE517: 0x1F473,
        0xE518: 0x1F474,0xE519: 0x1F475,0xE51A: 0x1F476,0xE51B: 0x1F477,0xE51C: 0x1F478,0xE11B: 0x1F47B,0xE04E: 0x1F47C,0xE10C: 0x1F47D,
        0xE12B: 0x1F47E,0xE11A: 0x1F47F,0xE11C: 0x1F480,0xE253: 0x1F481,0xE51E: 0x1F482,0xE51F: 0x1F483,0xE31C: 0x1F484,0xE31D: 0x1F485,
        0xE31E: 0x1F486,0xE31F: 0x1F487,0xE320: 0x1F488,0xE13B: 0x1F489,0xE30F: 0x1F48A,0xE003: 0x1F48B,0xE034: 0x1F48D,0xE035: 0x1F48E,
        0xE111: 0x1F48F,0xE306: 0x1F490,0xE425: 0x1F491,0xE43D: 0x1F492,0xE327: 0x1F493,0xE023: 0x1F494,0xE328: 0x1F497,0xE329: 0x1F498,
        0xE32A: 0x1F499,0xE32B: 0x1F49A,0xE32C: 0x1F49B,0xE32D: 0x1F49C,0xE437: 0x1F49D,0xE204: 0x1F49F,0xE10F: 0x1F4A1,0xE334: 0x1F4A2,
        0xE311: 0x1F4A3,0xE13C: 0x1F4A4,0xE331: 0x1F4A6,0xE330: 0x1F4A8,0xE05A: 0x1F4A9,0xE14C: 0x1F4AA,0xE407: 0x1F616,0xE12F: 0x1F4B0,
        0xE149: 0x1F4B1,0xE14A: 0x1F4B9,0xE11F: 0x1F4BA,0xE00C: 0x1F4BB,0xE11E: 0x1F4BC,0xE316: 0x1F4BD,0xE126: 0x1F4BF,0xE127: 0x1F4C0,
        0xE148: 0x1F4C7,0xE00B: 0x1F4E0,0xE14B: 0x1F4E1,0xE142: 0x1F4E2,0xE317: 0x1F4E3,0xE101: 0x1F4EA,0xE102: 0x1F4EE,0xE00A: 0x1F4F1,
        0xE104: 0x1F4F2,0xE250: 0x1F4F3,0xE251: 0x1F4F4,0xE20B: 0x1F4F6,0xE008: 0x1F4F7,0xE12A: 0x1F4FA,0xE128: 0x1F4FB,0xE129: 0x1F4FC,
        0xE141: 0x1F50A,0xE114: 0x1F50D,0xE144: 0x1F512,0xE03F: 0x1F511,0xE145: 0x1F513,0xE325: 0x1F514,0xE24C: 0x1F51D,0xE207: 0x1F51E,
        0xE11D: 0x1F525,0xE116: 0x1F528,0xE113: 0x1F52B,0xE23E: 0x1F52F,0xE209: 0x1F530,0xE031: 0x1F531,0xE024: 0x1F550,0xE025: 0x1F551,
        0xE026: 0x1F552,0xE027: 0x1F553,0xE028: 0x1F554,0xE029: 0x1F555,0xE02A: 0x1F556,0xE02B: 0x1F557,0xE02C: 0x1F558,0xE02E: 0x1F55A,
        0xE02F: 0x1F55B,0xE03B: 0x1F5FB,0xE509: 0x1F5FC,0xE51D: 0x1F5FD,0xE404: 0x1F601,0xE412: 0x1F602,0xE057: 0x1F603,0xE415: 0x1F604,
        0xE40A: 0x1F60C,0xE405: 0x1F609,0xE056: 0x1F60A,0xE106: 0x1F60D,0xE402: 0x1F60F,0xE40E: 0x1F612,0xE108: 0x1F613,0xE403: 0x1F614,
        0xE418: 0x1F618,0xE417: 0x1F61A,0xE105: 0x1F61C,0xE058: 0x1F61E,0xE059: 0x1F620,0xE416: 0x1F621,0xE413: 0x1F622,0xE406: 0x1F623,
        0xE401: 0x1F625,0xE40B: 0x1F628,0xE408: 0x1F62A,0xE411: 0x1F62D,0xE40F: 0x1F630,0xE107: 0x1F631,0xE410: 0x1F632,0xE40D: 0x1F633,
        0xE40C: 0x1F637,0xE423: 0x1F645,0xE424: 0x1F646,0xE426: 0x1F647,0xE427: 0x1F64C,0xE41D: 0x1F64F,0xE10D: 0x1F680,0xE01E: 0x1F683,
        0xE435: 0x1F684,0xE01F: 0x1F685,0xE039: 0x1F689,0xE159: 0x1F68C,0xE150: 0x1F68F,0xE431: 0x1F691,0xE430: 0x1F692,0xE432: 0x1F693,
        0xE15A: 0x1F695,0xE01B: 0x1F697,0xE42E: 0x1F699,0xE42F: 0x1F69A,0xE135: 0x1F6A4,0xE14E: 0x1F6A5,0xE30E: 0x1F6AC,0xE208: 0x1F6AD,
        0xE136: 0x1F6B2,0xE201: 0x1F6B6,0xE138: 0x1F6B9,0xE139: 0x1F6BA,0xE151: 0x1F6BB,0xE13A: 0x1F6BC,0xE140: 0x1F6BD,0xE309: 0x1F6BE,
        0xE13F: 0x1F6C0
    }

    //TODO: support the number key emojis
    var compoundEncoding = [
        //softbank multicharacter encodings
        {
            source:[0xE04A,0xE049],
            result:0x26C5
        },
        {
            source: [0xE103,0xE328],
            result:0x1F48C
        },
        {
            source: [0xE415,0xE331],
            result: 0x1F605
        },
        //flags
        {
            source:[0x1F1E8,0x1F1F3],
            result:0xFE4ED
        },
        {
            source:[0x1F1E9,0x1F1EA],
            result:0xFE4E8
        },
        {
            source:[0x1F1EA,0x1F1F8],
            result:0xFE4EB
        },
        {
            source:[0x1F1EB,0x1F1F7],
            result:0xFE4E7
        },
        {
            source:[0x1F1EC,0x1F1E7],
            result:0xFE4EA
        },
        {
            source:[0x1F1EE,0x1F1F9],
            result:0xFE4E9
        },
        {
            source:[0x1F1EF ,0x1F1F5],
            result:0xFE4E9
        },
        {
            source:[0x1F1F0,0x1F1F7],
            result:0xFE4EE
        },
        {
            source:[0x1F1F7,0x1F1FA],
            result:0xFE4EC
        },
        {
            source:[0x1F1FA,0x1F1F8],
            result:0xFE4E6
        }
    ]

    var emojiRegex = "(";

    for (var i = 0, li = compoundEncoding.length; i < li; i++){
        var emojiChar = "";
        for (var j = 0, lj = compoundEncoding[i].source.length; j < lj; j++){
            emojiChar += fixedFromCharCode(compoundEncoding[i].source[j]);
        }
        emojiRegex += emojiChar;
        emojiRegex += "|";
        emojiIDLookup[emojiChar] = compoundEncoding[i].result.toString(16);
    }

    for (var softBankChar in softBankMapping){
        var emojiChar = fixedFromCharCode(softBankChar);
        emojiRegex +=  emojiChar;
        emojiRegex += "|";
        emojiIDLookup[emojiChar] = softBankMapping[softBankChar].toString(16);
    }

    for (var i = 0, li = emojiUnicodeEntries.length; i < li; i++){
        var emojiChar = fixedFromCharCode(emojiUnicodeEntries[i]);
        emojiRegex += emojiChar;
        if (i < li - 1)
            emojiRegex += "|";
        var emojiId = emojiUnicodeEntries[i].toString(16);
        while (emojiId.length < 4) emojiId = "0" + emojiId;
        emojiIDLookup[emojiChar] = emojiId;
    }

    emojiRegex += ")"

    emojiRegex = new RegExp(emojiRegex,"g");

    function iterateNodesIn(node) {
        var nodes = [], whitespace = /^\s*$/;

        var booleanObject = {set: false};

        function iterateNodes(node) {
            if ((node.hasAttribute != null && node.hasAttribute("contentEditable")) || node.nodeName === "TEXTAREA" || node.nodeName === "INPUT")
                return;
            if (node.nodeType == 3) {
                if (!whitespace.test(node.nodeValue)) {
                    nodes.push(node);
                }
            } else {
                for (var i = 0, len = node.childNodes.length; i < len; ++i) {
                    iterateNodes(node.childNodes[i]);
                }
            }
        }

        iterateNodes(node);

        for (var i = 0, li = nodes.length; i < li; i++) {
            var result = emoji.parseEmoji(nodes[i].wholeText,booleanObject);
            if (booleanObject.set){
                var nodesToInsert = new DOMParser().parseFromString(result,"text/html").children[0].children[1].childNodes;
                for (var j = 0, lj = nodesToInsert.length; j < lj; j++) {
                    nodes[i].parentNode.insertBefore(nodesToInsert[0],nodes[i]);
                }
                nodes[i].remove();
                booleanObject.set = false;
            }
        }
    }


    window.emoji = {
        parseEmoji: function(text,booleanObject){
            if (booleanObject == null) booleanObject = {};
            var ret = "";
            var oldIndex = 0;
            text.replace(emojiRegex, function(match){
                var index = arguments[arguments.length - 2];
                var fullString = arguments[arguments.length - 1];
                ret += fullString.substring(oldIndex,index);
                oldIndex = index + match.length;
                var emojiId = emojiIDLookup[match];
                ret += "<i class='emojijs-emoji-" + emojiId + "'></i>";
                booleanObject.set = true;
            });
            ret += text.substring(oldIndex);

            return ret;
        },
        emojifyWholePage: function() {
            function hook() {
                var observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        for (var i = 0, li = mutation.addedNodes.length; i < li; i++) {
                            emoji.emojify(mutation.addedNodes[i]);
                        }
                    });
                });
                var config = { subtree: true, characterData: true, childList:true };
                var bodyElement = document.getElementsByTagName("body")[0];
                emoji.emojify(bodyElement);
                observer.observe(bodyElement, config);

            }
            var interval = setInterval(function(){
                if (document.readyState == "complete"){
                    clearInterval(interval);
                    hook();
                }
            }, 10);
        },
        emojify: function(node) {
            iterateNodesIn(node);
        }
    }


    if (typeof jQuery !== "undefined"){
        (function($){



            $.fn.emojify = function(){
                return this.each(function(){
                    emoji.emojify(this);
                });
            }

            $.emojifyWholePage = function(){
                emoji.emojifyWholePage();
            };

        })(jQuery);
    }
})();
emoji.emojifyWholePage();