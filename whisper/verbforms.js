const verbForms = {
    "join": {
        "past": "joined",
        "gerund": "joining",
        "present_3s": "joins",
        "present_non_3s": "join",
        "participle": "joined"
    },
    "name": {
        "past": "named",
        "gerund": "naming",
        "present_3s": "names",
        "present_non_3s": "name",
        "participle": "named"
    },
    "use": {
        "past": "used",
        "gerund": "using",
        "present_3s": "uses",
        "present_non_3s": "use",
        "participle": "used"
    },
    "make": {
        "past": "maked",
        "gerund": "making",
        "present_3s": "makes",
        "present_non_3s": "make",
        "participle": "maked"
    },
    "have": {
        "past": "had",
        "gerund": "having",
        "present_3s": "haves",
        "present_non_3s": "have",
        "participle": "had"
    },
    "cause": {
        "past": "caused",
        "gerund": "causing",
        "present_3s": "causes",
        "present_non_3s": "cause",
        "participle": "caused"
    },
    "expose": {
        "past": "exposed",
        "gerund": "exposing",
        "present_3s": "exposes",
        "present_non_3s": "expose",
        "participle": "exposed"
    },
    "report": {
        "past": "reported",
        "gerund": "reporting",
        "present_3s": "reports",
        "present_non_3s": "report",
        "participle": "reported"
    },
    "enter": {
        "past": "entered",
        "gerund": "entering",
        "present_3s": "enters",
        "present_non_3s": "enter",
        "participle": "entered"
    },
    "show": {
        "past": "showed",
        "gerund": "showing",
        "present_3s": "shows",
        "present_non_3s": "show",
        "participle": "shown"
    },
    "say": {
        "past": "said",
        "gerund": "saying",
        "present_3s": "says",
        "present_non_3s": "say",
        "participle": "said"
    },
    "stop": {
        "past": "stopped",
        "gerund": "stoping",
        "present_3s": "stops",
        "present_non_3s": "stop",
        "participle": "stopped"
    },
    "appear": {
        "past": "appeared",
        "gerund": "appearing",
        "present_3s": "appears",
        "present_non_3s": "appear",
        "participle": "appeared"
    },
    "bring": {
        "past": "brought",
        "gerund": "bringing",
        "present_3s": "brings",
        "present_non_3s": "bring",
        "participle": "brought"
    },
    "talk": {
        "past": "talked",
        "gerund": "talking",
        "present_3s": "talks",
        "present_non_3s": "talk",
        "participle": "talked"
    },
    "study": {
        "past": "studied",
        "gerund": "studying",
        "present_3s": "studies",
        "present_non_3s": "study",
        "participle": "studied"
    },
    "lead": {
        "past": "led",
        "gerund": "leading",
        "present_3s": "leads",
        "present_non_3s": "lead",
        "participle": "led"
    },
    "replace": {
        "past": "replaced",
        "gerund": "replacing",
        "present_3s": "replaces",
        "present_non_3s": "replace",
        "participle": "replaced"
    },
    "sell": {
        "past": "sold",
        "gerund": "selling",
        "present_3s": "sells",
        "present_non_3s": "sell",
        "participle": "sold"
    },
    "work": {
        "past": "worked",
        "gerund": "working",
        "present_3s": "works",
        "present_non_3s": "work",
        "participle": "worked"
    },
    "die": {
        "past": "died",
        "gerund": "dying",
        "present_3s": "dies",
        "present_non_3s": "die",
        "participle": "died"
    },
    "survive": {
        "past": "survived",
        "gerund": "surviving",
        "present_3s": "survives",
        "present_non_3s": "survive",
        "participle": "survived"
    },
    "include": {
        "past": "included",
        "gerund": "including",
        "present_3s": "includes",
        "present_non_3s": "include",
        "participle": "included"
    },
    "diagnose": {
        "past": "diagnosed",
        "gerund": "diagnosing",
        "present_3s": "diagnoses",
        "present_non_3s": "diagnose",
        "participle": "diagnosed"
    },
    "expect": {
        "past": "expected",
        "gerund": "expecting",
        "present_3s": "expects",
        "present_non_3s": "expect",
        "participle": "expected"
    },
    "own": {
        "past": "owned",
        "gerund": "owning",
        "present_3s": "owns",
        "present_non_3s": "own",
        "participle": "owned"
    },
    "support": {
        "past": "supported",
        "gerund": "supporting",
        "present_3s": "supports",
        "present_non_3s": "support",
        "participle": "supported"
    },
    "regulate": {
        "past": "regulated",
        "gerund": "regulating",
        "present_3s": "regulates",
        "present_non_3s": "regulate",
        "participle": "regulated"
    },
    "find": {
        "past": "found",
        "gerund": "finding",
        "present_3s": "finds",
        "present_non_3s": "find",
        "participle": "found"
    },
    "do": {
        "past": "did",
        "gerund": "doing",
        "present_3s": "dos",
        "present_non_3s": "do",
        "participle": "done"
    },
    "classify": {
        "past": "classifyed",
        "gerund": "classifying",
        "present_3s": "classifies",
        "present_non_3s": "classify",
        "participle": "classified"
    },
    "reject": {
        "past": "rejected",
        "gerund": "rejecting",
        "present_3s": "rejects",
        "present_non_3s": "reject",
        "participle": "rejected"
    },
    "explain": {
        "past": "explained",
        "gerund": "explaining",
        "present_3s": "explains",
        "present_non_3s": "explain",
        "participle": "explained"
    },
    "impose": {
        "past": "imposed",
        "gerund": "imposing",
        "present_3s": "imposes",
        "present_non_3s": "impose",
        "participle": "imposed"
    },
    "remain": {
        "past": "remained",
        "gerund": "remaining",
        "present_3s": "remains",
        "present_non_3s": "remain",
        "participle": "remained"
    },
    "outlaw": {
        "past": "outlawed",
        "gerund": "outlawing",
        "present_3s": "outlaws",
        "present_non_3s": "outlaw",
        "participle": "outlawed"
    },
    "dump": {
        "past": "dumped",
        "gerund": "dumping",
        "present_3s": "dumps",
        "present_non_3s": "dump",
        "participle": "dumped"
    },
    "import": {
        "past": "imported",
        "gerund": "importing",
        "present_3s": "imports",
        "present_non_3s": "import",
        "participle": "imported"
    },
    "pour": {
        "past": "poured",
        "gerund": "pouring",
        "present_3s": "pours",
        "present_non_3s": "pour",
        "participle": "poured"
    },
    "describe": {
        "past": "described",
        "gerund": "describing",
        "present_3s": "describes",
        "present_non_3s": "describe",
        "participle": "described"
    },
    "ventilate": {
        "past": "ventilated",
        "gerund": "ventilating",
        "present_3s": "ventilates",
        "present_non_3s": "ventilate",
        "participle": "ventilated"
    },
    "contract": {
        "past": "contracted",
        "gerund": "contracting",
        "present_3s": "contracts",
        "present_non_3s": "contract",
        "participle": "contracted"
    },
    "recognize": {
        "past": "recognized",
        "gerund": "recognizing",
        "present_3s": "recognizes",
        "present_non_3s": "recognize",
        "participle": "recognized"
    },
    "take": {
        "past": "took",
        "gerund": "taking",
        "present_3s": "takes",
        "present_non_3s": "take",
        "participle": "taken"
    },
    "continue": {
        "past": "continued",
        "gerund": "continuing",
        "present_3s": "continues",
        "present_non_3s": "continue",
        "participle": "continued"
    },
    "slide": {
        "past": "slid",
        "gerund": "sliding",
        "present_3s": "slides",
        "present_non_3s": "slide",
        "participle": "slid"
    },
    "track": {
        "past": "tracked",
        "gerund": "tracking",
        "present_3s": "tracks",
        "present_non_3s": "track",
        "participle": "tracked"
    },
    "ease": {
        "past": "eased",
        "gerund": "easing",
        "present_3s": "eases",
        "present_non_3s": "ease",
        "participle": "eased"
    },
    "end": {
        "past": "ended",
        "gerund": "ending",
        "present_3s": "ends",
        "present_non_3s": "end",
        "participle": "ended"
    },
    "assume": {
        "past": "assumed",
        "gerund": "assuming",
        "present_3s": "assumes",
        "present_non_3s": "assume",
        "participle": "assumed"
    },
    "lengthen": {
        "past": "lengthened",
        "gerund": "lengthening",
        "present_3s": "lengthens",
        "present_non_3s": "lengthen",
        "participle": "lengthened"
    },
    "think": {
        "past": "thought",
        "gerund": "thinking",
        "present_3s": "thinks",
        "present_non_3s": "think",
        "participle": "thought"
    },
    "indicate": {
        "past": "indicated",
        "gerund": "indicating",
        "present_3s": "indicates",
        "present_non_3s": "indicate",
        "participle": "indicated"
    },
    "decline": {
        "past": "declined",
        "gerund": "declining",
        "present_3s": "declines",
        "present_non_3s": "decline",
        "participle": "declined"
    },
    "permit": {
        "past": "permitted",
        "gerund": "permitting",
        "present_3s": "permits",
        "present_non_3s": "permit",
        "participle": "permitted"
    },
    "retain": {
        "past": "retained",
        "gerund": "retaining",
        "present_3s": "retains",
        "present_non_3s": "retain",
        "participle": "retained"
    },
    "consider": {
        "past": "considered",
        "gerund": "considering",
        "present_3s": "considers",
        "present_non_3s": "consider",
        "participle": "considered"
    },
    "rise": {
        "past": "rose",
        "gerund": "rising",
        "present_3s": "rises",
        "present_non_3s": "rise",
        "participle": "risen"
    },
    "capture": {
        "past": "captured",
        "gerund": "capturing",
        "present_3s": "captures",
        "present_non_3s": "capture",
        "participle": "captured"
    },
    "watch": {
        "past": "watched",
        "gerund": "watching",
        "present_3s": "watches",
        "present_non_3s": "watch",
        "participle": "watched"
    },
    "reach": {
        "past": "reached",
        "gerund": "reaching",
        "present_3s": "reaches",
        "present_non_3s": "reach",
        "participle": "reached"
    },
    "blip": {
        "past": "blipped",
        "gerund": "blipping",
        "present_3s": "blips",
        "present_non_3s": "blip",
        "participle": "blipped"
    },
    "nan": {
        "past": "plunged",
        "gerund": "plunging",
        "present_3s": "nan",
        "present_non_3s": "nan",
        "participle": "plunged"
    },
    "beat": {
        "past": "beat",
        "gerund": "beating",
        "present_3s": "beats",
        "present_non_3s": "beat",
        "participle": "beaten"
    },
    "vary": {
        "past": "varied",
        "gerund": "varying",
        "present_3s": "varys",
        "present_non_3s": "vary",
        "participle": "varied"
    },
    "go": {
        "past": "went",
        "gerund": "going",
        "present_3s": "goes",
        "present_non_3s": "go",
        "participle": "gone"
    },
    "yield": {
        "past": "yielded",
        "gerund": "yielding",
        "present_3s": "yields",
        "present_non_3s": "yield",
        "participle": "yielded"
    },
    "invest": {
        "past": "invested",
        "gerund": "investing",
        "present_3s": "invests",
        "present_non_3s": "invest",
        "participle": "invested"
    },
    "waive": {
        "past": "waived",
        "gerund": "waiving",
        "present_3s": "waives",
        "present_non_3s": "waive",
        "participle": "waived"
    },
    "boost": {
        "past": "boosted",
        "gerund": "boosting",
        "present_3s": "boosts",
        "present_non_3s": "boost",
        "participle": "boosted"
    },
    "fall": {
        "past": "fell",
        "gerund": "falling",
        "present_3s": "falls",
        "present_non_3s": "fall",
        "participle": "fallen"
    },
    "hold": {
        "past": "held",
        "gerund": "holding",
        "present_3s": "holds",
        "present_non_3s": "hold",
        "participle": "held"
    },
    "elect": {
        "past": "elected",
        "gerund": "electing",
        "present_3s": "elects",
        "present_non_3s": "elect",
        "participle": "elected"
    },
    "succeed": {
        "past": "succeeded",
        "gerund": "succeeding",
        "present_3s": "succeeds",
        "present_non_3s": "succeed",
        "participle": "succeeded"
    },
    "resign": {
        "past": "resigned",
        "gerund": "resigning",
        "present_3s": "resigns",
        "present_non_3s": "resign",
        "participle": "resigned"
    },
    "approve": {
        "past": "approved",
        "gerund": "approving",
        "present_3s": "approves",
        "present_non_3s": "approve",
        "participle": "approved"
    },
    "obtain": {
        "past": "obtained",
        "gerund": "obtaining",
        "present_3s": "obtains",
        "present_non_3s": "obtain",
        "participle": "obtained"
    },
    "complete": {
        "past": "completed",
        "gerund": "completing",
        "present_3s": "completes",
        "present_non_3s": "complete",
        "participle": "completed"
    },
    "base": {
        "past": "based",
        "gerund": "basing",
        "present_3s": "bases",
        "present_non_3s": "base",
        "participle": "based"
    },
    "employ": {
        "past": "employed",
        "gerund": "employing",
        "present_3s": "employs",
        "present_non_3s": "employ",
        "participle": "employed"
    },
    "suspend": {
        "past": "suspended",
        "gerund": "suspending",
        "present_3s": "suspends",
        "present_non_3s": "suspend",
        "participle": "suspended"
    },
    "lift": {
        "past": "lifted",
        "gerund": "lifting",
        "present_3s": "lifts",
        "present_non_3s": "lift",
        "participle": "lifted"
    },
    "issue": {
        "past": "issued",
        "gerund": "issuing",
        "present_3s": "issues",
        "present_non_3s": "issue",
        "participle": "issued"
    },
    "drop": {
        "past": "dropped",
        "gerund": "droping",
        "present_3s": "drops",
        "present_non_3s": "drop",
        "participle": "dropped"
    },
    "ensnarl": {
        "past": "ensnarled",
        "gerund": "ensnarling",
        "present_3s": "ensnarls",
        "present_non_3s": "ensnarl",
        "participle": "ensnarled"
    },
    "cut": {
        "past": "cut",
        "gerund": "cutting",
        "present_3s": "cuts",
        "present_non_3s": "cut",
        "participle": "cut"
    },
    "vote": {
        "past": "voted",
        "gerund": "voting",
        "present_3s": "votes",
        "present_non_3s": "vote",
        "participle": "voted"
    },
    "raise": {
        "past": "raised",
        "gerund": "raising",
        "present_3s": "raises",
        "present_non_3s": "raise",
        "participle": "raised"
    },
    "act": {
        "past": "acted",
        "gerund": "acting",
        "present_3s": "acts",
        "present_non_3s": "act",
        "participle": "acted"
    },
    "default": {
        "past": "defaulted",
        "gerund": "defaulting",
        "present_3s": "defaults",
        "present_non_3s": "default",
        "participle": "defaulted"
    },
    "oversee": {
        "past": "overseed",
        "gerund": "overseeing",
        "present_3s": "oversees",
        "present_non_3s": "oversee",
        "participle": "overseed"
    },
    "jet": {
        "past": "jeted",
        "gerund": "jeting",
        "present_3s": "jets",
        "present_non_3s": "jet",
        "participle": "jeted"
    },
    "settle": {
        "past": "settled",
        "gerund": "settling",
        "present_3s": "settles",
        "present_non_3s": "settle",
        "participle": "settled"
    },
    "decide": {
        "past": "decided",
        "gerund": "deciding",
        "present_3s": "decides",
        "present_non_3s": "decide",
        "participle": "decided"
    },
    "treat": {
        "past": "treated",
        "gerund": "treating",
        "present_3s": "treats",
        "present_non_3s": "treat",
        "participle": "treated"
    },
    "prove": {
        "past": "proved",
        "gerund": "proving",
        "present_3s": "proves",
        "present_non_3s": "prove",
        "participle": "proven"
    },
    "expand": {
        "past": "expanded",
        "gerund": "expanding",
        "present_3s": "expands",
        "present_non_3s": "expand",
        "participle": "expanded"
    },
    "receive": {
        "past": "received",
        "gerund": "receiving",
        "present_3s": "receives",
        "present_non_3s": "receive",
        "participle": "received"
    },
    "follow": {
        "past": "followed",
        "gerund": "following",
        "present_3s": "follows",
        "present_non_3s": "follow",
        "participle": "followed"
    },
    "race": {
        "past": "raced",
        "gerund": "racing",
        "present_3s": "races",
        "present_non_3s": "race",
        "participle": "raced"
    },
    "welcome": {
        "past": "welcomed",
        "gerund": "welcoming",
        "present_3s": "welcomes",
        "present_non_3s": "welcome",
        "participle": "welcomed"
    },
    "ban": {
        "past": "baned",
        "gerund": "banning",
        "present_3s": "bans",
        "present_non_3s": "ban",
        "participle": "banned"
    },
    "haul": {
        "past": "hauled",
        "gerund": "hauling",
        "present_3s": "hauls",
        "present_non_3s": "haul",
        "participle": "hauled"
    },
    "drool": {
        "past": "drooled",
        "gerund": "drooling",
        "present_3s": "drools",
        "present_non_3s": "drool",
        "participle": "drooled"
    },
    "point": {
        "past": "pointed",
        "gerund": "pointing",
        "present_3s": "points",
        "present_non_3s": "point",
        "participle": "pointed"
    },
    "squeeze": {
        "past": "squeezed",
        "gerund": "squeezing",
        "present_3s": "squeezes",
        "present_non_3s": "squeeze",
        "participle": "squeezed"
    },
    "board": {
        "past": "boarded",
        "gerund": "boarding",
        "present_3s": "boards",
        "present_non_3s": "board",
        "participle": "boarded"
    },
    "feed": {
        "past": "fed",
        "gerund": "feeding",
        "present_3s": "feeds",
        "present_non_3s": "feed",
        "participle": "fed"
    },
    "know": {
        "past": "knew",
        "gerund": "knowing",
        "present_3s": "knows",
        "present_non_3s": "know",
        "participle": "known"
    },
    "eat": {
        "past": "ate",
        "gerund": "eating",
        "present_3s": "eats",
        "present_non_3s": "eat",
        "participle": "eaten"
    },
    "give": {
        "past": "gave",
        "gerund": "giving",
        "present_3s": "gives",
        "present_non_3s": "give",
        "participle": "given"
    },
    "stand": {
        "past": "stood",
        "gerund": "standing",
        "present_3s": "stands",
        "present_non_3s": "stand",
        "participle": "stood"
    },
    "tempt": {
        "past": "tempted",
        "gerund": "tempting",
        "present_3s": "tempts",
        "present_non_3s": "tempt",
        "participle": "tempted"
    },
    "return": {
        "past": "returned",
        "gerund": "returning",
        "present_3s": "returns",
        "present_non_3s": "return",
        "participle": "returned"
    },
    "look": {
        "past": "looked",
        "gerund": "looking",
        "present_3s": "looks",
        "present_non_3s": "look",
        "participle": "looked"
    },
    "register": {
        "past": "registered",
        "gerund": "registering",
        "present_3s": "registers",
        "present_non_3s": "register",
        "participle": "registered"
    },
    "reflect": {
        "past": "reflected",
        "gerund": "reflecting",
        "present_3s": "reflects",
        "present_non_3s": "reflect",
        "participle": "reflected"
    },
    "release": {
        "past": "released",
        "gerund": "releasing",
        "present_3s": "releases",
        "present_non_3s": "release",
        "participle": "released"
    },
    "cast": {
        "past": "cast",
        "gerund": "casting",
        "present_3s": "casts",
        "present_non_3s": "cast",
        "participle": "cast"
    },
    "increase": {
        "past": "increased",
        "gerund": "increasing",
        "present_3s": "increases",
        "present_non_3s": "increase",
        "participle": "increased"
    },
    "begin": {
        "past": "began",
        "gerund": "beginning",
        "present_3s": "begins",
        "present_non_3s": "begin",
        "participle": "begun"
    },
    "record": {
        "past": "recorded",
        "gerund": "recording",
        "present_3s": "records",
        "present_non_3s": "record",
        "participle": "recorded"
    },
    "try": {
        "past": "tried",
        "gerund": "trying",
        "present_3s": "trys",
        "present_non_3s": "try",
        "participle": "tried"
    },
    "keep": {
        "past": "kept",
        "gerund": "keeping",
        "present_3s": "keeps",
        "present_non_3s": "keep",
        "participle": "kept"
    },
    "announce": {
        "past": "announced",
        "gerund": "announcing",
        "present_3s": "announces",
        "present_non_3s": "announce",
        "participle": "announced"
    },
    "introduce": {
        "past": "introduced",
        "gerund": "introducing",
        "present_3s": "introduces",
        "present_non_3s": "introduce",
        "participle": "introduced"
    },
    "offer": {
        "past": "offered",
        "gerund": "offering",
        "present_3s": "offers",
        "present_non_3s": "offer",
        "participle": "offered"
    },
    "become": {
        "past": "became",
        "gerund": "becoming",
        "present_3s": "becomes",
        "present_non_3s": "become",
        "participle": "become"
    },
    "underscore": {
        "past": "underscored",
        "gerund": "underscoring",
        "present_3s": "underscores",
        "present_non_3s": "underscore",
        "participle": "underscored"
    },
    "cost": {
        "past": "costed",
        "gerund": "costing",
        "present_3s": "costs",
        "present_non_3s": "cost",
        "participle": "costed"
    },
    "lower": {
        "past": "lowered",
        "gerund": "lowering",
        "present_3s": "lowers",
        "present_non_3s": "lower",
        "participle": "lowered"
    },
    "credit": {
        "past": "credited",
        "gerund": "crediting",
        "present_3s": "credits",
        "present_non_3s": "credit",
        "participle": "credited"
    },
    "reward": {
        "past": "rewarded",
        "gerund": "rewarding",
        "present_3s": "rewards",
        "present_non_3s": "reward",
        "participle": "rewarded"
    },
    "exceed": {
        "past": "exceeded",
        "gerund": "exceeding",
        "present_3s": "exceeds",
        "present_non_3s": "exceed",
        "participle": "exceeded"
    },
    "spend": {
        "past": "spent",
        "gerund": "spending",
        "present_3s": "spends",
        "present_non_3s": "spend",
        "participle": "spent"
    },
    "shore": {
        "past": "shored",
        "gerund": "shoring",
        "present_3s": "shores",
        "present_non_3s": "shore",
        "participle": "shored"
    },
    "total": {
        "past": "totaled",
        "gerund": "totaling",
        "present_3s": "totals",
        "present_non_3s": "total",
        "participle": "totaled"
    },
    "pay": {
        "past": "paid",
        "gerund": "paying",
        "present_3s": "pays",
        "present_non_3s": "pay",
        "participle": "paid"
    },
    "gain": {
        "past": "gained",
        "gerund": "gaining",
        "present_3s": "gains",
        "present_non_3s": "gain",
        "participle": "gained"
    },
    "bow": {
        "past": "bowed",
        "gerund": "bowing",
        "present_3s": "bows",
        "present_non_3s": "bow",
        "participle": "bowed"
    },
    "justify": {
        "past": "justified",
        "gerund": "justifying",
        "present_3s": "justifies",
        "present_non_3s": "justify",
        "participle": "justified"
    },
    "leave": {
        "past": "left",
        "gerund": "leaving",
        "present_3s": "leaves",
        "present_non_3s": "leave",
        "participle": "left"
    },
    "propose": {
        "past": "proposed",
        "gerund": "proposing",
        "present_3s": "proposes",
        "present_non_3s": "propose",
        "participle": "proposed"
    },
    "acquire": {
        "past": "acquired",
        "gerund": "acquiring",
        "present_3s": "acquires",
        "present_non_3s": "acquire",
        "participle": "acquired"
    },
    "place": {
        "past": "placed",
        "gerund": "placing",
        "present_3s": "places",
        "present_non_3s": "place",
        "participle": "placed"
    },
    "value": {
        "past": "valued",
        "gerund": "valuing",
        "present_3s": "values",
        "present_non_3s": "value",
        "participle": "valued"
    },
    "suffer": {
        "past": "suffered",
        "gerund": "suffering",
        "present_3s": "suffers",
        "present_non_3s": "suffer",
        "participle": "suffered"
    },
    "relate": {
        "past": "related",
        "gerund": "relating",
        "present_3s": "relates",
        "present_non_3s": "relate",
        "participle": "related"
    },
    "come": {
        "past": "came",
        "gerund": "coming",
        "present_3s": "comes",
        "present_non_3s": "come",
        "participle": "come"
    },
    "seem": {
        "past": "seemed",
        "gerund": "seeming",
        "present_3s": "seems",
        "present_non_3s": "seem",
        "participle": "seemed"
    },
    "get": {
        "past": "got",
        "gerund": "getting",
        "present_3s": "gets",
        "present_non_3s": "get",
        "participle": "got"
    },
    "add": {
        "past": "added",
        "gerund": "adding",
        "present_3s": "adds",
        "present_non_3s": "add",
        "participle": "added"
    },
    "note": {
        "past": "noted",
        "gerund": "noting",
        "present_3s": "notes",
        "present_non_3s": "note",
        "participle": "noted"
    },
    "worry": {
        "past": "worried",
        "gerund": "worrying",
        "present_3s": "worries",
        "present_non_3s": "worry",
        "participle": "worried"
    },
    "emerge": {
        "past": "emerged",
        "gerund": "emerging",
        "present_3s": "emerges",
        "present_non_3s": "emerge",
        "participle": "emerged"
    },
    "attract": {
        "past": "attracted",
        "gerund": "attracting",
        "present_3s": "attracts",
        "present_non_3s": "attract",
        "participle": "attracted"
    },
    "withdraw": {
        "past": "withdrew",
        "gerund": "withdrawing",
        "present_3s": "withdraws",
        "present_non_3s": "withdraw",
        "participle": "withdrawn"
    },
    "speed": {
        "past": "speeded",
        "gerund": "speeding",
        "present_3s": "speeds",
        "present_non_3s": "speed",
        "participle": "speeded"
    },
    "complicate": {
        "past": "complicated",
        "gerund": "complicating",
        "present_3s": "complicates",
        "present_non_3s": "complicate",
        "participle": "complicated"
    },
    "assert": {
        "past": "asserted",
        "gerund": "asserting",
        "present_3s": "asserts",
        "present_non_3s": "assert",
        "participle": "asserted"
    },
    "turn": {
        "past": "turned",
        "gerund": "turning",
        "present_3s": "turns",
        "present_non_3s": "turn",
        "participle": "turned"
    },
    "seek": {
        "past": "sought",
        "gerund": "seeking",
        "present_3s": "seeks",
        "present_non_3s": "seek",
        "participle": "sought"
    },
    "refile": {
        "past": "refiled",
        "gerund": "refiling",
        "present_3s": "refiles",
        "present_non_3s": "refile",
        "participle": "refiled"
    },
    "hope": {
        "past": "hoped",
        "gerund": "hoping",
        "present_3s": "hopes",
        "present_non_3s": "hope",
        "participle": "hoped"
    },
    "expedite": {
        "past": "expedited",
        "gerund": "expediting",
        "present_3s": "expedites",
        "present_non_3s": "expedite",
        "participle": "expedited"
    },
    "close": {
        "past": "closed",
        "gerund": "closing",
        "present_3s": "closes",
        "present_non_3s": "close",
        "participle": "closed"
    },
    "operate": {
        "past": "operated",
        "gerund": "operating",
        "present_3s": "operates",
        "present_non_3s": "operate",
        "participle": "operated"
    },
    "retire": {
        "past": "retired",
        "gerund": "retiring",
        "present_3s": "retires",
        "present_non_3s": "retire",
        "participle": "retired"
    },
    "order": {
        "past": "ordered",
        "gerund": "ordering",
        "present_3s": "orders",
        "present_non_3s": "order",
        "participle": "ordered"
    },
    "refund": {
        "past": "refunded",
        "gerund": "refunding",
        "present_3s": "refunds",
        "present_non_3s": "refund",
        "participle": "refunded"
    },
    "collect": {
        "past": "collected",
        "gerund": "collecting",
        "present_3s": "collects",
        "present_non_3s": "collect",
        "participle": "collected"
    },
    "require": {
        "past": "required",
        "gerund": "requiring",
        "present_3s": "requires",
        "present_non_3s": "require",
        "participle": "required"
    },
    "move": {
        "past": "moved",
        "gerund": "moving",
        "present_3s": "moves",
        "present_non_3s": "move",
        "participle": "moved"
    },
    "entertain": {
        "past": "entertained",
        "gerund": "entertaining",
        "present_3s": "entertains",
        "present_non_3s": "entertain",
        "participle": "entertained"
    },
    "block": {
        "past": "blocked",
        "gerund": "blocking",
        "present_3s": "blocks",
        "present_non_3s": "block",
        "participle": "blocked"
    },
    "appeal": {
        "past": "appealed",
        "gerund": "appealing",
        "present_3s": "appeals",
        "present_non_3s": "appeal",
        "participle": "appealed"
    },
    "determine": {
        "past": "determined",
        "gerund": "determining",
        "present_3s": "determines",
        "present_non_3s": "determine",
        "participle": "determined"
    },
    "force": {
        "past": "forced",
        "gerund": "forcing",
        "present_3s": "forces",
        "present_non_3s": "force",
        "participle": "forced"
    },
    "slash": {
        "past": "slashed",
        "gerund": "slashing",
        "present_3s": "slashs",
        "present_non_3s": "slash",
        "participle": "slashed"
    },
    "change": {
        "past": "changed",
        "gerund": "changing",
        "present_3s": "changes",
        "present_non_3s": "change",
        "participle": "changed"
    },
    "uphold": {
        "past": "upheld",
        "gerund": "upholding",
        "present_3s": "upholds",
        "present_non_3s": "uphold",
        "participle": "upheld"
    },
    "audit": {
        "past": "audited",
        "gerund": "auditing",
        "present_3s": "audits",
        "present_non_3s": "audit",
        "participle": "audited"
    },
    "rule": {
        "past": "ruled",
        "gerund": "ruling",
        "present_3s": "rules",
        "present_non_3s": "rule",
        "participle": "ruled"
    },
    "set": {
        "past": "set",
        "gerund": "setting",
        "present_3s": "sets",
        "present_non_3s": "set",
        "participle": "set"
    },
    "face": {
        "past": "faced",
        "gerund": "facing",
        "present_3s": "faces",
        "present_non_3s": "face",
        "participle": "faced"
    },
    "estimate": {
        "past": "estimated",
        "gerund": "estimating",
        "present_3s": "estimates",
        "present_non_3s": "estimate",
        "participle": "estimated"
    },
    "involve": {
        "past": "involved",
        "gerund": "involving",
        "present_3s": "involves",
        "present_non_3s": "involve",
        "participle": "involved"
    },
    "compare": {
        "past": "compared",
        "gerund": "comparing",
        "present_3s": "compares",
        "present_non_3s": "compare",
        "participle": "compared"
    },
    "benefit": {
        "past": "benefited",
        "gerund": "benefiting",
        "present_3s": "benefits",
        "present_non_3s": "benefit",
        "participle": "benefited"
    },
    "arise": {
        "past": "arose",
        "gerund": "arising",
        "present_3s": "arises",
        "present_non_3s": "arise",
        "participle": "arose"
    },
    "double": {
        "past": "doubled",
        "gerund": "doubling",
        "present_3s": "doubles",
        "present_non_3s": "double",
        "participle": "doubled"
    },
    "open": {
        "past": "opened",
        "gerund": "opening",
        "present_3s": "opens",
        "present_non_3s": "open",
        "participle": "opened"
    },
    "manufacture": {
        "past": "manufactured",
        "gerund": "manufacturing",
        "present_3s": "manufactures",
        "present_non_3s": "manufacture",
        "participle": "manufactured"
    },
    "locate": {
        "past": "located",
        "gerund": "locating",
        "present_3s": "locates",
        "present_non_3s": "locate",
        "participle": "located"
    },
    "help": {
        "past": "helped",
        "gerund": "helping",
        "present_3s": "helps",
        "present_non_3s": "help",
        "participle": "helped"
    },
    "diversify": {
        "past": "diversified",
        "gerund": "diversifying",
        "present_3s": "diversifies",
        "present_non_3s": "diversify",
        "participle": "diversified"
    },
    "produce": {
        "past": "produced",
        "gerund": "producing",
        "present_3s": "produces",
        "present_non_3s": "produce",
        "participle": "produced"
    },
    "depend": {
        "past": "depended",
        "gerund": "depending",
        "present_3s": "depends",
        "present_non_3s": "depend",
        "participle": "depended"
    },
    "tie": {
        "past": "tied",
        "gerund": "tying",
        "present_3s": "ties",
        "present_non_3s": "tie",
        "participle": "tied"
    },
    "file": {
        "past": "filed",
        "gerund": "filing",
        "present_3s": "files",
        "present_non_3s": "file",
        "participle": "filed"
    },
    "disclose": {
        "past": "disclosed",
        "gerund": "disclosing",
        "present_3s": "discloses",
        "present_non_3s": "disclose",
        "participle": "disclosed"
    },
    "provide": {
        "past": "provided",
        "gerund": "providing",
        "present_3s": "provides",
        "present_non_3s": "provide",
        "participle": "provided"
    },
    "head": {
        "past": "headed",
        "gerund": "heading",
        "present_3s": "heads",
        "present_non_3s": "head",
        "participle": "headed"
    },
    "scrap": {
        "past": "scraped",
        "gerund": "scraping",
        "present_3s": "scraps",
        "present_non_3s": "scrap",
        "participle": "scrapped"
    },
    "anticipate": {
        "past": "anticipated",
        "gerund": "anticipating",
        "present_3s": "anticipates",
        "present_non_3s": "anticipate",
        "participle": "anticipated"
    },
    "attach": {
        "past": "attached",
        "gerund": "attaching",
        "present_3s": "attaches",
        "present_non_3s": "attach",
        "participle": "attached"
    },
    "want": {
        "past": "wanted",
        "gerund": "wanting",
        "present_3s": "wants",
        "present_non_3s": "want",
        "participle": "wanted"
    },
    "fund": {
        "past": "funded",
        "gerund": "funding",
        "present_3s": "funds",
        "present_non_3s": "fund",
        "participle": "funded"
    },
    "call": {
        "past": "called",
        "gerund": "calling",
        "present_3s": "calls",
        "present_non_3s": "call",
        "participle": "called"
    },
    "jump": {
        "past": "jumped",
        "gerund": "jumping",
        "present_3s": "jumps",
        "present_non_3s": "jump",
        "participle": "jumped"
    },
    "link": {
        "past": "linked",
        "gerund": "linking",
        "present_3s": "links",
        "present_non_3s": "link",
        "participle": "linked"
    },
    "believe": {
        "past": "believed",
        "gerund": "believing",
        "present_3s": "believes",
        "present_non_3s": "believe",
        "participle": "believed"
    },
    "contain": {
        "past": "contained",
        "gerund": "containing",
        "present_3s": "contains",
        "present_non_3s": "contain",
        "participle": "contained"
    },
    "roll": {
        "past": "rolled",
        "gerund": "rolling",
        "present_3s": "rolls",
        "present_non_3s": "roll",
        "participle": "rolled"
    },
    "compete": {
        "past": "competed",
        "gerund": "competing",
        "present_3s": "competes",
        "present_non_3s": "compete",
        "participle": "competed"
    },
    "occur": {
        "past": "occurred",
        "gerund": "occurring",
        "present_3s": "occurs",
        "present_non_3s": "occur",
        "participle": "occurred"
    },
    "apply": {
        "past": "applied",
        "gerund": "applying",
        "present_3s": "applys",
        "present_non_3s": "apply",
        "participle": "applied"
    },
    "trade": {
        "past": "traded",
        "gerund": "trading",
        "present_3s": "trades",
        "present_non_3s": "trade",
        "participle": "traded"
    },
    "calculate": {
        "past": "calculated",
        "gerund": "calculating",
        "present_3s": "calculates",
        "present_non_3s": "calculate",
        "participle": "calculated"
    },
    "transfer": {
        "past": "transferred",
        "gerund": "transferring",
        "present_3s": "transfers",
        "present_non_3s": "transfer",
        "participle": "transferred"
    },
    "favor": {
        "past": "favored",
        "gerund": "favoring",
        "present_3s": "favors",
        "present_non_3s": "favor",
        "participle": "favored"
    },
    "post": {
        "past": "posted",
        "gerund": "posting",
        "present_3s": "posts",
        "present_non_3s": "post",
        "participle": "posted"
    },
    "exist": {
        "past": "existed",
        "gerund": "existing",
        "present_3s": "exists",
        "present_non_3s": "exist",
        "participle": "existed"
    },
    "claim": {
        "past": "claimed",
        "gerund": "claiming",
        "present_3s": "claims",
        "present_non_3s": "claim",
        "participle": "claimed"
    },
    "remove": {
        "past": "removed",
        "gerund": "removing",
        "present_3s": "removes",
        "present_non_3s": "remove",
        "participle": "removed"
    },
    "fail": {
        "past": "failed",
        "gerund": "failing",
        "present_3s": "fails",
        "present_non_3s": "fail",
        "participle": "failed"
    },
    "honor": {
        "past": "honored",
        "gerund": "honoring",
        "present_3s": "honors",
        "present_non_3s": "honor",
        "participle": "honored"
    },
    "accelerate": {
        "past": "accelerated",
        "gerund": "accelerating",
        "present_3s": "accelerates",
        "present_non_3s": "accelerate",
        "participle": "accelerated"
    },
    "improve": {
        "past": "improved",
        "gerund": "improving",
        "present_3s": "improves",
        "present_non_3s": "improve",
        "participle": "improved"
    },
    "harm": {
        "past": "harmed",
        "gerund": "harming",
        "present_3s": "harms",
        "present_non_3s": "harm",
        "participle": "harmed"
    },
    "offend": {
        "past": "offended",
        "gerund": "offending",
        "present_3s": "offends",
        "present_non_3s": "offend",
        "participle": "offended"
    },
    "argue": {
        "past": "argued",
        "gerund": "arguing",
        "present_3s": "argues",
        "present_non_3s": "argue",
        "participle": "argued"
    },
    "hurt": {
        "past": "hurt",
        "gerund": "hurting",
        "present_3s": "hurts",
        "present_non_3s": "hurt",
        "participle": "hurt"
    },
    "discourage": {
        "past": "discouraged",
        "gerund": "discouraging",
        "present_3s": "discourages",
        "present_non_3s": "discourage",
        "participle": "discouraged"
    },
    "deter": {
        "past": "deterred",
        "gerund": "deterring",
        "present_3s": "deters",
        "present_non_3s": "deter",
        "participle": "deterred"
    },
    "market": {
        "past": "marketed",
        "gerund": "marketing",
        "present_3s": "markets",
        "present_non_3s": "market",
        "participle": "marketed"
    },
    "create": {
        "past": "created",
        "gerund": "creating",
        "present_3s": "creates",
        "present_non_3s": "create",
        "participle": "created"
    },
    "train": {
        "past": "trained",
        "gerund": "training",
        "present_3s": "trains",
        "present_non_3s": "train",
        "participle": "trained"
    },
    "pursue": {
        "past": "pursued",
        "gerund": "pursuing",
        "present_3s": "pursues",
        "present_non_3s": "pursue",
        "participle": "pursued"
    },
    "institute": {
        "past": "instituted",
        "gerund": "instituting",
        "present_3s": "institutes",
        "present_non_3s": "institute",
        "participle": "instituted"
    },
    "aid": {
        "past": "aided",
        "gerund": "aiding",
        "present_3s": "aids",
        "present_non_3s": "aid",
        "participle": "aided"
    },
    "amend": {
        "past": "amended",
        "gerund": "amending",
        "present_3s": "amends",
        "present_non_3s": "amend",
        "participle": "amended"
    },
    "protect": {
        "past": "protected",
        "gerund": "protecting",
        "present_3s": "protects",
        "present_non_3s": "protect",
        "participle": "protected"
    },
    "compel": {
        "past": "compeled",
        "gerund": "compeling",
        "present_3s": "compels",
        "present_non_3s": "compel",
        "participle": "compeled"
    },
    "vow": {
        "past": "vowed",
        "gerund": "vowing",
        "present_3s": "vows",
        "present_non_3s": "vow",
        "participle": "vowed"
    },
    "enact": {
        "past": "enacted",
        "gerund": "enacting",
        "present_3s": "enacts",
        "present_non_3s": "enact",
        "participle": "enacted"
    },
    "deem": {
        "past": "deemed",
        "gerund": "deeming",
        "present_3s": "deems",
        "present_non_3s": "deem",
        "participle": "deemed"
    },
    "pose": {
        "past": "posed",
        "gerund": "posing",
        "present_3s": "poses",
        "present_non_3s": "pose",
        "participle": "posed"
    },
    "specialize": {
        "past": "specialized",
        "gerund": "specializing",
        "present_3s": "specializes",
        "present_non_3s": "specialize",
        "participle": "specialized"
    },
    "combine": {
        "past": "combined",
        "gerund": "combining",
        "present_3s": "combines",
        "present_non_3s": "combine",
        "participle": "combined"
    },
    "tell": {
        "past": "told",
        "gerund": "telling",
        "present_3s": "tells",
        "present_non_3s": "tell",
        "participle": "told"
    },
    "craft": {
        "past": "crafted",
        "gerund": "crafting",
        "present_3s": "crafts",
        "present_non_3s": "craft",
        "participle": "crafted"
    },
    "concern": {
        "past": "concerned",
        "gerund": "concerning",
        "present_3s": "concerns",
        "present_non_3s": "concern",
        "participle": "concerned"
    },
    "disturb": {
        "past": "disturbed",
        "gerund": "disturbing",
        "present_3s": "disturbs",
        "present_non_3s": "disturb",
        "participle": "disturbed"
    },
    "elaborate": {
        "past": "elaborated",
        "gerund": "elaborating",
        "present_3s": "elaborates",
        "present_non_3s": "elaborate",
        "participle": "elaborated"
    },
    "merit": {
        "past": "merited",
        "gerund": "meriting",
        "present_3s": "merits",
        "present_non_3s": "merit",
        "participle": "merited"
    },
    "ask": {
        "past": "asked",
        "gerund": "asking",
        "present_3s": "asks",
        "present_non_3s": "ask",
        "participle": "asked"
    },
    "halve": {
        "past": "halved",
        "gerund": "halving",
        "present_3s": "halves",
        "present_non_3s": "halve",
        "participle": "halved"
    },
    "aspire": {
        "past": "aspired",
        "gerund": "aspiring",
        "present_3s": "aspires",
        "present_non_3s": "aspire",
        "participle": "aspired"
    },
    "meet": {
        "past": "meet",
        "gerund": "meeting",
        "present_3s": "meets",
        "present_non_3s": "meet",
        "participle": "met"
    },
    "solve": {
        "past": "solved",
        "gerund": "solving",
        "present_3s": "solves",
        "present_non_3s": "solve",
        "participle": "solved"
    },
    "forgive": {
        "past": "forgave",
        "gerund": "forgiving",
        "present_3s": "forgives",
        "present_non_3s": "forgive",
        "participle": "forgiven"
    },
    "launch": {
        "past": "launched",
        "gerund": "launching",
        "present_3s": "launches",
        "present_non_3s": "launch",
        "participle": "launched"
    },
    "store": {
        "past": "stored",
        "gerund": "storing",
        "present_3s": "stores",
        "present_non_3s": "store",
        "participle": "stored"
    },
    "trigger": {
        "past": "triggered",
        "gerund": "triggering",
        "present_3s": "triggers",
        "present_non_3s": "trigger",
        "participle": "triggered"
    },
    "develop": {
        "past": "developed",
        "gerund": "developing",
        "present_3s": "develops",
        "present_non_3s": "develop",
        "participle": "developed"
    },
    "adapt": {
        "past": "adapted",
        "gerund": "adapting",
        "present_3s": "adapts",
        "present_non_3s": "adapt",
        "participle": "adapted"
    },
    "schedule": {
        "past": "scheduled",
        "gerund": "scheduling",
        "present_3s": "schedules",
        "present_non_3s": "schedule",
        "participle": "scheduled"
    },
    "start": {
        "past": "started",
        "gerund": "starting",
        "present_3s": "starts",
        "present_non_3s": "start",
        "participle": "started"
    },
    "divest": {
        "past": "divested",
        "gerund": "divesting",
        "present_3s": "divests",
        "present_non_3s": "divest",
        "participle": "divested"
    },
    "deny": {
        "past": "denied",
        "gerund": "denying",
        "present_3s": "denies",
        "present_non_3s": "deny",
        "participle": "denied"
    },
    "request": {
        "past": "requested",
        "gerund": "requesting",
        "present_3s": "requests",
        "present_non_3s": "request",
        "participle": "requested"
    },
    "cover": {
        "past": "covered",
        "gerund": "covering",
        "present_3s": "covers",
        "present_non_3s": "cover",
        "participle": "covered"
    },
    "grant": {
        "past": "granted",
        "gerund": "granting",
        "present_3s": "grants",
        "present_non_3s": "grant",
        "participle": "granted"
    },
    "assemble": {
        "past": "assembled",
        "gerund": "assembling",
        "present_3s": "assembles",
        "present_non_3s": "assemble",
        "participle": "assembled"
    },
    "step": {
        "past": "stepped",
        "gerund": "stepping",
        "present_3s": "steps",
        "present_non_3s": "step",
        "participle": "stepped"
    },
    "direct": {
        "past": "directed",
        "gerund": "directing",
        "present_3s": "directs",
        "present_non_3s": "direct",
        "participle": "directed"
    },
    "reduce": {
        "past": "reduced",
        "gerund": "reducing",
        "present_3s": "reduces",
        "present_non_3s": "reduce",
        "participle": "reduced"
    },
    "achieve": {
        "past": "achieved",
        "gerund": "achieving",
        "present_3s": "achieves",
        "present_non_3s": "achieve",
        "participle": "achieved"
    },
    "maintain": {
        "past": "maintained",
        "gerund": "maintaining",
        "present_3s": "maintains",
        "present_non_3s": "maintain",
        "participle": "maintained"
    },
    "wallow": {
        "past": "wallowed",
        "gerund": "wallowing",
        "present_3s": "wallows",
        "present_non_3s": "wallow",
        "participle": "wallowed"
    },
    "control": {
        "past": "controlled",
        "gerund": "controlling",
        "present_3s": "controls",
        "present_non_3s": "control",
        "participle": "controlled"
    },
    "resume": {
        "past": "resumed",
        "gerund": "resuming",
        "present_3s": "resumes",
        "present_non_3s": "resume",
        "participle": "resumed"
    },
    "run": {
        "past": "ran",
        "gerund": "running",
        "present_3s": "runs",
        "present_non_3s": "run",
        "participle": "run"
    },
    "assist": {
        "past": "assisted",
        "gerund": "assisting",
        "present_3s": "assists",
        "present_non_3s": "assist",
        "participle": "assisted"
    },
    "consult": {
        "past": "consulted",
        "gerund": "consulting",
        "present_3s": "consults",
        "present_non_3s": "consult",
        "participle": "consulted"
    },
    "buy": {
        "past": "buyed",
        "gerund": "buying",
        "present_3s": "buys",
        "present_non_3s": "buy",
        "participle": "buyed"
    },
    "snap": {
        "past": "snapped",
        "gerund": "snaping",
        "present_3s": "snaps",
        "present_non_3s": "snap",
        "participle": "snapped"
    },
    "put": {
        "past": "put",
        "gerund": "putting",
        "present_3s": "puts",
        "present_non_3s": "put",
        "participle": "put"
    },
    "design": {
        "past": "designed",
        "gerund": "designing",
        "present_3s": "designs",
        "present_non_3s": "design",
        "participle": "designed"
    },
    "eliminate": {
        "past": "eliminated",
        "gerund": "eliminating",
        "present_3s": "eliminates",
        "present_non_3s": "eliminate",
        "participle": "eliminated"
    },
    "redeploy": {
        "past": "redeployed",
        "gerund": "redeploying",
        "present_3s": "redeploys",
        "present_non_3s": "redeploy",
        "participle": "redeployed"
    },
    "channel": {
        "past": "channeled",
        "gerund": "channeling",
        "present_3s": "channels",
        "present_non_3s": "channel",
        "participle": "channeled"
    },
    "address": {
        "past": "addressed",
        "gerund": "addressing",
        "present_3s": "addresses",
        "present_non_3s": "address",
        "participle": "addressed"
    },
    "agree": {
        "past": "agreed",
        "gerund": "agreeing",
        "present_3s": "agrees",
        "present_non_3s": "agree",
        "participle": "agreed"
    },
    "extend": {
        "past": "extended",
        "gerund": "extending",
        "present_3s": "extends",
        "present_non_3s": "extend",
        "participle": "extended"
    },
    "attempt": {
        "past": "attempted",
        "gerund": "attempting",
        "present_3s": "attempts",
        "present_non_3s": "attempt",
        "participle": "attempted"
    },
    "incorporate": {
        "past": "incorporated",
        "gerund": "incorporating",
        "present_3s": "incorporates",
        "present_non_3s": "incorporate",
        "participle": "incorporated"
    },
    "advertise": {
        "past": "advertised",
        "gerund": "advertising",
        "present_3s": "advertises",
        "present_non_3s": "advertise",
        "participle": "advertised"
    },
    "expire": {
        "past": "expired",
        "gerund": "expiring",
        "present_3s": "expires",
        "present_non_3s": "expire",
        "participle": "expired"
    },
    "mark": {
        "past": "marked",
        "gerund": "marking",
        "present_3s": "marks",
        "present_non_3s": "mark",
        "participle": "marked"
    },
    "surge": {
        "past": "surged",
        "gerund": "surging",
        "present_3s": "surges",
        "present_non_3s": "surge",
        "participle": "surged"
    },
    "sweep": {
        "past": "swept",
        "gerund": "sweeping",
        "present_3s": "sweeps",
        "present_non_3s": "sweep",
        "participle": "swept"
    },
    "range": {
        "past": "ranged",
        "gerund": "ranging",
        "present_3s": "ranges",
        "present_non_3s": "range",
        "participle": "ranged"
    },
    "cap": {
        "past": "capped",
        "gerund": "caping",
        "present_3s": "caps",
        "present_non_3s": "cap",
        "participle": "capped"
    },
    "kick": {
        "past": "kicked",
        "gerund": "kicking",
        "present_3s": "kicks",
        "present_non_3s": "kick",
        "participle": "kicked"
    },
    "mirror": {
        "past": "mirrored",
        "gerund": "mirroring",
        "present_3s": "mirrors",
        "present_non_3s": "mirror",
        "participle": "mirrored"
    },
    "focus": {
        "past": "focused",
        "gerund": "focusing",
        "present_3s": "focuses",
        "present_non_3s": "focus",
        "participle": "focused"
    },
    "list": {
        "past": "listed",
        "gerund": "listing",
        "present_3s": "lists",
        "present_non_3s": "list",
        "participle": "listed"
    },
    "account": {
        "past": "accounted",
        "gerund": "accounting",
        "present_3s": "accounts",
        "present_non_3s": "account",
        "participle": "accounted"
    },
    "scramble": {
        "past": "scrambled",
        "gerund": "scrambling",
        "present_3s": "scrambles",
        "present_non_3s": "scramble",
        "participle": "scrambled"
    },
    "stretch": {
        "past": "stretched",
        "gerund": "stretching",
        "present_3s": "stretches",
        "present_non_3s": "stretch",
        "participle": "stretched"
    },
    "outpace": {
        "past": "outpaced",
        "gerund": "outpacing",
        "present_3s": "outpaces",
        "present_non_3s": "outpace",
        "participle": "outpaced"
    },
    "burn": {
        "past": "burned",
        "gerund": "burning",
        "present_3s": "burns",
        "present_non_3s": "burn",
        "participle": "burned"
    },
    "whipsaw": {
        "past": "whipsawed",
        "gerund": "whipsawing",
        "present_3s": "whipsaws",
        "present_non_3s": "whipsaw",
        "participle": "whipsawed"
    },
    "tend": {
        "past": "tended",
        "gerund": "tending",
        "present_3s": "tends",
        "present_non_3s": "tend",
        "participle": "tended"
    },
    "swing": {
        "past": "swung",
        "gerund": "swing",
        "present_3s": "swings",
        "present_non_3s": "swing",
        "participle": "swung"
    },
    "clobber": {
        "past": "clobbered",
        "gerund": "clobbering",
        "present_3s": "clobbers",
        "present_non_3s": "clobber",
        "participle": "clobbered"
    },
    "climb": {
        "past": "climbed",
        "gerund": "climbing",
        "present_3s": "climbs",
        "present_non_3s": "climb",
        "participle": "climbed"
    },
    "skyrocket": {
        "past": "skyrocketed",
        "gerund": "skyrocketing",
        "present_3s": "skyrockets",
        "present_non_3s": "skyrocket",
        "participle": "skyrocketed"
    },
    "target": {
        "past": "targeted",
        "gerund": "targeting",
        "present_3s": "targets",
        "present_non_3s": "target",
        "participle": "targeted"
    },
    "see": {
        "past": "saw",
        "gerund": "seeing",
        "present_3s": "sees",
        "present_non_3s": "see",
        "participle": "seed"
    },
    "fatten": {
        "past": "fattened",
        "gerund": "fattening",
        "present_3s": "fattens",
        "present_non_3s": "fatten",
        "participle": "fattened"
    },
    "suggest": {
        "past": "suggested",
        "gerund": "suggesting",
        "present_3s": "suggests",
        "present_non_3s": "suggest",
        "participle": "suggested"
    },
    "owe": {
        "past": "owed",
        "gerund": "owing",
        "present_3s": "owes",
        "present_non_3s": "owe",
        "participle": "owed"
    },
    "repay": {
        "past": "repaid",
        "gerund": "repaying",
        "present_3s": "repays",
        "present_non_3s": "repay",
        "participle": "repaid"
    },
    "clear": {
        "past": "cleared",
        "gerund": "clearing",
        "present_3s": "clears",
        "present_non_3s": "clear",
        "participle": "cleared"
    },
    "happen": {
        "past": "happened",
        "gerund": "happening",
        "present_3s": "happens",
        "present_non_3s": "happen",
        "participle": "happened"
    },
    "cripple": {
        "past": "crippled",
        "gerund": "crippling",
        "present_3s": "cripples",
        "present_non_3s": "cripple",
        "participle": "crippled"
    },
    "seize": {
        "past": "seized",
        "gerund": "seizing",
        "present_3s": "seizes",
        "present_non_3s": "seize",
        "participle": "seized"
    },
    "stress": {
        "past": "stressed",
        "gerund": "stressing",
        "present_3s": "stresses",
        "present_non_3s": "stress",
        "participle": "stressed"
    },
    "satisfy": {
        "past": "satisfied",
        "gerund": "satisfying",
        "present_3s": "satisfies",
        "present_non_3s": "satisfy",
        "participle": "satisfied"
    },
    "level": {
        "past": "leveled",
        "gerund": "leveling",
        "present_3s": "levels",
        "present_non_3s": "level",
        "participle": "leveled"
    },
    "book": {
        "past": "booked",
        "gerund": "booking",
        "present_3s": "books",
        "present_non_3s": "book",
        "participle": "booked"
    },
    "adjust": {
        "past": "adjusted",
        "gerund": "adjusting",
        "present_3s": "adjusts",
        "present_non_3s": "adjust",
        "participle": "adjusted"
    },
    "taper": {
        "past": "tapered",
        "gerund": "tapering",
        "present_3s": "tapers",
        "present_non_3s": "taper",
        "participle": "tapered"
    },
    "revive": {
        "past": "revived",
        "gerund": "reviving",
        "present_3s": "revives",
        "present_non_3s": "revive",
        "participle": "revived"
    },
    "pick": {
        "past": "picked",
        "gerund": "picking",
        "present_3s": "picks",
        "present_non_3s": "pick",
        "participle": "picked"
    },
    "draw": {
        "past": "drew",
        "gerund": "drawing",
        "present_3s": "draws",
        "present_non_3s": "draw",
        "participle": "drawn"
    },
    "predict": {
        "past": "predicted",
        "gerund": "predicting",
        "present_3s": "predicts",
        "present_non_3s": "predict",
        "participle": "predicted"
    },
    "slip": {
        "past": "slipped",
        "gerund": "slipping",
        "present_3s": "slips",
        "present_non_3s": "slip",
        "participle": "slipped"
    },
    "cite": {
        "past": "cited",
        "gerund": "citing",
        "present_3s": "cites",
        "present_non_3s": "cite",
        "participle": "cited"
    },
    "provoke": {
        "past": "provoked",
        "gerund": "provoking",
        "present_3s": "provokes",
        "present_non_3s": "provoke",
        "participle": "provoked"
    },
    "conform": {
        "past": "conformed",
        "gerund": "conforming",
        "present_3s": "conforms",
        "present_non_3s": "conform",
        "participle": "conformed"
    },
    "exclude": {
        "past": "excluded",
        "gerund": "excluding",
        "present_3s": "excludes",
        "present_non_3s": "exclude",
        "participle": "excluded"
    },
    "award": {
        "past": "awarded",
        "gerund": "awarding",
        "present_3s": "awards",
        "present_non_3s": "award",
        "participle": "awarded"
    },
    "count": {
        "past": "counted",
        "gerund": "counting",
        "present_3s": "counts",
        "present_non_3s": "count",
        "participle": "counted"
    },
    "slow": {
        "past": "slowed",
        "gerund": "slowing",
        "present_3s": "slows",
        "present_non_3s": "slow",
        "participle": "slowed"
    },
    "signal": {
        "past": "signaled",
        "gerund": "signaling",
        "present_3s": "signals",
        "present_non_3s": "signal",
        "participle": "signaled"
    },
    "purchase": {
        "past": "purchased",
        "gerund": "purchasing",
        "present_3s": "purchases",
        "present_non_3s": "purchase",
        "participle": "purchased"
    },
    "deliver": {
        "past": "delivered",
        "gerund": "delivering",
        "present_3s": "delivers",
        "present_non_3s": "deliver",
        "participle": "delivered"
    },
    "handle": {
        "past": "handled",
        "gerund": "handling",
        "present_3s": "handles",
        "present_non_3s": "handle",
        "participle": "handled"
    },
    "gauge": {
        "past": "gauge",
        "gerund": "gauging",
        "present_3s": "gauges",
        "present_non_3s": "gauge",
        "participle": "gauge"
    },
    "poll": {
        "past": "polled",
        "gerund": "polling",
        "present_3s": "polls",
        "present_non_3s": "poll",
        "participle": "polled"
    },
    "acknowledge": {
        "past": "acknowledged",
        "gerund": "acknowledging",
        "present_3s": "acknowledges",
        "present_non_3s": "acknowledge",
        "participle": "acknowledged"
    },
    "suspect": {
        "past": "suspected",
        "gerund": "suspecting",
        "present_3s": "suspects",
        "present_non_3s": "suspect",
        "participle": "suspected"
    },
    "number": {
        "past": "numbered",
        "gerund": "numbering",
        "present_3s": "numbers",
        "present_non_3s": "number",
        "participle": "numbered"
    },
    "blame": {
        "past": "blamed",
        "gerund": "blaming",
        "present_3s": "blames",
        "present_non_3s": "blame",
        "participle": "blamed"
    },
    "couple": {
        "past": "coupled",
        "gerund": "coupling",
        "present_3s": "couples",
        "present_non_3s": "couple",
        "participle": "coupled"
    },
    "contribute": {
        "past": "contributed",
        "gerund": "contributing",
        "present_3s": "contributes",
        "present_non_3s": "contribute",
        "participle": "contributed"
    },
    "judge": {
        "past": "judged",
        "gerund": "judging",
        "present_3s": "judges",
        "present_non_3s": "judge",
        "participle": "judged"
    },
    "drink": {
        "past": "drank",
        "gerund": "drinking",
        "present_3s": "drinks",
        "present_non_3s": "drunk",
        "participle": "drunk"
    },
    "whistle": {
        "past": "whistled",
        "gerund": "whistling",
        "present_3s": "whistle",
        "present_non_3s": "whistle",
        "participle": "whistled"
    },
    "read": {
        "past": "read",
        "gerund": "reading",
        "present_3s": "reads",
        "present_non_3s": "read",
        "participle": "read"
    },
    "break": {
        "past": "broke",
        "gerund": "breaking",
        "present_3s": "breaks",
        "present_non_3s": "break",
        "participle": "broken"
    },
    "engage": {
        "past": "engaged",
        "gerund": "engaging",
        "present_3s": "engages",
        "present_non_3s": "engage",
        "participle": "engaged"
    },
    "refresh": {
        "past": "refreshed",
        "gerund": "refreshing",
        "present_3s": "refreshes",
        "present_non_3s": "refresh",
        "participle": "refreshed"
    },
    "belong": {
        "past": "belonged",
        "gerund": "belonging",
        "present_3s": "belongs",
        "present_non_3s": "belong",
        "participle": "belonged"
    },
    "perpetuate": {
        "past": "perpetuated",
        "gerund": "perpetuating",
        "present_3s": "perpetuates",
        "present_non_3s": "perpetuate",
        "participle": "perpetuated"
    },
    "carry": {
        "past": "carried",
        "gerund": "carrying",
        "present_3s": "carries",
        "present_non_3s": "carry",
        "participle": "carried"
    },
    "root": {
        "past": "rooted",
        "gerund": "rooting",
        "present_3s": "roots",
        "present_non_3s": "root",
        "participle": "rooted"
    },
    "tow": {
        "past": "towed",
        "gerund": "tow",
        "present_3s": "tows",
        "present_non_3s": "tow",
        "participle": "towed"
    },
    "retort": {
        "past": "retorted",
        "gerund": "retorting",
        "present_3s": "retorts",
        "present_non_3s": "retort",
        "participle": "retorted"
    },
    "publish": {
        "past": "published",
        "gerund": "publishing",
        "present_3s": "publishes",
        "present_non_3s": "publish",
        "participle": "published"
    },
    "dominate": {
        "past": "dominated",
        "gerund": "dominating",
        "present_3s": "dominates",
        "present_non_3s": "dominate",
        "participle": "dominated"
    },
    "write": {
        "past": "wrote",
        "gerund": "writing",
        "present_3s": "writes",
        "present_non_3s": "write",
        "participle": "written"
    },
    "play": {
        "past": "played",
        "gerund": "playing",
        "present_3s": "plays",
        "present_non_3s": "play",
        "participle": "played"
    },
    "sidestep": {
        "past": "sidestep",
        "gerund": "sidestepping",
        "present_3s": "sidesteps",
        "present_non_3s": "sidestep",
        "participle": "sidestep"
    },
    "abide": {
        "past": "abided",
        "gerund": "abiding",
        "present_3s": "abides",
        "present_non_3s": "abide",
        "participle": "abided"
    },
    "wear": {
        "past": "wore",
        "gerund": "wearing",
        "present_3s": "wears",
        "present_non_3s": "wear",
        "participle": "wore"
    },
    "ration": {
        "past": "rationed",
        "gerund": "rationing",
        "present_3s": "rations",
        "present_non_3s": "ration",
        "participle": "rationed"
    },
    "host": {
        "past": "hosted",
        "gerund": "hosting",
        "present_3s": "hosts",
        "present_non_3s": "host",
        "participle": "hosted"
    },
    "amuse": {
        "past": "amused",
        "gerund": "amusing",
        "present_3s": "amuses",
        "present_non_3s": "amuse",
        "participle": "amused"
    },
    "invade": {
        "past": "invaded",
        "gerund": "invading",
        "present_3s": "invades",
        "present_non_3s": "invade",
        "participle": "invaded"
    },
    "assign": {
        "past": "assigned",
        "gerund": "assigning",
        "present_3s": "assigns",
        "present_non_3s": "assign",
        "participle": "assigned"
    },
    "let": {
        "past": "let",
        "gerund": "letting",
        "present_3s": "lets",
        "present_non_3s": "let",
        "participle": "let"
    },
    "frustrate": {
        "past": "frustrated",
        "gerund": "frustrating",
        "present_3s": "frustrates",
        "present_non_3s": "frustrate",
        "participle": "frustrated"
    },
    "invent": {
        "past": "invented",
        "gerund": "inventing",
        "present_3s": "invents",
        "present_non_3s": "invent",
        "participle": "invented"
    },
    "fire": {
        "past": "fired",
        "gerund": "firing",
        "present_3s": "fires",
        "present_non_3s": "fire",
        "participle": "fired"
    },
    "commit": {
        "past": "committed",
        "gerund": "committing",
        "present_3s": "commits",
        "present_non_3s": "commit",
        "participle": "committed"
    },
    "learn": {
        "past": "learned",
        "gerund": "learning",
        "present_3s": "learns",
        "present_non_3s": "learn",
        "participle": "learned"
    },
    "smoke": {
        "past": "smoked",
        "gerund": "smoking",
        "present_3s": "smokes",
        "present_non_3s": "smoke",
        "participle": "smoked"
    },
    "urge": {
        "past": "urged",
        "gerund": "urging",
        "present_3s": "urges",
        "present_non_3s": "urge",
        "participle": "urged"
    },
    "visit": {
        "past": "visited",
        "gerund": "visiting",
        "present_3s": "visits",
        "present_non_3s": "visit",
        "participle": "visited"
    },
    "restrict": {
        "past": "restricted",
        "gerund": "restricting",
        "present_3s": "restricts",
        "present_non_3s": "restrict",
        "participle": "restricted"
    },
    "designate": {
        "past": "designated",
        "gerund": "designating",
        "present_3s": "designates",
        "present_non_3s": "designate",
        "participle": "designated"
    },
    "feel": {
        "past": "felt",
        "gerund": "feeling",
        "present_3s": "feels",
        "present_non_3s": "feel",
        "participle": "felt"
    },
    "survey": {
        "past": "surveyed",
        "gerund": "surveying",
        "present_3s": "surveys",
        "present_non_3s": "survey",
        "participle": "surveyed"
    },
    "identify": {
        "past": "identified",
        "gerund": "identifying",
        "present_3s": "identifys",
        "present_non_3s": "identify",
        "participle": "identified"
    },
    "endorse": {
        "past": "endorsed",
        "gerund": "endorsing",
        "present_3s": "endorses",
        "present_non_3s": "endorse",
        "participle": "endorsed"
    },
    "balk": {
        "past": "balked",
        "gerund": "balking",
        "present_3s": "balks",
        "present_non_3s": "balk",
        "participle": "balked"
    },
    "back": {
        "past": "backed",
        "gerund": "backing",
        "present_3s": "backs",
        "present_non_3s": "back",
        "participle": "backed"
    },
    "renew": {
        "past": "renewed",
        "gerund": "renewing",
        "present_3s": "renews",
        "present_non_3s": "renew",
        "participle": "renewed"
    },
    "win": {
        "past": "wined",
        "gerund": "winning",
        "present_3s": "wins",
        "present_non_3s": "win",
        "participle": "wined"
    },
    "confirm": {
        "past": "confirmed",
        "gerund": "confirming",
        "present_3s": "confirms",
        "present_non_3s": "confirm",
        "participle": "confirmed"
    },
    "test": {
        "past": "tested",
        "gerund": "testing",
        "present_3s": "tests",
        "present_non_3s": "test",
        "participle": "tested"
    },
    "intend": {
        "past": "intended",
        "gerund": "intending",
        "present_3s": "intends",
        "present_non_3s": "intend",
        "participle": "intended"
    },
    "compensate": {
        "past": "compensated",
        "gerund": "compensating",
        "present_3s": "compensates",
        "present_non_3s": "compensate",
        "participle": "compensated"
    },
    "establish": {
        "past": "established",
        "gerund": "establishing",
        "present_3s": "establishs",
        "present_non_3s": "establish",
        "participle": "established"
    },
    "strap": {
        "past": "straped",
        "gerund": "straping",
        "present_3s": "straps",
        "present_non_3s": "strap",
        "participle": "strapped"
    },
    "terminate": {
        "past": "terminated",
        "gerund": "terminating",
        "present_3s": "terminates",
        "present_non_3s": "terminate",
        "participle": "terminated"
    },
    "twin": {
        "past": "twined",
        "gerund": "twining",
        "present_3s": "twins",
        "present_non_3s": "twin",
        "participle": "twinned"
    },
    "authorize": {
        "past": "authorized",
        "gerund": "authorizing",
        "present_3s": "authorizes",
        "present_non_3s": "authorize",
        "participle": "authorized"
    },
    "modify": {
        "past": "modified",
        "gerund": "modifying",
        "present_3s": "modifies",
        "present_non_3s": "modify",
        "participle": "modified"
    },
    "plan": {
        "past": "planned",
        "gerund": "planning",
        "present_3s": "plans",
        "present_non_3s": "plan",
        "participle": "planned"
    },
    "paint": {
        "past": "painted",
        "gerund": "painting",
        "present_3s": "paints",
        "present_non_3s": "paint",
        "participle": "painted"
    },
    "entitle": {
        "past": "entitled",
        "gerund": "entitling",
        "present_3s": "entitles",
        "present_non_3s": "entitle",
        "participle": "entitled"
    },
    "swap": {
        "past": "swaped",
        "gerund": "swapping",
        "present_3s": "swaps",
        "present_non_3s": "swap",
        "participle": "swapped"
    },
    "lay": {
        "past": "lay",
        "gerund": "laying",
        "present_3s": "lays",
        "present_non_3s": "lay",
        "participle": "laid"
    },
    "obsess": {
        "past": "obsessed",
        "gerund": "obsessing",
        "present_3s": "obsesses",
        "present_non_3s": "obsessed",
        "participle": "obsessed"
    },
    "refit": {
        "past": "refited",
        "gerund": "refitting",
        "present_3s": "refits",
        "present_non_3s": "refit",
        "participle": "refited"
    },
    "shoot": {
        "past": "shot",
        "gerund": "shooting",
        "present_3s": "shoots",
        "present_non_3s": "shoot",
        "participle": "shot"
    },
    "earn": {
        "past": "earned",
        "gerund": "earning",
        "present_3s": "earns",
        "present_non_3s": "earn",
        "participle": "earned"
    },
    "live": {
        "past": "lived",
        "gerund": "living",
        "present_3s": "lives",
        "present_non_3s": "live",
        "participle": "lived"
    },
    "prepare": {
        "past": "prepared",
        "gerund": "preparing",
        "present_3s": "prepares",
        "present_non_3s": "prepare",
        "participle": "prepared"
    },
    "walk": {
        "past": "walked",
        "gerund": "walking",
        "present_3s": "walks",
        "present_non_3s": "walk",
        "participle": "walked"
    },
    "notice": {
        "past": "noticed",
        "gerund": "noticing",
        "present_3s": "notices",
        "present_non_3s": "notice",
        "participle": "noticed"
    },
    "populate": {
        "past": "populated",
        "gerund": "populating",
        "present_3s": "populates",
        "present_non_3s": "populate",
        "participle": "populated"
    },
    "curl": {
        "past": "curled",
        "gerund": "curling",
        "present_3s": "curls",
        "present_non_3s": "curl",
        "participle": "curled"
    },
    "sketch": {
        "past": "sketched",
        "gerund": "sketching",
        "present_3s": "sketches",
        "present_non_3s": "sketch",
        "participle": "sketched"
    },
    "condemn": {
        "past": "condemned",
        "gerund": "condemning",
        "present_3s": "condemns",
        "present_non_3s": "condemn",
        "participle": "condemned"
    },
    "cure": {
        "past": "cured",
        "gerund": "curing",
        "present_3s": "cures",
        "present_non_3s": "cure",
        "participle": "cured"
    },
    "murder": {
        "past": "murdered",
        "gerund": "murdering",
        "present_3s": "murders",
        "present_non_3s": "murder",
        "participle": "murdered"
    },
    "alert": {
        "past": "alerted",
        "gerund": "alerting",
        "present_3s": "alerts",
        "present_non_3s": "alert",
        "participle": "alerted"
    },
    "tuck": {
        "past": "tucked",
        "gerund": "tucking",
        "present_3s": "tucks",
        "present_non_3s": "tuck",
        "participle": "tucked"
    },
    "load": {
        "past": "loaded",
        "gerund": "loading",
        "present_3s": "loads",
        "present_non_3s": "load",
        "participle": "loaded"
    },
    "dream": {
        "past": "dreamed",
        "gerund": "dreaming",
        "present_3s": "dreams",
        "present_non_3s": "dreamt",
        "participle": "dreamed"
    },
    "resonate": {
        "past": "resonated",
        "gerund": "resonating",
        "present_3s": "resonates",
        "present_non_3s": "resonate",
        "participle": "resonated"
    },
    "glamorize": {
        "past": "glamorized",
        "gerund": "glamorizing",
        "present_3s": "glamorizes",
        "present_non_3s": "glamorize",
        "participle": "glamorized"
    },
    "manage": {
        "past": "managed",
        "gerund": "managing",
        "present_3s": "manages",
        "present_non_3s": "manage",
        "participle": "managed"
    },
    "view": {
        "past": "viewed",
        "gerund": "viewing",
        "present_3s": "views",
        "present_non_3s": "view",
        "participle": "viewed"
    },
    "execute": {
        "past": "executed",
        "gerund": "executing",
        "present_3s": "executes",
        "present_non_3s": "execute",
        "participle": "executed"
    },
    "collaborate": {
        "past": "collaborated",
        "gerund": "collaborating",
        "present_3s": "collaborates",
        "present_non_3s": "collaborate",
        "participle": "collaborated"
    },
    "need": {
        "past": "needed",
        "gerund": "needing",
        "present_3s": "needs",
        "present_non_3s": "need",
        "participle": "needed"
    },
    "enable": {
        "past": "enabled",
        "gerund": "enabling",
        "present_3s": "enables",
        "present_non_3s": "enable",
        "participle": "enabled"
    },
    "botch": {
        "past": "botched",
        "gerund": "botching",
        "present_3s": "botches",
        "present_non_3s": "botch",
        "participle": "botched"
    },
    "kill": {
        "past": "killed",
        "gerund": "killing",
        "present_3s": "kills",
        "present_non_3s": "kill",
        "participle": "killed"
    },
    "present": {
        "past": "presented",
        "gerund": "presenting",
        "present_3s": "presents",
        "present_non_3s": "present",
        "participle": "presented"
    },
    "deserve": {
        "past": "deserved",
        "gerund": "deserving",
        "present_3s": "deserves",
        "present_non_3s": "deserve",
        "participle": "deserved"
    },
    "chop": {
        "past": "chopped",
        "gerund": "choping",
        "present_3s": "chops",
        "present_non_3s": "chop",
        "participle": "choped"
    },
    "recommend": {
        "past": "recommended",
        "gerund": "recommending",
        "present_3s": "recommends",
        "present_non_3s": "recommend",
        "participle": "recommended"
    },
    "fight": {
        "past": "fought",
        "gerund": "fighting",
        "present_3s": "fights",
        "present_non_3s": "fight",
        "participle": "fought"
    },
    "celebrate": {
        "past": "celebrated",
        "gerund": "celebrating",
        "present_3s": "celebrates",
        "present_non_3s": "celebrate",
        "participle": "celebrated"
    },
    "mention": {
        "past": "mentioned",
        "gerund": "mentioning",
        "present_3s": "mentions",
        "present_non_3s": "mention",
        "participle": "mentioned"
    },
    "discuss": {
        "past": "discussed",
        "gerund": "discussing",
        "present_3s": "discusses",
        "present_non_3s": "discuss",
        "participle": "discussed"
    },
    "speculate": {
        "past": "speculated",
        "gerund": "speculating",
        "present_3s": "speculates",
        "present_non_3s": "speculate",
        "participle": "speculated"
    },
    "hit": {
        "past": "hit",
        "gerund": "hitting",
        "present_3s": "hits",
        "present_non_3s": "hit",
        "participle": "hit"
    },
    "scatter": {
        "past": "scattered",
        "gerund": "scattering",
        "present_3s": "scatters",
        "present_non_3s": "scatter",
        "participle": "scattered"
    },
    "usher": {
        "past": "ushered",
        "gerund": "ushering",
        "present_3s": "ushers",
        "present_non_3s": "usher",
        "participle": "ushered"
    },
    "attack": {
        "past": "attacked",
        "gerund": "attacking",
        "present_3s": "attacks",
        "present_non_3s": "attack",
        "participle": "attacked"
    },
    "mean": {
        "past": "meant",
        "gerund": "meaning",
        "present_3s": "means",
        "present_non_3s": "mean",
        "participle": "meant"
    },
    "fill": {
        "past": "filled",
        "gerund": "filling",
        "present_3s": "fills",
        "present_non_3s": "fill",
        "participle": "filled"
    },
    "hid": {
        "past": "hided",
        "gerund": "hiding",
        "present_3s": "hids",
        "present_non_3s": "hid",
        "participle": "hided"
    },
    "convict": {
        "past": "convicted",
        "gerund": "convicting",
        "present_3s": "convicts",
        "present_non_3s": "convict",
        "participle": "convicted"
    },
    "wait": {
        "past": "waited",
        "gerund": "waiting",
        "present_3s": "waits",
        "present_non_3s": "wait",
        "participle": "waited"
    },
    "catch": {
        "past": "caught",
        "gerund": "catching",
        "present_3s": "catches",
        "present_non_3s": "catch",
        "participle": "caught"
    },
    "prosecute": {
        "past": "prosecuted",
        "gerund": "prosecuting",
        "present_3s": "prosecutes",
        "present_non_3s": "prosecute",
        "participle": "prosecuted"
    },
    "unleash": {
        "past": "unleashed",
        "gerund": "unleashing",
        "present_3s": "unleashes",
        "present_non_3s": "unleash",
        "participle": "unleashed"
    },
    "oppose": {
        "past": "opposed",
        "gerund": "opposing",
        "present_3s": "opposes",
        "present_non_3s": "oppose",
        "participle": "opposed"
    },
    "choose": {
        "past": "chose",
        "gerund": "choosing",
        "present_3s": "chooses",
        "present_non_3s": "choose",
        "participle": "chosen"
    },
    "insist": {
        "past": "insisted",
        "gerund": "insisting",
        "present_3s": "insists",
        "present_non_3s": "insist",
        "participle": "insisted"
    },
    "admit": {
        "past": "admitted",
        "gerund": "admitting",
        "present_3s": "admits",
        "present_non_3s": "admit",
        "participle": "admitted"
    },
    "refuse": {
        "past": "refused",
        "gerund": "refusing",
        "present_3s": "refuses",
        "present_non_3s": "refuse",
        "participle": "refused"
    },
    "match": {
        "past": "matched",
        "gerund": "matching",
        "present_3s": "matches",
        "present_non_3s": "match",
        "participle": "matched"
    },
    "superimpose": {
        "past": "superimposed",
        "gerund": "superimposing",
        "present_3s": "superimposes",
        "present_non_3s": "superimpose",
        "participle": "superimposed"
    },
    "nurture": {
        "past": "nurtured",
        "gerund": "nurturing",
        "present_3s": "nurtures",
        "present_non_3s": "nurture",
        "participle": "nurtured"
    },
    "dissolve": {
        "past": "dissolved",
        "gerund": "dissolving",
        "present_3s": "dissolves",
        "present_non_3s": "dissolve",
        "participle": "dissolved"
    },
    "transform": {
        "past": "transformed",
        "gerund": "transforming",
        "present_3s": "transforms",
        "present_non_3s": "transform",
        "participle": "transformed"
    },
    "shake": {
        "past": "shook",
        "gerund": "shaking",
        "present_3s": "shakes",
        "present_non_3s": "shake",
        "participle": "shaken"
    },
    "feature": {
        "past": "featured",
        "gerund": "featuring",
        "present_3s": "features",
        "present_non_3s": "feature",
        "participle": "featured"
    },
    "recall": {
        "past": "recalled",
        "gerund": "recalling",
        "present_3s": "recalls",
        "present_non_3s": "recall",
        "participle": "recalled"
    },
    "interrogate": {
        "past": "interrogated",
        "gerund": "interrogating",
        "present_3s": "interrogates",
        "present_non_3s": "interrogate",
        "participle": "interrogated"
    },
    "pass": {
        "past": "passed",
        "gerund": "passing",
        "present_3s": "passes",
        "present_non_3s": "pass",
        "participle": "passed"
    },
    "tire": {
        "past": "tired",
        "gerund": "tiring",
        "present_3s": "tires",
        "present_non_3s": "tire",
        "participle": "tired"
    },
    "devote": {
        "past": "devoted",
        "gerund": "devoting",
        "present_3s": "devotes",
        "present_non_3s": "devote",
        "participle": "devoted"
    },
    "last": {
        "past": "lasted",
        "gerund": "lasting",
        "present_3s": "lasts",
        "present_non_3s": "last",
        "participle": "lasted"
    },
    "air": {
        "past": "aired",
        "gerund": "airing",
        "present_3s": "airs",
        "present_non_3s": "air",
        "participle": "aired"
    },
    "swim": {
        "past": "swam",
        "gerund": "swimming",
        "present_3s": "swims",
        "present_non_3s": "swim",
        "participle": "swum"
    },
    "sue": {
        "past": "sued",
        "gerund": "suing",
        "present_3s": "sues",
        "present_non_3s": "sue",
        "participle": "sued"
    },
    "cry": {
        "past": "cried",
        "gerund": "crying",
        "present_3s": "cries",
        "present_non_3s": "cry",
        "participle": "cried"
    },
    "respond": {
        "past": "responded",
        "gerund": "responding",
        "present_3s": "responds",
        "present_non_3s": "respond",
        "participle": "responded"
    },
    "lie": {
        "past": "lied",
        "gerund": "lying",
        "present_3s": "lies",
        "present_non_3s": "lie",
        "participle": "lied"
    },
    "clean": {
        "past": "cleaned",
        "gerund": "cleaning",
        "present_3s": "cleans",
        "present_non_3s": "clean",
        "participle": "cleaned"
    },
    "devastate": {
        "past": "devastated",
        "gerund": "devastating",
        "present_3s": "devastates",
        "present_non_3s": "devastate",
        "participle": "devastated"
    },
    "quote": {
        "past": "quoted",
        "gerund": "quoting",
        "present_3s": "quotes",
        "present_non_3s": "quote",
        "participle": "quoted"
    },
    "propel": {
        "past": "propelled",
        "gerund": "propelling",
        "present_3s": "propels",
        "present_non_3s": "propel",
        "participle": "propelled"
    },
    "spark": {
        "past": "sparked",
        "gerund": "sparking",
        "present_3s": "sparks",
        "present_non_3s": "spark",
        "participle": "sparked"
    },
    "knit": {
        "past": "knitted",
        "gerund": "knitting",
        "present_3s": "knits",
        "present_non_3s": "knit",
        "participle": "knitted"
    },
    "triple": {
        "past": "tripled",
        "gerund": "tripling",
        "present_3s": "triples",
        "present_non_3s": "triple",
        "participle": "tripled"
    },
    "pump": {
        "past": "pumped",
        "gerund": "pumping",
        "present_3s": "pumps",
        "present_non_3s": "pump",
        "participle": "pumped"
    },
    "spur": {
        "past": "spurred",
        "gerund": "spurring",
        "present_3s": "spurs",
        "present_non_3s": "spur",
        "participle": "spurred"
    },
    "encourage": {
        "past": "encouraged",
        "gerund": "encouraging",
        "present_3s": "encourages",
        "present_non_3s": "encourage",
        "participle": "encouraged"
    },
    "resist": {
        "past": "resisted",
        "gerund": "resisting",
        "present_3s": "resists",
        "present_non_3s": "resist",
        "participle": "resisted"
    },
    "swell": {
        "past": "swelled",
        "gerund": "swelling",
        "present_3s": "swells",
        "present_non_3s": "swell",
        "participle": "swelled"
    },
    "concentrate": {
        "past": "concentrated",
        "gerund": "concentrating",
        "present_3s": "concentrates",
        "present_non_3s": "concentrate",
        "participle": "concentrated"
    },
    "accommodate": {
        "past": "accommodated",
        "gerund": "accommodating",
        "present_3s": "accommodates",
        "present_non_3s": "accommodate",
        "participle": "accommodated"
    },
    "parallel": {
        "past": "paralleled",
        "gerund": "paralleling",
        "present_3s": "parallels",
        "present_non_3s": "parallel",
        "participle": "paralleled"
    },
    "export": {
        "past": "exported",
        "gerund": "exporting",
        "present_3s": "exports",
        "present_non_3s": "export",
        "participle": "exported"
    },
    "pull": {
        "past": "pulled",
        "gerund": "pulling",
        "present_3s": "pulls",
        "present_non_3s": "pull",
        "participle": "pulled"
    },
    "reassert": {
        "past": "reasserted",
        "gerund": "reasserting",
        "present_3s": "reasserts",
        "present_non_3s": "reassert",
        "participle": "reasserted"
    },
    "outstrip": {
        "past": "outstripped",
        "gerund": "outstripping",
        "present_3s": "outstrips",
        "present_non_3s": "outstrip",
        "participle": "outstripped"
    },
    "outrank": {
        "past": "outranked",
        "gerund": "outranking",
        "present_3s": "outranks",
        "present_non_3s": "outrank",
        "participle": "outranked"
    },
    "convey": {
        "past": "conveyed",
        "gerund": "conveying",
        "present_3s": "conveys",
        "present_non_3s": "convey",
        "participle": "conveyed"
    },
    "approach": {
        "past": "approached",
        "gerund": "approaching",
        "present_3s": "approaches",
        "present_non_3s": "approach",
        "participle": "approached"
    },
    "regard": {
        "past": "regarded",
        "gerund": "regarding",
        "present_3s": "regards",
        "present_non_3s": "regard",
        "participle": "regarded"
    },
    "monopolize": {
        "past": "monopolized",
        "gerund": "monopolizing",
        "present_3s": "monopolizes",
        "present_non_3s": "monopolize",
        "participle": "monopolized"
    },
    "spot": {
        "past": "spotted",
        "gerund": "spotting",
        "present_3s": "spots",
        "present_non_3s": "spot",
        "participle": "spotted"
    },
    "cheat": {
        "past": "cheated",
        "gerund": "cheating",
        "present_3s": "cheats",
        "present_non_3s": "cheat",
        "participle": "cheated"
    },
    "surrender": {
        "past": "surrendered",
        "gerund": "surrendering",
        "present_3s": "surrenders",
        "present_non_3s": "surrender",
        "participle": "surrendered"
    },
    "display": {
        "past": "displayed",
        "gerund": "displaying",
        "present_3s": "displays",
        "present_non_3s": "display",
        "participle": "displayed"
    },
    "underline": {
        "past": "underlined",
        "gerund": "underlining",
        "present_3s": "underlines",
        "present_non_3s": "underline",
        "participle": "underlined"
    },
    "breach": {
        "past": "breached",
        "gerund": "breaching",
        "present_3s": "breaches",
        "present_non_3s": "breach",
        "participle": "breached"
    },
    "plead": {
        "past": "pleaded",
        "gerund": "pleading",
        "present_3s": "pleads",
        "present_non_3s": "plead",
        "participle": "pleaded"
    },
    "teach": {
        "past": "taught",
        "gerund": "teaching",
        "present_3s": "teachs",
        "present_non_3s": "teach",
        "participle": "taught"
    },
    "defend": {
        "past": "defended",
        "gerund": "defending",
        "present_3s": "defends",
        "present_non_3s": "defend",
        "participle": "defended"
    },
    "stun": {
        "past": "stunned",
        "gerund": "stunning",
        "present_3s": "stuns",
        "present_non_3s": "stun",
        "participle": "stuned"
    },
    "enhance": {
        "past": "enhanced",
        "gerund": "enhancing",
        "present_3s": "enhances",
        "present_non_3s": "enhance",
        "participle": "enhanced"
    },
    "violate": {
        "past": "violated",
        "gerund": "violating",
        "present_3s": "violates",
        "present_non_3s": "violate",
        "participle": "violated"
    },
    "enforce": {
        "past": "enforced",
        "gerund": "enforcing",
        "present_3s": "enforces",
        "present_non_3s": "enforce",
        "participle": "enforced"
    },
    "allege": {
        "past": "alleged",
        "gerund": "alleging",
        "present_3s": "alleges",
        "present_non_3s": "allege",
        "participle": "alleged"
    },
    "bolster": {
        "past": "bolstered",
        "gerund": "bolstering",
        "present_3s": "bolsters",
        "present_non_3s": "bolster",
        "participle": "bolstered"
    },
    "conclude": {
        "past": "concluded",
        "gerund": "concluding",
        "present_3s": "concludes",
        "present_non_3s": "conclude",
        "participle": "concluded"
    },
    "surface": {
        "past": "surfaced",
        "gerund": "surfacing",
        "present_3s": "surfaces",
        "present_non_3s": "surface",
        "participle": "surfaced"
    },
    "revise": {
        "past": "revised",
        "gerund": "revising",
        "present_3s": "revises",
        "present_non_3s": "revise",
        "participle": "revised"
    },
    "shade": {
        "past": "shaded",
        "gerund": "shading",
        "present_3s": "shades",
        "present_non_3s": "shade",
        "participle": "shaded"
    },
    "educate": {
        "past": "educated",
        "gerund": "educating",
        "present_3s": "educates",
        "present_non_3s": "educate",
        "participle": "educated"
    },
    "fade": {
        "past": "faded",
        "gerund": "fading",
        "present_3s": "fades",
        "present_non_3s": "fade",
        "participle": "faded"
    },
    "bleed": {
        "past": "bleeded",
        "gerund": "bleeding",
        "present_3s": "bleeds",
        "present_non_3s": "bleed",
        "participle": "bled"
    },
    "stab": {
        "past": "stabbed",
        "gerund": "stabbing",
        "present_3s": "stabs",
        "present_non_3s": "stab",
        "participle": "stabbed"
    },
    "resolve": {
        "past": "resolved",
        "gerund": "resolving",
        "present_3s": "resolves",
        "present_non_3s": "resolve",
        "participle": "resolved"
    },
    "love": {
        "past": "loved",
        "gerund": "loving",
        "present_3s": "loves",
        "present_non_3s": "love",
        "participle": "loved"
    },
    "struggle": {
        "past": "struggled",
        "gerund": "struggling",
        "present_3s": "struggles",
        "present_non_3s": "struggle",
        "participle": "struggled"
    },
    "advise": {
        "past": "advised",
        "gerund": "advising",
        "present_3s": "advises",
        "present_non_3s": "advise",
        "participle": "advised"
    },
    "inspire": {
        "past": "inspired",
        "gerund": "inspiring",
        "present_3s": "inspires",
        "present_non_3s": "inspire",
        "participle": "inspired"
    },
    "distinguish": {
        "past": "distinguished",
        "gerund": "distinguishing",
        "present_3s": "distinguishes",
        "present_non_3s": "distinguished",
        "participle": "distinguished"
    },
    "pair": {
        "past": "paired",
        "gerund": "pairing",
        "present_3s": "pairs",
        "present_non_3s": "pair",
        "participle": "paired"
    },
    "polish": {
        "past": "polished",
        "gerund": "polishing",
        "present_3s": "polishes",
        "present_non_3s": "polish",
        "participle": "polished"
    },
    "correct": {
        "past": "corrected",
        "gerund": "correcting",
        "present_3s": "corrects",
        "present_non_3s": "correct",
        "participle": "corrected"
    },
    "push": {
        "past": "pushed",
        "gerund": "pushing",
        "present_3s": "pushes",
        "present_non_3s": "push",
        "participle": "pushed"
    },
    "deteriorate": {
        "past": "deteriorated",
        "gerund": "deteriorating",
        "present_3s": "deteriorates",
        "present_non_3s": "deteriorate",
        "participle": "deteriorated"
    },
    "fear": {
        "past": "feared",
        "gerund": "fearing",
        "present_3s": "fears",
        "present_non_3s": "fear",
        "participle": "feared"
    },
    "demand": {
        "past": "demanded",
        "gerund": "demanding",
        "present_3s": "demands",
        "present_non_3s": "demand",
        "participle": "demanded"
    },
    "attend": {
        "past": "attended",
        "gerund": "attending",
        "present_3s": "attends",
        "present_non_3s": "attend",
        "participle": "attended"
    },
    "copy": {
        "past": "copied",
        "gerund": "copying",
        "present_3s": "copys",
        "present_non_3s": "copy",
        "participle": "copied"
    },
    "subject": {
        "past": "subjected",
        "gerund": "subjecting",
        "present_3s": "subjects",
        "present_non_3s": "subject",
        "participle": "subjected"
    },
    "prevent": {
        "past": "prevent",
        "gerund": "preventing",
        "present_3s": "prevents",
        "present_non_3s": "prevent",
        "participle": "prevent"
    },
    "care": {
        "past": "cared",
        "gerund": "caring",
        "present_3s": "cares",
        "present_non_3s": "care",
        "participle": "cared"
    },
    "concede": {
        "past": "conceded",
        "gerund": "conceding",
        "present_3s": "concedes",
        "present_non_3s": "concede",
        "participle": "conceded"
    },
    "discover": {
        "past": "discovered",
        "gerund": "discovering",
        "present_3s": "discovers",
        "present_non_3s": "discover",
        "participle": "discovered"
    },
    "avoid": {
        "past": "avoided",
        "gerund": "avoiding",
        "present_3s": "avoids",
        "present_non_3s": "avoid",
        "participle": "avoided"
    },
    "save": {
        "past": "saved",
        "gerund": "saving",
        "present_3s": "saves",
        "present_non_3s": "save",
        "participle": "saved"
    },
    "dismiss": {
        "past": "dismissed",
        "gerund": "dismissing",
        "present_3s": "dismisses",
        "present_non_3s": "dismiss",
        "participle": "dismissed"
    },
    "testify": {
        "past": "testified",
        "gerund": "testifying",
        "present_3s": "testifies",
        "present_non_3s": "testify",
        "participle": "testified"
    },
    "allow": {
        "past": "allowed",
        "gerund": "allowing",
        "present_3s": "allows",
        "present_non_3s": "allow",
        "participle": "allowed"
    },
    "enrage": {
        "past": "enraged",
        "gerund": "enraging",
        "present_3s": "enrages",
        "present_non_3s": "enrage",
        "participle": "enraged"
    },
    "expunge": {
        "past": "expunged",
        "gerund": "expunging",
        "present_3s": "expunges",
        "present_non_3s": "expunge",
        "participle": "expunged"
    },
    "crank": {
        "past": "cranked",
        "gerund": "cranking",
        "present_3s": "cranks",
        "present_non_3s": "crank",
        "participle": "cranked"
    },
    "interview": {
        "past": "interviewed",
        "gerund": "interviewing",
        "present_3s": "interviews",
        "present_non_3s": "interview",
        "participle": "interviewed"
    },
    "realize": {
        "past": "realized",
        "gerund": "realizing",
        "present_3s": "realizes",
        "present_non_3s": "realize",
        "participle": "realized"
    },
    "relieve": {
        "past": "relieved",
        "gerund": "relieving",
        "present_3s": "relieves",
        "present_non_3s": "relieve",
        "participle": "relieved"
    },
    "touch": {
        "past": "touched",
        "gerund": "touching",
        "present_3s": "touches",
        "present_non_3s": "touch",
        "participle": "touched"
    },
    "represent": {
        "past": "represented",
        "gerund": "representing",
        "present_3s": "represents",
        "present_non_3s": "represent",
        "participle": "represented"
    },
    "coach": {
        "past": "coached",
        "gerund": "coaching",
        "present_3s": "coaches",
        "present_non_3s": "coach",
        "participle": "coached"
    },
    "defeat": {
        "past": "defeated",
        "gerund": "defeating",
        "present_3s": "defeats",
        "present_non_3s": "defeat",
        "participle": "defeated"
    },
    "ace": {
        "past": "aced",
        "gerund": "acing",
        "present_3s": "aces",
        "present_non_3s": "ace",
        "participle": "aced"
    },
    "score": {
        "past": "scored",
        "gerund": "scoring",
        "present_3s": "scores",
        "present_non_3s": "score",
        "participle": "scored"
    },
    "aim": {
        "past": "aimed",
        "gerund": "aiming",
        "present_3s": "aims",
        "present_non_3s": "aim",
        "participle": "aimed"
    },
    "replicate": {
        "past": "replicated",
        "gerund": "replicating",
        "present_3s": "replicates",
        "present_non_3s": "replicate",
        "participle": "replicated"
    },
    "refer": {
        "past": "referred",
        "gerund": "referring",
        "present_3s": "refers",
        "present_non_3s": "refer",
        "participle": "referred"
    },
    "devise": {
        "past": "devised",
        "gerund": "devising",
        "present_3s": "devises",
        "present_non_3s": "devise",
        "participle": "devised"
    },
    "measure": {
        "past": "measured",
        "gerund": "measuring",
        "present_3s": "measures",
        "present_non_3s": "measure",
        "participle": "measured"
    },
    "sound": {
        "past": "sounded",
        "gerund": "sounding",
        "present_3s": "sounds",
        "present_non_3s": "sound",
        "participle": "sounded"
    },
    "ignore": {
        "past": "ignored",
        "gerund": "ignoring",
        "present_3s": "ignores",
        "present_non_3s": "ignore",
        "participle": "ignored"
    },
    "outrage": {
        "past": "outraged",
        "gerund": "outraging",
        "present_3s": "outrages",
        "present_non_3s": "outrage",
        "participle": "outraged"
    },
    "discontinue": {
        "past": "discontinued",
        "gerund": "discontinuing",
        "present_3s": "discontinues",
        "present_non_3s": "discontinue",
        "participle": "discontinued"
    },
    "threaten": {
        "past": "threatened",
        "gerund": "threatening",
        "present_3s": "threatens",
        "present_non_3s": "threaten",
        "participle": "threatened"
    },
    "implant": {
        "past": "implanted",
        "gerund": "implanting",
        "present_3s": "implants",
        "present_non_3s": "implant",
        "participle": "implanted"
    },
    "hamper": {
        "past": "hampered",
        "gerund": "hampering",
        "present_3s": "hampers",
        "present_non_3s": "hamper",
        "participle": "hampered"
    },
    "recruit": {
        "past": "recruited",
        "gerund": "recruiting",
        "present_3s": "recruits",
        "present_non_3s": "recruit",
        "participle": "recruited"
    },
    "nominate": {
        "past": "nominated",
        "gerund": "nominating",
        "present_3s": "nominates",
        "present_non_3s": "nominate",
        "participle": "nominated"
    },
    "serve": {
        "past": "served",
        "gerund": "serving",
        "present_3s": "serves",
        "present_non_3s": "serve",
        "participle": "served"
    },
    "assure": {
        "past": "assured",
        "gerund": "assuring",
        "present_3s": "assures",
        "present_non_3s": "assure",
        "participle": "assured"
    },
    "charge": {
        "past": "charged",
        "gerund": "charging",
        "present_3s": "charges",
        "present_non_3s": "charge",
        "participle": "charged"
    },
    "defuse": {
        "past": "defused",
        "gerund": "defusing",
        "present_3s": "defuses",
        "present_non_3s": "defuse",
        "participle": "defused"
    },
    "conduct": {
        "past": "conducted",
        "gerund": "conducting",
        "present_3s": "conducts",
        "present_non_3s": "conduct",
        "participle": "conducted"
    },
    "warn": {
        "past": "warned",
        "gerund": "warning",
        "present_3s": "warns",
        "present_non_3s": "warn",
        "participle": "warned"
    },
    "result": {
        "past": "resulted",
        "gerund": "resulting",
        "present_3s": "results",
        "present_non_3s": "result",
        "participle": "resulted"
    },
    "regenerate": {
        "past": "regenerated",
        "gerund": "regenerating",
        "present_3s": "regenerates",
        "present_non_3s": "regenerate",
        "participle": "regenerated"
    },
    "rekindle": {
        "past": "rekindled",
        "gerund": "rekindling",
        "present_3s": "rekindles",
        "present_non_3s": "rekindle",
        "participle": "rekindled"
    },
    "average": {
        "past": "averaged",
        "gerund": "averaging",
        "present_3s": "averages",
        "present_non_3s": "average",
        "participle": "averaged"
    },
    "merge": {
        "past": "merged",
        "gerund": "merging",
        "present_3s": "merges",
        "present_non_3s": "merge",
        "participle": "merged"
    },
    "bid": {
        "past": "bid",
        "gerund": "biding",
        "present_3s": "bids",
        "present_non_3s": "bid",
        "participle": "bided"
    },
    "bank": {
        "past": "banked",
        "gerund": "banking",
        "present_3s": "banks",
        "present_non_3s": "bank",
        "participle": "banked"
    },
    "fare": {
        "past": "fared",
        "gerund": "faring",
        "present_3s": "fares",
        "present_non_3s": "fare",
        "participle": "fared"
    },
    "sign": {
        "past": "signed",
        "gerund": "signing",
        "present_3s": "signs",
        "present_non_3s": "sign",
        "participle": "signed"
    },
    "leap": {
        "past": "leaped",
        "gerund": "leaping",
        "present_3s": "leapt",
        "present_non_3s": "leap",
        "participle": "leaped"
    },
    "associate": {
        "past": "associated",
        "gerund": "associating",
        "present_3s": "associates",
        "present_non_3s": "associate",
        "participle": "associated"
    },
    "trouble": {
        "past": "troubled",
        "gerund": "troubling",
        "present_3s": "troubles",
        "present_non_3s": "trouble",
        "participle": "troubled"
    },
    "tumble": {
        "past": "tumbled",
        "gerund": "tumbling",
        "present_3s": "tumbles",
        "present_non_3s": "tumble",
        "participle": "tumbled"
    },
    "prefer": {
        "past": "preferred",
        "gerund": "preferring",
        "present_3s": "prefers",
        "present_non_3s": "prefer",
        "participle": "preferred"
    },
    "lose": {
        "past": "lost",
        "gerund": "losing",
        "present_3s": "loses",
        "present_non_3s": "lose",
        "participle": "lost"
    },
    "redeem": {
        "past": "redeemed",
        "gerund": "redeeming",
        "present_3s": "redeems",
        "present_non_3s": "redeem",
        "participle": "redeemed"
    },
    "organize": {
        "past": "organized",
        "gerund": "organizing",
        "present_3s": "organizes",
        "present_non_3s": "organize",
        "participle": "organized"
    },
    "wish": {
        "past": "wished",
        "gerund": "wishing",
        "present_3s": "wishws",
        "present_non_3s": "wish",
        "participle": "wished"
    },
    "hear": {
        "past": "heard",
        "gerund": "hearing",
        "present_3s": "hears",
        "present_non_3s": "hear",
        "participle": "heard"
    },
    "send": {
        "past": "sent",
        "gerund": "sending",
        "present_3s": "sends",
        "present_non_3s": "send",
        "participle": "sent"
    },
    "hire": {
        "past": "hired",
        "gerund": "hiring",
        "present_3s": "hires",
        "present_non_3s": "hire",
        "participle": "hired"
    },
    "tip": {
        "past": "tipped",
        "gerund": "tipping",
        "present_3s": "tips",
        "present_non_3s": "tip",
        "participle": "tipped"
    },
    "form": {
        "past": "formed",
        "gerund": "forming",
        "present_3s": "forms",
        "present_non_3s": "form",
        "participle": "formed"
    },
    "chair": {
        "past": "chaired",
        "gerund": "chairing",
        "present_3s": "chairs",
        "present_non_3s": "chairs",
        "participle": "chaired"
    },
    "deal": {
        "past": "dealt",
        "gerund": "dealing",
        "present_3s": "deals",
        "present_non_3s": "deal",
        "participle": "dealt"
    },
    "prohibit": {
        "past": "prohibited",
        "gerund": "prohibiting",
        "present_3s": "prohibits",
        "present_non_3s": "prohibit",
        "participle": "prohibited"
    },
    "submit": {
        "past": "submitted",
        "gerund": "submitting",
        "present_3s": "submits",
        "present_non_3s": "submit",
        "participle": "submitted"
    },
    "initiate": {
        "past": "initiated",
        "gerund": "initiating",
        "present_3s": "initiates",
        "present_non_3s": "initiate",
        "participle": "initiated"
    },
    "date": {
        "past": "dated",
        "gerund": "dating",
        "present_3s": "dates",
        "present_non_3s": "date",
        "participle": "dated"
    },
    "mail": {
        "past": "mailed",
        "gerund": "mailing",
        "present_3s": "mails",
        "present_non_3s": "mail",
        "participle": "mailed"
    },
    "quit": {
        "past": "quited",
        "gerund": "quitting",
        "present_3s": "quits",
        "present_non_3s": "quit",
        "participle": "quited"
    },
    "relegate": {
        "past": "relegated",
        "gerund": "relegating",
        "present_3s": "relegates",
        "present_non_3s": "relegate",
        "participle": "relegated"
    },
    "mount": {
        "past": "mounted",
        "gerund": "mounting",
        "present_3s": "mounts",
        "present_non_3s": "mount",
        "participle": "mounted"
    },
    "harass": {
        "past": "harassed",
        "gerund": "harassing",
        "present_3s": "harasses",
        "present_non_3s": "harass",
        "participle": "harassed"
    },
    "punish": {
        "past": "punished",
        "gerund": "punishing",
        "present_3s": "punishes",
        "present_non_3s": "punish",
        "participle": "punished"
    },
    "cross": {
        "past": "crossed",
        "gerund": "crossing",
        "present_3s": "crosses",
        "present_non_3s": "cross",
        "participle": "crossed"
    },
    "review": {
        "past": "reviewed",
        "gerund": "reviewing",
        "present_3s": "reviews",
        "present_non_3s": "review",
        "participle": "reviewed"
    },
    "comment": {
        "past": "commented",
        "gerund": "commenting",
        "present_3s": "comments",
        "present_non_3s": "comment",
        "participle": "commented"
    },
    "consist": {
        "past": "consisted",
        "gerund": "consisting",
        "present_3s": "consists",
        "present_non_3s": "consist",
        "participle": "consisted"
    },
    "retaliate": {
        "past": "retaliated",
        "gerund": "retaliating",
        "present_3s": "retaliates",
        "present_non_3s": "retaliate",
        "participle": "retaliated"
    },
    "bar": {
        "past": "barred",
        "gerund": "baring",
        "present_3s": "bars",
        "present_non_3s": "bar",
        "participle": "barred"
    },
    "adopt": {
        "past": "adopted",
        "gerund": "adopting",
        "present_3s": "adopts",
        "present_non_3s": "adopt",
        "participle": "adopted"
    },
    "sentence": {
        "past": "sentenced",
        "gerund": "sentencing",
        "present_3s": "sentences",
        "present_non_3s": "sentence",
        "participle": "sentenced"
    },
    "cruise": {
        "past": "cruised",
        "gerund": "cruising",
        "present_3s": "cruises",
        "present_non_3s": "cruise",
        "participle": "cruised"
    },
    "appoint": {
        "past": "appointed",
        "gerund": "appointing",
        "present_3s": "appoints",
        "present_non_3s": "appoint",
        "participle": "appointed"
    },
    "exhibit": {
        "past": "exhibited",
        "gerund": "exhibiting",
        "present_3s": "exhibits",
        "present_non_3s": "exhibit",
        "participle": "exhibited"
    },
    "discredit": {
        "past": "discredited",
        "gerund": "discrediting",
        "present_3s": "discredits",
        "present_non_3s": "discredit",
        "participle": "discredited"
    },
    "empower": {
        "past": "empowered",
        "gerund": "empowering",
        "present_3s": "empowers",
        "present_non_3s": "empower",
        "participle": "empowered"
    },
    "round": {
        "past": "rounded",
        "gerund": "rounding",
        "present_3s": "rounds",
        "present_non_3s": "round",
        "participle": "rounded"
    },
    "manipulate": {
        "past": "manipulated",
        "gerund": "manipulating",
        "present_3s": "manipulates",
        "present_non_3s": "manipulate",
        "participle": "manipulated"
    },
    "apologize": {
        "past": "apologized",
        "gerund": "apologizing",
        "present_3s": "apologizes",
        "present_non_3s": "apologize",
        "participle": "apologized"
    },
    "rebuke": {
        "past": "rebuked",
        "gerund": "rebuking",
        "present_3s": "rebukes",
        "present_non_3s": "rebuke",
        "participle": "rebuked"
    },
    "fret": {
        "past": "fretted",
        "gerund": "fretting",
        "present_3s": "frets",
        "present_non_3s": "fret",
        "participle": "fretted"
    },
    "summon": {
        "past": "summoned",
        "gerund": "summoning",
        "present_3s": "summons",
        "present_non_3s": "summon",
        "participle": "summoned"
    },
    "understand": {
        "past": "understood",
        "gerund": "understanding",
        "present_3s": "understands",
        "present_non_3s": "understand",
        "participle": "understood"
    },
    "investigate": {
        "past": "investigated",
        "gerund": "investigating",
        "present_3s": "investigates",
        "present_non_3s": "investigate",
        "participle": "investigated"
    },
    "like": {
        "past": "liked",
        "gerund": "liking",
        "present_3s": "likes",
        "present_non_3s": "like",
        "participle": "liked"
    },
    "embarrass": {
        "past": "embarrassed",
        "gerund": "embarrassing",
        "present_3s": "embarrasses",
        "present_non_3s": "embarrass",
        "participle": "embarrassed"
    },
    "sacrifice": {
        "past": "sacrificed",
        "gerund": "sacrificing",
        "present_3s": "sacrifices",
        "present_non_3s": "sacrifice",
        "participle": "sacrificed"
    },
    "accept": {
        "past": "accepted",
        "gerund": "accepting",
        "present_3s": "accepts",
        "present_non_3s": "accept",
        "participle": "accepted"
    },
    "fuel": {
        "past": "fueled",
        "gerund": "fueling",
        "present_3s": "fuels",
        "present_non_3s": "fuel",
        "participle": "fueled"
    },
    "limit": {
        "past": "limited",
        "gerund": "limiting",
        "present_3s": "limits",
        "present_non_3s": "limit",
        "participle": "limited"
    },
    "undercut": {
        "past": "undercut",
        "gerund": "undercutting",
        "present_3s": "undercuts",
        "present_non_3s": "undercut",
        "participle": "undercut"
    },
    "accuse": {
        "past": "accused",
        "gerund": "accusing",
        "present_3s": "accuses",
        "present_non_3s": "accuse",
        "participle": "accused"
    },
    "map": {
        "past": "mapped",
        "gerund": "mapping",
        "present_3s": "maps",
        "present_non_3s": "map",
        "participle": "mapped"
    },
    "contact": {
        "past": "contacted",
        "gerund": "contacting",
        "present_3s": "contacts",
        "present_non_3s": "contact",
        "participle": "contacted"
    },
    "compile": {
        "past": "compiled",
        "gerund": "compiling",
        "present_3s": "compiles",
        "present_non_3s": "compile",
        "participle": "compiled"
    },
    "guarantee": {
        "past": "guaranteed",
        "gerund": "guaranteeing",
        "present_3s": "guarantees",
        "present_non_3s": "guarantee",
        "participle": "guaranteed"
    },
    "switch": {
        "past": "switched",
        "gerund": "switching",
        "present_3s": "switches",
        "present_non_3s": "switch",
        "participle": "switched"
    },
    "phase": {
        "past": "phased",
        "gerund": "phasing",
        "present_3s": "phases",
        "present_non_3s": "phase",
        "participle": "phased"
    },
    "fabricate": {
        "past": "fabricated",
        "gerund": "fabricating",
        "present_3s": "fabricates",
        "present_non_3s": "fabricate",
        "participle": "fabricated"
    },
    "convert": {
        "past": "converted",
        "gerund": "converting",
        "present_3s": "converts",
        "present_non_3s": "convert",
        "participle": "converted"
    },
    "position": {
        "past": "positioned",
        "gerund": "positioning",
        "present_3s": "positions",
        "present_non_3s": "position",
        "participle": "positioned"
    },
    "lock": {
        "past": "locked",
        "gerund": "locking",
        "present_3s": "locks",
        "present_non_3s": "lock",
        "participle": "locked"
    },
    "offset": {
        "past": "offset",
        "gerund": "offsetting",
        "present_3s": "offsets",
        "present_non_3s": "offset",
        "participle": "offset"
    },
    "drove": {
        "past": "drove",
        "gerund": "driving",
        "present_3s": "droves",
        "present_non_3s": "drive",
        "participle": "drove"
    },
    "convince": {
        "past": "convinced",
        "gerund": "convincing",
        "present_3s": "convinces",
        "present_non_3s": "convince",
        "participle": "convinced"
    },
    "erode": {
        "past": "eroded",
        "gerund": "eroding",
        "present_3s": "erodes",
        "present_non_3s": "erode",
        "participle": "eroded"
    },
    "trace": {
        "past": "traced",
        "gerund": "tracing",
        "present_3s": "traces",
        "present_non_3s": "trace",
        "participle": "traced"
    },
    "contend": {
        "past": "contended",
        "gerund": "contending",
        "present_3s": "contends",
        "present_non_3s": "contend",
        "participle": "contended"
    },
    "drift": {
        "past": "drifted",
        "gerund": "drifting",
        "present_3s": "drifts",
        "present_non_3s": "drift",
        "participle": "drifted"
    },
    "pressure": {
        "past": "pressured",
        "gerund": "pressuring",
        "present_3s": "pressures",
        "present_non_3s": "pressure",
        "participle": "pressured"
    },
    "laugh": {
        "past": "laughed",
        "gerund": "laughing",
        "present_3s": "laughs",
        "present_non_3s": "laugh",
        "participle": "laughed"
    },
    "fume": {
        "past": "fumed",
        "gerund": "fuming",
        "present_3s": "fumes",
        "present_non_3s": "fume",
        "participle": "fumed"
    },
    "persuade": {
        "past": "persuaded",
        "gerund": "persuading",
        "present_3s": "persuades",
        "present_non_3s": "persuade",
        "participle": "persuaded"
    },
    "negotiate": {
        "past": "negotiated",
        "gerund": "negotiating",
        "present_3s": "negotiates",
        "present_non_3s": "negotiate",
        "participle": "negotiated"
    },
    "flood": {
        "past": "flooded",
        "gerund": "flooding",
        "present_3s": "floods",
        "present_non_3s": "flood",
        "participle": "flooded"
    },
    "bill": {
        "past": "billed",
        "gerund": "billing",
        "present_3s": "bills",
        "present_non_3s": "bill",
        "participle": "billed"
    },
    "flush": {
        "past": "flushed",
        "gerund": "flushing",
        "present_3s": "flushes",
        "present_non_3s": "flush",
        "participle": "flushed"
    },
    "alienate": {
        "past": "alienated",
        "gerund": "alienating",
        "present_3s": "alienates",
        "present_non_3s": "alienate",
        "participle": "alienated"
    },
    "microwave": {
        "past": "microwaved",
        "gerund": "microwaving",
        "present_3s": "microwaves",
        "present_non_3s": "microwave",
        "participle": "microwaved"
    },
    "chastise": {
        "past": "chastised",
        "gerund": "chastising",
        "present_3s": "chastises",
        "present_non_3s": "chastise",
        "participle": "chastised"
    },
    "practice": {
        "past": "practiced",
        "gerund": "practicing",
        "present_3s": "practices",
        "present_non_3s": "practice",
        "participle": "practiced"
    },
    "print": {
        "past": "printed",
        "gerund": "printing",
        "present_3s": "prints",
        "present_non_3s": "print",
        "participle": "printed"
    },
    "portray": {
        "past": "portrayed",
        "gerund": "portraying",
        "present_3s": "portrays",
        "present_non_3s": "portray",
        "participle": "portrayed"
    },
    "question": {
        "past": "questioned",
        "gerund": "questioning",
        "present_3s": "questions",
        "present_non_3s": "question",
        "participle": "questioned"
    },
    "risk": {
        "past": "risked",
        "gerund": "risking",
        "present_3s": "risks",
        "present_non_3s": "risk",
        "participle": "risked"
    },
    "rely": {
        "past": "relyed",
        "gerund": "relying",
        "present_3s": "relies",
        "present_non_3s": "rely",
        "participle": "relied"
    },
    "scare": {
        "past": "scared",
        "gerund": "scaring",
        "present_3s": "scares",
        "present_non_3s": "scare",
        "participle": "scared"
    },
    "sleep": {
        "past": "slept",
        "gerund": "sleeping",
        "present_3s": "sleeps",
        "present_non_3s": "sleep",
        "participle": "slept"
    },
    "supply": {
        "past": "supplied",
        "gerund": "supplying",
        "present_3s": "supplies",
        "present_non_3s": "supply",
        "participle": "supplied"
    },
    "service": {
        "past": "serviced",
        "gerund": "servicing",
        "present_3s": "services",
        "present_non_3s": "service",
        "participle": "serviced"
    },
    "damage": {
        "past": "damaged",
        "gerund": "damaging",
        "present_3s": "damages",
        "present_non_3s": "damage",
        "participle": "damaged"
    },
    "pitch": {
        "past": "pitched",
        "gerund": "pitching",
        "present_3s": "pitches",
        "present_non_3s": "pitch",
        "participle": "pitched"
    },
    "press": {
        "past": "pressed",
        "gerund": "pressing",
        "present_3s": "presses",
        "present_non_3s": "press",
        "participle": "pressed"
    },
    "ward": {
        "past": "warded",
        "gerund": "warding",
        "present_3s": "wards",
        "present_non_3s": "ward",
        "participle": "warded"
    },
    "sweeten": {
        "past": "sweetened",
        "gerund": "sweetening",
        "present_3s": "sweetens",
        "present_non_3s": "sweeten",
        "participle": "sweetened"
    },
    "allocate": {
        "past": "allocated",
        "gerund": "allocating",
        "present_3s": "allocates",
        "present_non_3s": "allocate",
        "participle": "allocated"
    },
    "top": {
        "past": "topped",
        "gerund": "topping",
        "present_3s": "tops",
        "present_non_3s": "top",
        "participle": "topped"
    },
    "criticize": {
        "past": "criticized",
        "gerund": "criticizing",
        "present_3s": "criticizes",
        "present_non_3s": "criticize",
        "participle": "criticized"
    },
    "characterize": {
        "past": "characterized",
        "gerund": "characterizing",
        "present_3s": "characterizes",
        "present_non_3s": "characterize",
        "participle": "characterized"
    },
    "entrench": {
        "past": "entrenched",
        "gerund": "entrenching",
        "present_3s": "entrenches",
        "present_non_3s": "entrench",
        "participle": "entrenched"
    },
    "materialize": {
        "past": "materialized",
        "gerund": "materializing",
        "present_3s": "materializes",
        "present_non_3s": "materialize",
        "participle": "materialized"
    },
    "stem": {
        "past": "stemmed",
        "gerund": "stemming",
        "present_3s": "stems",
        "present_non_3s": "stem",
        "participle": "stemmed"
    },
    "equip": {
        "past": "equipped",
        "gerund": "equipping",
        "present_3s": "equips",
        "present_non_3s": "equip",
        "participle": "equipped"
    },
    "promote": {
        "past": "promoted",
        "gerund": "promoting",
        "present_3s": "promotes",
        "present_non_3s": "promote",
        "participle": "promoted"
    },
    "praise": {
        "past": "praised",
        "gerund": "praising",
        "present_3s": "praises",
        "present_non_3s": "praise",
        "participle": "praised"
    },
    "weigh": {
        "past": "weighed",
        "gerund": "weighing",
        "present_3s": "weighs",
        "present_non_3s": "weigh",
        "participle": "weighed"
    },
    "withstand": {
        "past": "withstood",
        "gerund": "withstanding",
        "present_3s": "withstands",
        "present_non_3s": "withstand",
        "participle": "withstood"
    },
    "install": {
        "past": "installed",
        "gerund": "installing",
        "present_3s": "installs",
        "present_non_3s": "install",
        "participle": "installed"
    },
    "transport": {
        "past": "transported",
        "gerund": "transporting",
        "present_3s": "transports",
        "present_non_3s": "transport",
        "participle": "transported"
    },
    "declare": {
        "past": "declared",
        "gerund": "declaring",
        "present_3s": "declares",
        "present_non_3s": "declare",
        "participle": "declared"
    },
    "zoom": {
        "past": "zoomed",
        "gerund": "zooming",
        "present_3s": "zooms",
        "present_non_3s": "zoom",
        "participle": "zoomed"
    },
    "boast": {
        "past": "boasted",
        "gerund": "boasting",
        "present_3s": "boasts",
        "present_non_3s": "boast",
        "participle": "boasted"
    },
    "crack": {
        "past": "cracked",
        "gerund": "cracking",
        "present_3s": "cracks",
        "present_non_3s": "crack",
        "participle": "cracked"
    },
    "encroach": {
        "past": "encroached",
        "gerund": "encroaching",
        "present_3s": "encroaches",
        "present_non_3s": "encroach",
        "participle": "encroached"
    },
    "soar": {
        "past": "soared",
        "gerund": "soaring",
        "present_3s": "soars",
        "present_non_3s": "soar",
        "participle": "soared"
    },
    "steal": {
        "past": "stole",
        "gerund": "stealing",
        "present_3s": "steals",
        "present_non_3s": "steal",
        "participle": "stole"
    },
    "command": {
        "past": "commanded",
        "gerund": "commanding",
        "present_3s": "commands",
        "present_non_3s": "command",
        "participle": "commanded"
    },
    "exhaust": {
        "past": "exhausted",
        "gerund": "exhausting",
        "present_3s": "exhausts",
        "present_non_3s": "exhaust",
        "participle": "exhausted"
    },
    "ripen": {
        "past": "ripened",
        "gerund": "ripening",
        "present_3s": "ripens",
        "present_non_3s": "ripen",
        "participle": "ripened"
    },
    "check": {
        "past": "checked",
        "gerund": "checking",
        "present_3s": "checks",
        "present_non_3s": "check",
        "participle": "checked"
    },
    "ship": {
        "past": "shipped",
        "gerund": "shipping",
        "present_3s": "ships",
        "present_non_3s": "ship",
        "participle": "shipped"
    },
    "remark": {
        "past": "remarked",
        "gerund": "remarking",
        "present_3s": "remarks",
        "present_non_3s": "remark",
        "participle": "remarked"
    },
    "moderate": {
        "past": "moderated",
        "gerund": "moderating",
        "present_3s": "moderates",
        "present_non_3s": "moderate",
        "participle": "moderated"
    },
    "divide": {
        "past": "divided",
        "gerund": "dividing",
        "present_3s": "divides",
        "present_non_3s": "divide",
        "participle": "divided"
    },
    "tilt": {
        "past": "tilted",
        "gerund": "tilting",
        "present_3s": "tilts",
        "present_non_3s": "tilt",
        "participle": "tilted"
    },
    "exercise": {
        "past": "exercised",
        "gerund": "exercising",
        "present_3s": "exercises",
        "present_non_3s": "exercise",
        "participle": "exercised"
    },
    "postpone": {
        "past": "postponed",
        "gerund": "postponing",
        "present_3s": "postpones",
        "present_non_3s": "postpone",
        "participle": "postponed"
    },
    "reschedule": {
        "past": "rescheduled",
        "gerund": "rescheduling",
        "present_3s": "reschedules",
        "present_non_3s": "reschedule",
        "participle": "rescheduled"
    },
    "entangle": {
        "past": "entangled",
        "gerund": "entangling",
        "present_3s": "entangles",
        "present_non_3s": "entangle",
        "participle": "entangled"
    },
    "mature": {
        "past": "matured",
        "gerund": "maturing",
        "present_3s": "matures",
        "present_non_3s": "mature",
        "participle": "matured"
    },
    "audition": {
        "past": "auditioned",
        "gerund": "auditioning",
        "present_3s": "auditions",
        "present_non_3s": "audition",
        "participle": "auctioned"
    },
    "finish": {
        "past": "finished",
        "gerund": "finishing",
        "present_3s": "finishes",
        "present_non_3s": "finish",
        "participle": "finished"
    },
    "advance": {
        "past": "advanced",
        "gerund": "advancing",
        "present_3s": "advances",
        "present_non_3s": "advance",
        "participle": "advanced"
    },
    "evaporate": {
        "past": "evaporated",
        "gerund": "evaporating",
        "present_3s": "evaporates",
        "present_non_3s": "evaporate",
        "participle": "evaporated"
    },
    "rush": {
        "past": "rushed",
        "gerund": "rushing",
        "present_3s": "rushes",
        "present_non_3s": "rush",
        "participle": "rushed"
    },
    "rebuff": {
        "past": "rebuffed",
        "gerund": "rebuffing",
        "present_3s": "rebuffs",
        "present_non_3s": "rebuff",
        "participle": "rebuffed"
    },
    "clamp": {
        "past": "clamped",
        "gerund": "clamping",
        "present_3s": "clamps",
        "present_non_3s": "clamp",
        "participle": "clamped"
    },
    "surprise": {
        "past": "surprised",
        "gerund": "surprising",
        "present_3s": "surprises",
        "present_non_3s": "surprise",
        "participle": "surprised"
    },
    "collapse": {
        "past": "collapsed",
        "gerund": "collapsing",
        "present_3s": "collapses",
        "present_non_3s": "collapse",
        "participle": "collapsed"
    },
    "lessen": {
        "past": "lessened",
        "gerund": "lessening",
        "present_3s": "lessens",
        "present_non_3s": "lessen",
        "participle": "lessened"
    },
    "finance": {
        "past": "financed",
        "gerund": "financing",
        "present_3s": "finances",
        "present_non_3s": "finance",
        "participle": "financed"
    },
    "answer": {
        "past": "answered",
        "gerund": "answering",
        "present_3s": "answers",
        "present_non_3s": "answer",
        "participle": "answered"
    },
    "spurn": {
        "past": "spurned",
        "gerund": "spurning",
        "present_3s": "spurns",
        "present_non_3s": "spurn",
        "participle": "spurned"
    },
    "challenge": {
        "past": "challenged",
        "gerund": "challenging",
        "present_3s": "challenges",
        "present_non_3s": "challenge",
        "participle": "challenged"
    },
    "license": {
        "past": "licensed",
        "gerund": "licensing",
        "present_3s": "licenses",
        "present_non_3s": "license",
        "participle": "licensed"
    },
    "combat": {
        "past": "combated",
        "gerund": "combating",
        "present_3s": "combats",
        "present_non_3s": "combat",
        "participle": "combated"
    },
    "patent": {
        "past": "patented",
        "gerund": "patenting",
        "present_3s": "patents",
        "present_non_3s": "patent",
        "participle": "patented"
    },
    "loom": {
        "past": "loomed",
        "gerund": "looming",
        "present_3s": "looms",
        "present_non_3s": "loom",
        "participle": "loomed"
    },
    "color": {
        "past": "colored",
        "gerund": "coloring",
        "present_3s": "colors",
        "present_non_3s": "color",
        "participle": "colored"
    },
    "disagree": {
        "past": "disagreed",
        "gerund": "disagreeing",
        "present_3s": "disagrees",
        "present_non_3s": "disagree",
        "participle": "disagreed"
    },
    "perceive": {
        "past": "perceived",
        "gerund": "perceiving",
        "present_3s": "perceives",
        "present_non_3s": "perceive",
        "participle": "perceived"
    },
    "stir": {
        "past": "stirred",
        "gerund": "stirring",
        "present_3s": "stirs",
        "present_non_3s": "stir",
        "participle": "stirred"
    },
    "escalate": {
        "past": "escalated",
        "gerund": "escalating",
        "present_3s": "escalates",
        "present_non_3s": "escalate",
        "participle": "escalated"
    },
    "highlight": {
        "past": "highlighted",
        "gerund": "highlighting",
        "present_3s": "highlights",
        "present_non_3s": "highlight",
        "participle": "highlighted"
    },
    "clarify": {
        "past": "clarified",
        "gerund": "clarifying",
        "present_3s": "clarifies",
        "present_non_3s": "clarify",
        "participle": "clarified"
    },
    "sort": {
        "past": "sorted",
        "gerund": "sorting",
        "present_3s": "sorts",
        "present_non_3s": "sort",
        "participle": "sorted"
    },
    "trust": {
        "past": "trusted",
        "gerund": "trusting",
        "present_3s": "trusts",
        "present_non_3s": "trust",
        "participle": "trusted"
    },
    "penetrate": {
        "past": "penetrated",
        "gerund": "penetrating",
        "present_3s": "penetrates",
        "present_non_3s": "penetrate",
        "participle": "penetrated"
    },
    "guide": {
        "past": "guided",
        "gerund": "guiding",
        "present_3s": "guides",
        "present_non_3s": "guide",
        "participle": "guided"
    },
    "secure": {
        "past": "secured",
        "gerund": "securing",
        "present_3s": "secures",
        "present_non_3s": "secure",
        "participle": "secured"
    },
    "milk": {
        "past": "milked",
        "gerund": "milking",
        "present_3s": "milks",
        "present_non_3s": "milk",
        "participle": "milked"
    },
    "bankroll": {
        "past": "bankrolled",
        "gerund": "bankrolling",
        "present_3s": "bankrolls",
        "present_non_3s": "bankroll",
        "participle": "bankrolled"
    },
    "heighten": {
        "past": "heightened",
        "gerund": "heightening",
        "present_3s": "heightens",
        "present_non_3s": "heighten",
        "participle": "heightened"
    },
    "perform": {
        "past": "performed",
        "gerund": "performing",
        "present_3s": "performs",
        "present_non_3s": "perform",
        "participle": "performed"
    },
    "queue": {
        "past": "queued",
        "gerund": "queuing",
        "present_3s": "queues",
        "present_non_3s": "queue",
        "participle": "queued"
    },
    "generate": {
        "past": "generated",
        "gerund": "generating",
        "present_3s": "generates",
        "present_non_3s": "generate",
        "participle": "generated"
    },
    "omit": {
        "past": "omitted",
        "gerund": "omitting",
        "present_3s": "omits",
        "present_non_3s": "omit",
        "participle": "omitted"
    },
    "qualify": {
        "past": "qualified",
        "gerund": "qualifying",
        "present_3s": "qualifies",
        "present_non_3s": "qualify",
        "participle": "qualified"
    },
    "bundle": {
        "past": "bundled",
        "gerund": "bundling",
        "present_3s": "bundles",
        "present_non_3s": "bundle",
        "participle": "bundled"
    },
    "segment": {
        "past": "segmented",
        "gerund": "segmenting",
        "present_3s": "segments",
        "present_non_3s": "segment",
        "participle": "segmented"
    },
    "throw": {
        "past": "threw",
        "gerund": "throwing",
        "present_3s": "throws",
        "present_non_3s": "throw",
        "participle": "threw"
    },
    "borrow": {
        "past": "borrowed",
        "gerund": "borrowing",
        "present_3s": "borrows",
        "present_non_3s": "borrow",
        "participle": "borrowed"
    },
    "tailor": {
        "past": "tailored",
        "gerund": "tailoring",
        "present_3s": "tailors",
        "present_non_3s": "tailor",
        "participle": "tailored"
    },
    "beget": {
        "past": "begot",
        "gerund": "begetting",
        "present_3s": "begets",
        "present_non_3s": "beget",
        "participle": "begot"
    },
    "computerize": {
        "past": "computerized",
        "gerund": "computerizing",
        "present_3s": "computerizes",
        "present_non_3s": "computerize",
        "participle": "computerized"
    },
    "analyze": {
        "past": "analyzed",
        "gerund": "analyzing",
        "present_3s": "analyzes",
        "present_non_3s": "analyze",
        "participle": "analyzed"
    },
    "stagger": {
        "past": "staggered",
        "gerund": "staggering",
        "present_3s": "staggers",
        "present_non_3s": "stagger",
        "participle": "staggered"
    },
    "define": {
        "past": "defined",
        "gerund": "defining",
        "present_3s": "defines",
        "present_non_3s": "define",
        "participle": "defined"
    },
    "cultivate": {
        "past": "cultivated",
        "gerund": "cultivating",
        "present_3s": "cultivates",
        "present_non_3s": "cultivate",
        "participle": "cultivated"
    },
    "spread": {
        "past": "spread",
        "gerund": "spreading",
        "present_3s": "spreads",
        "present_non_3s": "spread",
        "participle": "spread"
    },
    "package": {
        "past": "packaged",
        "gerund": "packaging",
        "present_3s": "packages",
        "present_non_3s": "package",
        "participle": "packaged"
    },
    "flourish": {
        "past": "flourished",
        "gerund": "flourishing",
        "present_3s": "flourishs",
        "present_non_3s": "flourish",
        "participle": "flourished"
    },
    "split": {
        "past": "splited",
        "gerund": "spliting",
        "present_3s": "splits",
        "present_non_3s": "split",
        "participle": "split"
    },
    "delete": {
        "past": "deleted",
        "gerund": "deleting",
        "present_3s": "deletes",
        "present_non_3s": "delete",
        "participle": "deleted"
    },
    "resubmit": {
        "past": "resubmitted",
        "gerund": "resubmitting",
        "present_3s": "resubmits",
        "present_non_3s": "resubmit",
        "participle": "resubmitted"
    },
    "teeter": {
        "past": "teetered",
        "gerund": "teetering",
        "present_3s": "teeters",
        "present_non_3s": "teeter",
        "participle": "teetered"
    },
    "experience": {
        "past": "experienced",
        "gerund": "experiencing",
        "present_3s": "experiences",
        "present_non_3s": "experience",
        "participle": "experienced"
    },
    "delay": {
        "past": "delayed",
        "gerund": "delaying",
        "present_3s": "delays",
        "present_non_3s": "delay",
        "participle": "delayed"
    },
    "reinstate": {
        "past": "reinstated",
        "gerund": "reinstating",
        "present_3s": "reinstates",
        "present_non_3s": "reinstate",
        "participle": "reinstated"
    },
    "pit": {
        "past": "pited",
        "gerund": "pitting",
        "present_3s": "pit",
        "present_non_3s": "pit",
        "participle": "pited"
    },
    "reopen": {
        "past": "reopened",
        "gerund": "reopening",
        "present_3s": "reopens",
        "present_non_3s": "reopen",
        "participle": "reopened"
    },
    "knock": {
        "past": "knocked",
        "gerund": "knocking",
        "present_3s": "knocks",
        "present_non_3s": "knock",
        "participle": "knocked"
    },
    "synchronize": {
        "past": "synchronized",
        "gerund": "synchronizing",
        "present_3s": "synchronizes",
        "present_non_3s": "synchronize",
        "participle": "synchronized"
    },
    "aggravate": {
        "past": "aggravated",
        "gerund": "aggravating",
        "present_3s": "aggravates",
        "present_non_3s": "aggravate",
        "participle": "aggravated"
    },
    "express": {
        "past": "expressed",
        "gerund": "expressing",
        "present_3s": "expresses",
        "present_non_3s": "express",
        "participle": "expressed"
    },
    "heat": {
        "past": "heated",
        "gerund": "heating",
        "present_3s": "heats",
        "present_non_3s": "heat",
        "participle": "heated"
    },
    "shut": {
        "past": "shut",
        "gerund": "shutting",
        "present_3s": "shuts",
        "present_non_3s": "shut",
        "participle": "shut"
    },
    "anger": {
        "past": "angered",
        "gerund": "angering",
        "present_3s": "angers",
        "present_non_3s": "anger",
        "participle": "angered"
    },
    "annoy": {
        "past": "annoyed",
        "gerund": "annoying",
        "present_3s": "annoys",
        "present_non_3s": "annoy",
        "participle": "annoyed"
    },
    "cascade": {
        "past": "cascaded",
        "gerund": "cascading",
        "present_3s": "cascades",
        "present_non_3s": "cascade",
        "participle": "cascaded"
    },
    "chat": {
        "past": "chatted",
        "gerund": "chatting",
        "present_3s": "chats",
        "present_non_3s": "chat",
        "participle": "chatted"
    },
    "enjoy": {
        "past": "enjoyed",
        "gerund": "enjoying",
        "present_3s": "enjoys",
        "present_non_3s": "enjoy",
        "participle": "enjoyed"
    },
    "herald": {
        "past": "heralded",
        "gerund": "heralding",
        "present_3s": "heralds",
        "present_non_3s": "herald",
        "participle": "heralded"
    },
    "rung": {
        "past": "runged",
        "gerund": "ring",
        "present_3s": "rungs",
        "present_non_3s": "rang",
        "participle": "runged"
    },
    "scrape": {
        "past": "scraped",
        "gerund": "scraping",
        "present_3s": "scrapes",
        "present_non_3s": "scrape",
        "participle": "scraped"
    },
    "diminish": {
        "past": "diminished",
        "gerund": "diminishing",
        "present_3s": "diminishes",
        "present_non_3s": "diminish",
        "participle": "diminished"
    },
    "descend": {
        "past": "descended",
        "gerund": "descending",
        "present_3s": "descends",
        "present_non_3s": "descend",
        "participle": "descended"
    },
    "alter": {
        "past": "altered",
        "gerund": "altering",
        "present_3s": "alters",
        "present_non_3s": "alter",
        "participle": "altered"
    },
    "memorize": {
        "past": "memorized",
        "gerund": "memorizing",
        "present_3s": "memorizes",
        "present_non_3s": "memorize",
        "participle": "memorized"
    },
    "speak": {
        "past": "spoke",
        "gerund": "speaking",
        "present_3s": "speaks",
        "present_non_3s": "speak",
        "participle": "spoke"
    },
    "muffle": {
        "past": "muffled",
        "gerund": "muffling",
        "present_3s": "muffles",
        "present_non_3s": "muffle",
        "participle": "muffled"
    },
    "absorb": {
        "past": "absorbed",
        "gerund": "absorbing",
        "present_3s": "absorbs",
        "present_non_3s": "absorb",
        "participle": "absorbed"
    },
    "stare": {
        "past": "stared",
        "gerund": "staring",
        "present_3s": "stares",
        "present_non_3s": "stare",
        "participle": "stared"
    },
    "retard": {
        "past": "retarded",
        "gerund": "retarding",
        "present_3s": "retards",
        "present_non_3s": "retard",
        "participle": "retarded"
    },
    "stay": {
        "past": "stayed",
        "gerund": "staying",
        "present_3s": "stays",
        "present_non_3s": "stay",
        "participle": "stayed"
    },
    "skip": {
        "past": "skipped",
        "gerund": "skipping",
        "present_3s": "skips",
        "present_non_3s": "skip",
        "participle": "skipped"
    },
    "sit": {
        "past": "sited",
        "gerund": "sitting",
        "present_3s": "sits",
        "present_non_3s": "sit",
        "participle": "sited"
    },
    "dwindle": {
        "past": "dwindled",
        "gerund": "dwindling",
        "present_3s": "dwindles",
        "present_non_3s": "dwindle",
        "participle": "dwindled"
    },
    "sack": {
        "past": "sacked",
        "gerund": "sacking",
        "present_3s": "sacks",
        "present_non_3s": "sack",
        "participle": "sacked"
    },
    "mix": {
        "past": "mixed",
        "gerund": "mixing",
        "present_3s": "mixes",
        "present_non_3s": "mixed",
        "participle": "mixed"
    },
    "found": {
        "past": "founded",
        "gerund": "founding",
        "present_3s": "founds",
        "present_non_3s": "found",
        "participle": "founded"
    },
    "faint": {
        "past": "fainted",
        "gerund": "fainting",
        "present_3s": "faints",
        "present_non_3s": "faint",
        "participle": "fainted"
    },
    "observe": {
        "past": "observed",
        "gerund": "observing",
        "present_3s": "observes",
        "present_non_3s": "observe",
        "participle": "observed"
    },
    "desire": {
        "past": "desired",
        "gerund": "desiring",
        "present_3s": "desires",
        "present_non_3s": "desire",
        "participle": "desired"
    },
    "dress": {
        "past": "dressed",
        "gerund": "dressing",
        "present_3s": "dresses",
        "present_non_3s": "dress",
        "participle": "dressed"
    },
    "decorate": {
        "past": "decorated",
        "gerund": "decorating",
        "present_3s": "decorates",
        "present_non_3s": "decorate",
        "participle": "decorated"
    },
    "unsettle": {
        "past": "unsettled",
        "gerund": "unsettling",
        "present_3s": "unsettles",
        "present_non_3s": "unsettle",
        "participle": "unsettled"
    },
    "breathe": {
        "past": "breathed",
        "gerund": "breathing",
        "present_3s": "breathes",
        "present_non_3s": "breathe",
        "participle": "breathed"
    },
    "mate": {
        "past": "mated",
        "gerund": "mating",
        "present_3s": "mates",
        "present_non_3s": "mate",
        "participle": "mated"
    },
    "tank": {
        "past": "tanked",
        "gerund": "tanking",
        "present_3s": "tanks",
        "present_non_3s": "tank",
        "participle": "tanked"
    },
    "escape": {
        "past": "escaped",
        "gerund": "escaping",
        "present_3s": "escapes",
        "present_non_3s": "escape",
        "participle": "escaped"
    },
    "behave": {
        "past": "behaved",
        "gerund": "behaving",
        "present_3s": "behaves",
        "present_non_3s": "behave",
        "participle": "behaved"
    },
    "underlie": {
        "past": "underlied",
        "gerund": "underlying",
        "present_3s": "underlies",
        "present_non_3s": "underlie",
        "participle": "underlied"
    },
    "forecast": {
        "past": "forecasted",
        "gerund": "forecasting",
        "present_3s": "forecasts",
        "present_non_3s": "forecast",
        "participle": "forecast"
    },
    "trail": {
        "past": "trailed",
        "gerund": "trailing",
        "present_3s": "trails",
        "present_non_3s": "trail",
        "participle": "trailed"
    },
    "infringe": {
        "past": "infringed",
        "gerund": "infringing",
        "present_3s": "infringes",
        "present_non_3s": "infringe",
        "participle": "infringed"
    },
    "lack": {
        "past": "lacked",
        "gerund": "lacking",
        "present_3s": "lacks",
        "present_non_3s": "lack",
        "participle": "lacked"
    },
    "afflict": {
        "past": "afflicted",
        "gerund": "afflicting",
        "present_3s": "afflicts",
        "present_non_3s": "afflict",
        "participle": "afflicted"
    },
    "seduce": {
        "past": "seduced",
        "gerund": "seducing",
        "present_3s": "seduces",
        "present_non_3s": "seduce",
        "participle": "seduced"
    },
    "even": {
        "past": "evened",
        "gerund": "evening",
        "present_3s": "evens",
        "present_non_3s": "even",
        "participle": "evened"
    },
    "recite": {
        "past": "recited",
        "gerund": "reciting",
        "present_3s": "recites",
        "present_non_3s": "recite",
        "participle": "recited"
    },
    "remind": {
        "past": "reminded",
        "gerund": "reminding",
        "present_3s": "reminds",
        "present_non_3s": "remind",
        "participle": "reminded"
    },
    "reprove": {
        "past": "reproved",
        "gerund": "reproving",
        "present_3s": "reproves",
        "present_non_3s": "reprove",
        "participle": "reproved"
    },
    "mend": {
        "past": "mended",
        "gerund": "mending",
        "present_3s": "mends",
        "present_non_3s": "mend",
        "participle": "mended"
    },
    "codify": {
        "past": "codified",
        "gerund": "codifying",
        "present_3s": "codifies",
        "present_non_3s": "codify",
        "participle": "codified"
    },
    "travel": {
        "past": "traveled",
        "gerund": "traveling",
        "present_3s": "travels",
        "present_non_3s": "travel",
        "participle": "traveled"
    },
    "brief": {
        "past": "briefed",
        "gerund": "briefing",
        "present_3s": "briefs",
        "present_non_3s": "brief",
        "participle": "briefed"
    },
    "restore": {
        "past": "restored",
        "gerund": "restoring",
        "present_3s": "restores",
        "present_non_3s": "restore",
        "participle": "restored"
    },
    "encounter": {
        "past": "encountered",
        "gerund": "encountering",
        "present_3s": "encounters",
        "present_non_3s": "encounter",
        "participle": "encountered"
    },
    "arrive": {
        "past": "arrived",
        "gerund": "arriving",
        "present_3s": "arrives",
        "present_non_3s": "arrive",
        "participle": "arrived"
    },
    "encircle": {
        "past": "encircled",
        "gerund": "encircling",
        "present_3s": "encircles",
        "present_non_3s": "encircle",
        "participle": "encircled"
    },
    "discard": {
        "past": "discarded",
        "gerund": "discarding",
        "present_3s": "discards",
        "present_non_3s": "discard",
        "participle": "discarded"
    },
    "click": {
        "past": "clicked",
        "gerund": "clicking",
        "present_3s": "clicks",
        "present_non_3s": "click",
        "participle": "clicked"
    },
    "bark": {
        "past": "barked",
        "gerund": "barking",
        "present_3s": "barks",
        "present_non_3s": "bark",
        "participle": "barked"
    },
    "disapprove": {
        "past": "disapproved",
        "gerund": "disapproving",
        "present_3s": "disapproves",
        "present_non_3s": "disapprove",
        "participle": "disapproved"
    },
    "imply": {
        "past": "implied",
        "gerund": "implying",
        "present_3s": "implies",
        "present_non_3s": "imply",
        "participle": "implyed"
    },
    "stereotype": {
        "past": "stereotyped",
        "gerund": "stereotyping",
        "present_3s": "stereotypes",
        "present_non_3s": "stereotype",
        "participle": "stereotyped"
    },
    "discipline": {
        "past": "disciplined",
        "gerund": "disciplining",
        "present_3s": "disciplines",
        "present_non_3s": "discipline",
        "participle": "disciplined"
    },
    "expel": {
        "past": "expelled",
        "gerund": "expelling",
        "present_3s": "expels",
        "present_non_3s": "expel",
        "participle": "expelled"
    },
    "fine": {
        "past": "fined",
        "gerund": "fining",
        "present_3s": "fines",
        "present_non_3s": "fine",
        "participle": "fined"
    },
    "consent": {
        "past": "consented",
        "gerund": "consenting",
        "present_3s": "consents",
        "present_non_3s": "consent",
        "participle": "consented"
    },
    "transact": {
        "past": "transacted",
        "gerund": "transacting",
        "present_3s": "transacts",
        "present_non_3s": "transact",
        "participle": "transacted"
    },
    "disgorge": {
        "past": "disgorged",
        "gerund": "disgorging",
        "present_3s": "disgorges",
        "present_non_3s": "disgorge",
        "participle": "disgorged"
    },
    "amount": {
        "past": "amounted",
        "gerund": "amounting",
        "present_3s": "amounts",
        "present_non_3s": "amount",
        "participle": "amounted"
    },
    "screw": {
        "past": "screwed",
        "gerund": "screwing",
        "present_3s": "screws",
        "present_non_3s": "screw",
        "participle": "screwed"
    },
    "emigrate": {
        "past": "emigrated",
        "gerund": "emigrating",
        "present_3s": "emigrates",
        "present_non_3s": "emigrate",
        "participle": "emigrated"
    },
    "shrug": {
        "past": "shrugged",
        "gerund": "shrugging",
        "present_3s": "shrugs",
        "present_non_3s": "shrug",
        "participle": "shrugged"
    },
    "march": {
        "past": "marched",
        "gerund": "marching",
        "present_3s": "marches",
        "present_non_3s": "march",
        "participle": "marched"
    },
    "overlap": {
        "past": "overlapped",
        "gerund": "overlapping",
        "present_3s": "overlaps",
        "present_non_3s": "overlap",
        "participle": "overlapped"
    },
    "exploit": {
        "past": "exploited",
        "gerund": "exploiting",
        "present_3s": "exploits",
        "present_non_3s": "exploit",
        "participle": "exploited"
    },
    "imagine": {
        "past": "imagined",
        "gerund": "imagining",
        "present_3s": "imagines",
        "present_non_3s": "imagine",
        "participle": "imagined"
    },
    "scrutinize": {
        "past": "scrutinized",
        "gerund": "scrutinizing",
        "present_3s": "scrutinizes",
        "present_non_3s": "scrutinize",
        "participle": "scrutinized"
    },
    "cope": {
        "past": "coped",
        "gerund": "coping",
        "present_3s": "copes",
        "present_non_3s": "cope",
        "participle": "coped"
    },
    "forget": {
        "past": "forgeted",
        "gerund": "forgeting",
        "present_3s": "forgets",
        "present_non_3s": "forget",
        "participle": "forgotten"
    },
    "startle": {
        "past": "startled",
        "gerund": "startling",
        "present_3s": "startles",
        "present_non_3s": "startle",
        "participle": "startled"
    },
    "tighten": {
        "past": "tightened",
        "gerund": "tightening",
        "present_3s": "tightens",
        "present_non_3s": "tighten",
        "participle": "tightened"
    },
    "reap": {
        "past": "reaped",
        "gerund": "reaping",
        "present_3s": "reaps",
        "present_non_3s": "reap",
        "participle": "reaped"
    },
    "ascribe": {
        "past": "ascribed",
        "gerund": "ascribing",
        "present_3s": "ascribes",
        "present_non_3s": "ascribe",
        "participle": "ascribed"
    },
    "unwind": {
        "past": "unwinded",
        "gerund": "unwinding",
        "present_3s": "unwinds",
        "present_non_3s": "unwind",
        "participle": "unwinded"
    },
    "peg": {
        "past": "pegged",
        "gerund": "peging",
        "present_3s": "pegs",
        "present_non_3s": "peg",
        "participle": "pegged"
    },
    "bend": {
        "past": "bended",
        "gerund": "bending",
        "present_3s": "bends",
        "present_non_3s": "bend",
        "participle": "bended"
    },
    "compromise": {
        "past": "compromised",
        "gerund": "compromising",
        "present_3s": "compromises",
        "present_non_3s": "compromise",
        "participle": "compromised"
    },
    "tout": {
        "past": "touted",
        "gerund": "touting",
        "present_3s": "touts",
        "present_non_3s": "tout",
        "participle": "touted"
    },
    "accede": {
        "past": "acceded",
        "gerund": "acceding",
        "present_3s": "accedes",
        "present_non_3s": "accede",
        "participle": "acceded"
    },
    "entice": {
        "past": "enticed",
        "gerund": "enticing",
        "present_3s": "entices",
        "present_non_3s": "entice",
        "participle": "enticed"
    },
    "overpay": {
        "past": "overpaid",
        "gerund": "overpaying",
        "present_3s": "overpays",
        "present_non_3s": "overpay",
        "participle": "overpaid"
    },
    "fold": {
        "past": "folded",
        "gerund": "folding",
        "present_3s": "folds",
        "present_non_3s": "fold",
        "participle": "folded"
    },
    "research": {
        "past": "researched",
        "gerund": "researching",
        "present_3s": "researches",
        "present_non_3s": "research",
        "participle": "researched"
    },
    "arrest": {
        "past": "arrested",
        "gerund": "arresting",
        "present_3s": "arrests",
        "present_non_3s": "arrest",
        "participle": "arrested"
    },
    "occupy": {
        "past": "occupyed",
        "gerund": "occupying",
        "present_3s": "occupies",
        "present_non_3s": "occupy",
        "participle": "occupyed"
    },
    "impress": {
        "past": "impressed",
        "gerund": "impressing",
        "present_3s": "impresses",
        "present_non_3s": "impress",
        "participle": "impressed"
    },
    "befuddle": {
        "past": "befuddled",
        "gerund": "befuddling",
        "present_3s": "befuddles",
        "present_non_3s": "befuddle",
        "participle": "befuddled"
    },
    "demonstrate": {
        "past": "demonstrated",
        "gerund": "demonstrating",
        "present_3s": "demonstrates",
        "present_non_3s": "demonstrate",
        "participle": "demonstrated"
    },
    "possess": {
        "past": "possessed",
        "gerund": "possessing",
        "present_3s": "possesses",
        "present_non_3s": "possess",
        "participle": "possessed"
    },
    "grade": {
        "past": "graded",
        "gerund": "grading",
        "present_3s": "grades",
        "present_non_3s": "grade",
        "participle": "grade"
    },
    "graduate": {
        "past": "graduated",
        "gerund": "graduating",
        "present_3s": "graduates",
        "present_non_3s": "graduate",
        "participle": "graduated"
    },
    "engineer": {
        "past": "engineered",
        "gerund": "engineering",
        "present_3s": "engineers",
        "present_non_3s": "engineer",
        "participle": "engineered"
    },
    "inherit": {
        "past": "inherited",
        "gerund": "inheriting",
        "present_3s": "inherits",
        "present_non_3s": "inherit",
        "participle": "inherited"
    },
    "refocus": {
        "past": "refocused",
        "gerund": "refocusing",
        "present_3s": "refocuses",
        "present_non_3s": "refocus",
        "participle": "refocused"
    },
    "buffet": {
        "past": "buffeted",
        "gerund": "buffeting",
        "present_3s": "buffets",
        "present_non_3s": "buffet",
        "participle": "buffeted"
    },
    "attribute": {
        "past": "attributed",
        "gerund": "attributing",
        "present_3s": "attributes",
        "present_non_3s": "attribute",
        "participle": "attributed"
    },
    "confine": {
        "past": "confined",
        "gerund": "confining",
        "present_3s": "confines",
        "present_non_3s": "confine",
        "participle": "confined"
    },
    "shape": {
        "past": "shaped",
        "gerund": "shaping",
        "present_3s": "shapes",
        "present_non_3s": "shape",
        "participle": "shaped"
    },
    "reallocate": {
        "past": "reallocated",
        "gerund": "reallocating",
        "present_3s": "reallocates",
        "present_non_3s": "reallocate",
        "participle": "reallocated"
    },
    "strip": {
        "past": "striped",
        "gerund": "striping",
        "present_3s": "strips",
        "present_non_3s": "strip",
        "participle": "stripped"
    },
    "broaden": {
        "past": "broadened",
        "gerund": "broadening",
        "present_3s": "broadens",
        "present_non_3s": "broaden",
        "participle": "broadened"
    },
    "upset": {
        "past": "upseted",
        "gerund": "upsetting",
        "present_3s": "upsets",
        "present_non_3s": "upset",
        "participle": "upset"
    },
    "instruct": {
        "past": "instructed",
        "gerund": "instructing",
        "present_3s": "instructs",
        "present_non_3s": "instruct",
        "participle": "instructed"
    },
    "abandon": {
        "past": "abandoned",
        "gerund": "abandoning",
        "present_3s": "abandons",
        "present_non_3s": "abandon",
        "participle": "abandoned"
    },
    "draft": {
        "past": "drafted",
        "gerund": "drafting",
        "present_3s": "drafts",
        "present_non_3s": "draft",
        "participle": "drafted"
    },
    "insert": {
        "past": "inserted",
        "gerund": "inserting",
        "present_3s": "inserts",
        "present_non_3s": "insert",
        "participle": "inserted"
    },
    "bounce": {
        "past": "bounced",
        "gerund": "bouncing",
        "present_3s": "bounces",
        "present_non_3s": "bounce",
        "participle": "bounced"
    },
    "repair": {
        "past": "repaired",
        "gerund": "repairing",
        "present_3s": "repairs",
        "present_non_3s": "repair",
        "participle": "repaired"
    },
    "crash": {
        "past": "crashed",
        "gerund": "crashing",
        "present_3s": "crashes",
        "present_non_3s": "crash",
        "participle": "crashed"
    },
    "resemble": {
        "past": "resembled",
        "gerund": "resembling",
        "present_3s": "resembles",
        "present_non_3s": "resemble",
        "participle": "resembled"
    },
    "hang": {
        "past": "hanged",
        "gerund": "hanging",
        "present_3s": "hangs",
        "present_non_3s": "hang",
        "participle": "hanged"
    },
    "tote": {
        "past": "toted",
        "gerund": "toting",
        "present_3s": "totes",
        "present_non_3s": "tote",
        "participle": "toted"
    },
    "spill": {
        "past": "spilled",
        "gerund": "spilling",
        "present_3s": "spills",
        "present_non_3s": "spill",
        "participle": "spilled"
    },
    "promise": {
        "past": "promised",
        "gerund": "promising",
        "present_3s": "promises",
        "present_non_3s": "promise",
        "participle": "promised"
    },
    "architect": {
        "past": "architected",
        "gerund": "architecting",
        "present_3s": "architects",
        "present_non_3s": "architect",
        "participle": "architected"
    },
    "overcrowd": {
        "past": "overcrowded",
        "gerund": "overcrowding",
        "present_3s": "overcrowds",
        "present_non_3s": "overcrowd",
        "participle": "overcrowded"
    },
    "preserve": {
        "past": "preserved",
        "gerund": "preserving",
        "present_3s": "preserves",
        "present_non_3s": "preserve",
        "participle": "preserved"
    },
    "counteract": {
        "past": "counteracted",
        "gerund": "counteracting",
        "present_3s": "counteracts",
        "present_non_3s": "counteract",
        "participle": "counteracted"
    },
    "cooperate": {
        "past": "cooperated",
        "gerund": "cooperating",
        "present_3s": "cooperates",
        "present_non_3s": "cooperate",
        "participle": "cooperated"
    },
    "safeguard": {
        "past": "safeguarded",
        "gerund": "safeguarding",
        "present_3s": "safeguards",
        "present_non_3s": "safeguard",
        "participle": "safeguarded"
    },
    "contest": {
        "past": "contested",
        "gerund": "contesting",
        "present_3s": "contests",
        "present_non_3s": "contest",
        "participle": "contested"
    },
    "edit": {
        "past": "edited",
        "gerund": "editing",
        "present_3s": "edits",
        "present_non_3s": "edit",
        "participle": "edited"
    },
    "emphasize": {
        "past": "emphasized",
        "gerund": "emphasizing",
        "present_3s": "emphasizes",
        "present_non_3s": "emphasize",
        "participle": "emphasized"
    },
    "examine": {
        "past": "examined",
        "gerund": "examining",
        "present_3s": "examines",
        "present_non_3s": "examine",
        "participle": "examined"
    },
    "compose": {
        "past": "composed",
        "gerund": "composing",
        "present_3s": "composes",
        "present_non_3s": "compose",
        "participle": "composed"
    },
    "defy": {
        "past": "defied",
        "gerund": "defying",
        "present_3s": "defies",
        "present_non_3s": "defy",
        "participle": "defied"
    },
    "connect": {
        "past": "connected",
        "gerund": "connecting",
        "present_3s": "connects",
        "present_non_3s": "connect",
        "participle": "connected"
    },
    "rob": {
        "past": "robed",
        "gerund": "robing",
        "present_3s": "robs",
        "present_non_3s": "rob",
        "participle": "robbed"
    },
    "fend": {
        "past": "fended",
        "gerund": "fending",
        "present_3s": "fends",
        "present_non_3s": "fend",
        "participle": "fended"
    },
    "bother": {
        "past": "bothered",
        "gerund": "bothering",
        "present_3s": "bothers",
        "present_non_3s": "bother",
        "participle": "bothered"
    },
    "participate": {
        "past": "participated",
        "gerund": "participating",
        "present_3s": "participates",
        "present_non_3s": "participate",
        "participle": "participated"
    },
    "deprive": {
        "past": "deprived",
        "gerund": "depriving",
        "present_3s": "deprives",
        "present_non_3s": "deprive",
        "participle": "deprived"
    },
    "fix": {
        "past": "fixed",
        "gerund": "fixing",
        "present_3s": "fixes",
        "present_non_3s": "fix",
        "participle": "fixed"
    },
    "leverage": {
        "past": "leveraged",
        "gerund": "leveraging",
        "present_3s": "leverages",
        "present_non_3s": "leverage",
        "participle": "leveraged"
    },
    "weaken": {
        "past": "weakened",
        "gerund": "weakening",
        "present_3s": "weakens",
        "present_non_3s": "weaken",
        "participle": "weakened"
    },
    "veto": {
        "past": "vetoed",
        "gerund": "vetoing",
        "present_3s": "vetos",
        "present_non_3s": "veto",
        "participle": "vetoed"
    },
    "override": {
        "past": "overrode",
        "gerund": "overriding",
        "present_3s": "overrides",
        "present_non_3s": "override",
        "participle": "overrode"
    },
    "impede": {
        "past": "impeded",
        "gerund": "impeding",
        "present_3s": "impedes",
        "present_non_3s": "impede",
        "participle": "impeded"
    },
    "broadcast": {
        "past": "broadcasted",
        "gerund": "broadcasting",
        "present_3s": "broadcasts",
        "present_non_3s": "broadcast",
        "participle": "broadcasted"
    },
    "propagandize": {
        "past": "propagandized",
        "gerund": "propagandizing",
        "present_3s": "propagandizes",
        "present_non_3s": "propagandize",
        "participle": "propagandized"
    },
    "inform": {
        "past": "informed",
        "gerund": "informing",
        "present_3s": "informs",
        "present_non_3s": "inform",
        "participle": "informed"
    },
    "clip": {
        "past": "clipped",
        "gerund": "clipping",
        "present_3s": "clips",
        "present_non_3s": "clip",
        "participle": "clipped"
    },
    "tune": {
        "past": "tuned",
        "gerund": "tuning",
        "present_3s": "tunes",
        "present_non_3s": "tune",
        "participle": "tuned"
    },
    "transcribe": {
        "past": "transcribed",
        "gerund": "transcribing",
        "present_3s": "transcribes",
        "present_non_3s": "transcribe",
        "participle": "transcribed"
    },
    "reprint": {
        "past": "reprinted",
        "gerund": "reprinting",
        "present_3s": "reprints",
        "present_non_3s": "reprint",
        "participle": "reprinted"
    },
    "disseminate": {
        "past": "disseminated",
        "gerund": "disseminating",
        "present_3s": "disseminates",
        "present_non_3s": "disseminate",
        "participle": "disseminated"
    },
    "preclude": {
        "past": "precluded",
        "gerund": "precluding",
        "present_3s": "precludes",
        "present_non_3s": "preclude",
        "participle": "precluded"
    },
    "state": {
        "past": "stated",
        "gerund": "stating",
        "present_3s": "states",
        "present_non_3s": "state",
        "participle": "stated"
    },
    "free": {
        "past": "freed",
        "gerund": "freeing",
        "present_3s": "frees",
        "present_non_3s": "free",
        "participle": "freed"
    },
    "prescribe": {
        "past": "prescribed",
        "gerund": "prescribing",
        "present_3s": "prescribes",
        "present_non_3s": "prescribe",
        "participle": "prescribed"
    },
    "mind": {
        "past": "minded",
        "gerund": "minding",
        "present_3s": "minds",
        "present_non_3s": "mind",
        "participle": "minded"
    },
    "stuff": {
        "past": "stuffed",
        "gerund": "stuffing",
        "present_3s": "stuffs",
        "present_non_3s": "stuff",
        "participle": "stuffed"
    },
    "photocopy": {
        "past": "photocopied",
        "gerund": "photocopying",
        "present_3s": "photocopies",
        "present_non_3s": "photocopy",
        "participle": "photocopied"
    },
    "wield": {
        "past": "wielded",
        "gerund": "wielding",
        "present_3s": "wields",
        "present_non_3s": "wield",
        "participle": "wielded"
    },
    "reshape": {
        "past": "reshaped",
        "gerund": "reshaping",
        "present_3s": "reshapes",
        "present_non_3s": "reshape",
        "participle": "reshaped"
    },
    "search": {
        "past": "searched",
        "gerund": "searching",
        "present_3s": "searches",
        "present_non_3s": "search",
        "participle": "searched"
    },
    "react": {
        "past": "reacted",
        "gerund": "reacting",
        "present_3s": "reacts",
        "present_non_3s": "react",
        "participle": "reacted"
    },
    "orient": {
        "past": "oriented",
        "gerund": "orienting",
        "present_3s": "orients",
        "present_non_3s": "orient",
        "participle": "oriented"
    },
    "wind": {
        "past": "wound",
        "gerund": "winding",
        "present_3s": "winds",
        "present_non_3s": "wind",
        "participle": "winded"
    },
    "advocate": {
        "past": "advocated",
        "gerund": "advocating",
        "present_3s": "advocates",
        "present_non_3s": "advocate",
        "participle": "advocated"
    },
    "applaud": {
        "past": "applauded",
        "gerund": "applauding",
        "present_3s": "applauds",
        "present_non_3s": "applaud",
        "participle": "applauded"
    },
    "exude": {
        "past": "exuded",
        "gerund": "exuding",
        "present_3s": "exudes",
        "present_non_3s": "exude",
        "participle": "exuded"
    },
    "clash": {
        "past": "clashed",
        "gerund": "clashing",
        "present_3s": "clashes",
        "present_non_3s": "clash",
        "participle": "clashed"
    },
    "evolve": {
        "past": "evolved",
        "gerund": "evolving",
        "present_3s": "evolves",
        "present_non_3s": "evolve",
        "participle": "evolved"
    },
    "integrate": {
        "past": "integrated",
        "gerund": "integrating",
        "present_3s": "integrates",
        "present_non_3s": "integrate",
        "participle": "integrated"
    },
    "rumor": {
        "past": "rumored",
        "gerund": "rumoring",
        "present_3s": "rumors",
        "present_non_3s": "rumor",
        "participle": "rumored"
    },
    "respect": {
        "past": "respected",
        "gerund": "respecting",
        "present_3s": "respects",
        "present_non_3s": "respect",
        "participle": "respected"
    },
    "intimidate": {
        "past": "intimidated",
        "gerund": "intimidating",
        "present_3s": "intimidates",
        "present_non_3s": "intimidate",
        "participle": "intimidated"
    },
    "guard": {
        "past": "guarded",
        "gerund": "guarding",
        "present_3s": "guards",
        "present_non_3s": "guard",
        "participle": "guarded"
    },
    "specify": {
        "past": "specified",
        "gerund": "specifying",
        "present_3s": "specifies",
        "present_non_3s": "specify",
        "participle": "specified"
    },
    "predicate": {
        "past": "predicated",
        "gerund": "predicating",
        "present_3s": "predicates",
        "present_non_3s": "predicate",
        "participle": "predicated"
    },
    "withhold": {
        "past": "withheld",
        "gerund": "withholding",
        "present_3s": "withholds",
        "present_non_3s": "withhold",
        "participle": "withheld"
    },
    "construe": {
        "past": "construed",
        "gerund": "construing",
        "present_3s": "construes",
        "present_non_3s": "construe",
        "participle": "construed"
    },
    "emasculate": {
        "past": "emasculated",
        "gerund": "emasculating",
        "present_3s": "emasculates",
        "present_non_3s": "emasculate",
        "participle": "emasculated"
    },
    "swallow": {
        "past": "swallowed",
        "gerund": "swallowing",
        "present_3s": "swallows",
        "present_non_3s": "swallow",
        "participle": "swallowed"
    },
    "ensure": {
        "past": "ensured",
        "gerund": "ensuring",
        "present_3s": "ensures",
        "present_non_3s": "ensure",
        "participle": "ensured"
    },
    "contradict": {
        "past": "contradicted",
        "gerund": "contradicting",
        "present_3s": "contradicts",
        "present_non_3s": "contradict",
        "participle": "contradicted"
    },
    "deliberate": {
        "past": "deliberated",
        "gerund": "deliberating",
        "present_3s": "deliberates",
        "present_non_3s": "deliberate",
        "participle": "deliberated"
    },
    "rewrite": {
        "past": "rewrote",
        "gerund": "rewriting",
        "present_3s": "rewrites",
        "present_non_3s": "rewrite",
        "participle": "rewrote"
    },
    "repeal": {
        "past": "repealed",
        "gerund": "repealing",
        "present_3s": "repeals",
        "present_non_3s": "repeal",
        "participle": "repealed"
    },
    "muzzle": {
        "past": "muzzled",
        "gerund": "muzzling",
        "present_3s": "muzzles",
        "present_non_3s": "muzzle",
        "participle": "muzzled"
    },
    "select": {
        "past": "selected",
        "gerund": "selecting",
        "present_3s": "selects",
        "present_non_3s": "select",
        "participle": "selected"
    },
    "inquire": {
        "past": "inquired",
        "gerund": "inquiring",
        "present_3s": "inquires",
        "present_non_3s": "inquire",
        "participle": "inquired"
    },
    "waste": {
        "past": "wasted",
        "gerund": "wasting",
        "present_3s": "wastes",
        "present_non_3s": "waste",
        "participle": "wasted"
    },
    "illustrate": {
        "past": "illustrated",
        "gerund": "illustrating",
        "present_3s": "illustrates",
        "present_non_3s": "illustrate",
        "participle": "illustrated"
    },
    "usurp": {
        "past": "usurped",
        "gerund": "usurping",
        "present_3s": "usurps",
        "present_non_3s": "usurp",
        "participle": "usurped"
    },
    "implement": {
        "past": "implemented",
        "gerund": "implementing",
        "present_3s": "implements",
        "present_non_3s": "implement",
        "participle": "implemented"
    },
    "discharge": {
        "past": "discharged",
        "gerund": "discharging",
        "present_3s": "discharges",
        "present_non_3s": "discharge",
        "participle": "discharged"
    },
    "invite": {
        "past": "invited",
        "gerund": "inviting",
        "present_3s": "invites",
        "present_non_3s": "invite",
        "participle": "invited"
    },
    "suit": {
        "past": "suited",
        "gerund": "suiting",
        "present_3s": "suits",
        "present_non_3s": "suit",
        "participle": "suited"
    },
    "undo": {
        "past": "undid",
        "gerund": "undoing",
        "present_3s": "undoes",
        "present_non_3s": "undo",
        "participle": "undid"
    },
    "ratify": {
        "past": "ratifyed",
        "gerund": "ratifying",
        "present_3s": "ratifies",
        "present_non_3s": "ratify",
        "participle": "ratified"
    },
    "excise": {
        "past": "excised",
        "gerund": "excising",
        "present_3s": "excises",
        "present_non_3s": "excise",
        "participle": "excised"
    },
    "conflict": {
        "past": "conflicted",
        "gerund": "conflicting",
        "present_3s": "conflicts",
        "present_non_3s": "conflict",
        "participle": "conflicted"
    },
    "exert": {
        "past": "exerted",
        "gerund": "exerting",
        "present_3s": "exerts",
        "present_non_3s": "exert",
        "participle": "exerted"
    },
    "entrust": {
        "past": "entrusted",
        "gerund": "entrusting",
        "present_3s": "entrusts",
        "present_non_3s": "entrust",
        "participle": "entrusted"
    },
    "reclaim": {
        "past": "reclaimed",
        "gerund": "reclaiming",
        "present_3s": "reclaims",
        "present_non_3s": "reclaim",
        "participle": "reclaimed"
    },
    "mortgage": {
        "past": "mortgaged",
        "gerund": "mortgaging",
        "present_3s": "mortgages",
        "present_non_3s": "mortgage",
        "participle": "mortgaged"
    },
    "profit": {
        "past": "profited",
        "gerund": "profiting",
        "present_3s": "profits",
        "present_non_3s": "profit",
        "participle": "profited"
    },
    "peak": {
        "past": "peaked",
        "gerund": "peaking",
        "present_3s": "peaks",
        "present_non_3s": "peak",
        "participle": "peaked"
    },
    "curtail": {
        "past": "curtailed",
        "gerund": "curtailing",
        "present_3s": "curtails",
        "present_non_3s": "curtail",
        "participle": "curtailed"
    },
    "strengthen": {
        "past": "strengthened",
        "gerund": "strengthening",
        "present_3s": "strengthens",
        "present_non_3s": "strengthen",
        "participle": "strengthened"
    },
    "log": {
        "past": "logged",
        "gerund": "logging",
        "present_3s": "logs",
        "present_non_3s": "log",
        "participle": "logged"
    },
    "cushion": {
        "past": "cushioned",
        "gerund": "cushioning",
        "present_3s": "cushions",
        "present_non_3s": "cushion",
        "participle": "cushioned"
    },
    "balkanize": {
        "past": "balkanized",
        "gerund": "balkanizing",
        "present_3s": "balkanizes",
        "present_non_3s": "balkanize",
        "participle": "balkanized"
    },
    "flirt": {
        "past": "flirted",
        "gerund": "flirting",
        "present_3s": "flirts",
        "present_non_3s": "flirt",
        "participle": "flirted"
    },
    "recover": {
        "past": "recovered",
        "gerund": "recovering",
        "present_3s": "recovers",
        "present_non_3s": "recover",
        "participle": "recovered"
    },
    "brighten": {
        "past": "brightened",
        "gerund": "brightening",
        "present_3s": "brightens",
        "present_non_3s": "brighten",
        "participle": "brightened"
    },
    "limp": {
        "past": "limped",
        "gerund": "limping",
        "present_3s": "limps",
        "present_non_3s": "limp",
        "participle": "limped"
    },
    "beleaguer": {
        "past": "beleaguered",
        "gerund": "beleaguering",
        "present_3s": "beleaguers",
        "present_non_3s": "beleaguer",
        "participle": "beleaguered"
    },
    "project": {
        "past": "projected",
        "gerund": "projecting",
        "present_3s": "projects",
        "present_non_3s": "project",
        "participle": "projected"
    },
    "maximize": {
        "past": "maximized",
        "gerund": "maximizing",
        "present_3s": "maximizes",
        "present_non_3s": "maximize",
        "participle": "maximized"
    },
    "screen": {
        "past": "screened",
        "gerund": "screening",
        "present_3s": "screens",
        "present_non_3s": "screen",
        "participle": "screened"
    },
    "miss": {
        "past": "missed",
        "gerund": "missing",
        "present_3s": "misses",
        "present_non_3s": "miss",
        "participle": "missed"
    },
    "preapprove": {
        "past": "preapproved",
        "gerund": "preapproving",
        "present_3s": "preapproves",
        "present_non_3s": "preapprove",
        "participle": "preapproved"
    },
    "fly": {
        "past": "flied",
        "gerund": "flying",
        "present_3s": "flies",
        "present_non_3s": "fly",
        "participle": "flied"
    },
    "retrace": {
        "past": "retraced",
        "gerund": "retracing",
        "present_3s": "retraces",
        "present_non_3s": "retrace",
        "participle": "retraced"
    },
    "sour": {
        "past": "soured",
        "gerund": "souring",
        "present_3s": "sours",
        "present_non_3s": "sour",
        "participle": "soured"
    },
    "bet": {
        "past": "bet",
        "gerund": "betting",
        "present_3s": "bets",
        "present_non_3s": "bet",
        "participle": "bet"
    },
    "obligate": {
        "past": "obligated",
        "gerund": "obligating",
        "present_3s": "obligates",
        "present_non_3s": "obligate",
        "participle": "obligated"
    },
    "vest": {
        "past": "vested",
        "gerund": "vesting",
        "present_3s": "vests",
        "present_non_3s": "vest",
        "participle": "vested"
    },
    "counsel": {
        "past": "counseled",
        "gerund": "counselling",
        "present_3s": "councils",
        "present_non_3s": "councils",
        "participle": "counseled"
    },
    "quash": {
        "past": "quashed",
        "gerund": "quashing",
        "present_3s": "quashes",
        "present_non_3s": "quash",
        "participle": "quashed"
    },
    "reel": {
        "past": "reeled",
        "gerund": "reeling",
        "present_3s": "reels",
        "present_non_3s": "reel",
        "participle": "reeled"
    },
    "label": {
        "past": "labeled",
        "gerund": "labeling",
        "present_3s": "labels",
        "present_non_3s": "label",
        "participle": "labeled"
    },
    "exacerbate": {
        "past": "exacerbated",
        "gerund": "exacerbating",
        "present_3s": "exacerbates",
        "present_non_3s": "exacerbate",
        "participle": "exacerbated"
    },
    "mobilize": {
        "past": "mobilized",
        "gerund": "mobilizing",
        "present_3s": "mobilizes",
        "present_non_3s": "mobilize",
        "participle": "mobilized"
    },
    "bludgeon": {
        "past": "bludgeoned",
        "gerund": "bludgeoning",
        "present_3s": "bludgeons",
        "present_non_3s": "bludgeon",
        "participle": "bludgeoned"
    },
    "rally": {
        "past": "rallied",
        "gerund": "rallying",
        "present_3s": "rallies",
        "present_non_3s": "rally",
        "participle": "rallied"
    },

    "sneak": {
        "past": "sneaked",
        "gerund": "sneaking",
        "present_3s": "sneaks",
        "present_non_3s": "sneak",
        "participle": "sneaked"
    },
    "curb": {
        "past": "curbed",
        "gerund": "curbing",
        "present_3s": "curbs",
        "present_non_3s": "curb",
        "participle": "curbed"
    },
    "facilitate": {
        "past": "facilitated",
        "gerund": "facilitating",
        "present_3s": "facilitates",
        "present_non_3s": "facilitate",
        "participle": "facilitated"
    },
    "stack": {
        "past": "stacked",
        "gerund": "stacking",
        "present_3s": "stacks",
        "present_non_3s": "stack",
        "participle": "stacked"
    },
    "beg": {
        "past": "begged",
        "gerund": "begging",
        "present_3s": "begs",
        "present_non_3s": "beg",
        "participle": "begged"
    },
    "despise": {
        "past": "despised",
        "gerund": "despising",
        "present_3s": "despises",
        "present_non_3s": "despise",
        "participle": "despised"
    },
    "frighten": {
        "past": "frightened",
        "gerund": "frightening",
        "present_3s": "frightens",
        "present_non_3s": "frighten",
        "participle": "frightened"
    },
    "unload": {
        "past": "unloaded",
        "gerund": "unloading",
        "present_3s": "unloads",
        "present_non_3s": "unload",
        "participle": "unloaded"
    },
    "juggle": {
        "past": "juggled",
        "gerund": "juggling",
        "present_3s": "juggles",
        "present_non_3s": "juggle",
        "participle": "juggled"
    },
    "strive": {
        "past": "strived",
        "gerund": "striving",
        "present_3s": "strives",
        "present_non_3s": "strive",
        "participle": "strived"
    },
    "dislike": {
        "past": "disliked",
        "gerund": "disliking",
        "present_3s": "dislikes",
        "present_non_3s": "dislike",
        "participle": "disliked"
    },
    "lure": {
        "past": "lured",
        "gerund": "luring",
        "present_3s": "lures",
        "present_non_3s": "lure",
        "participle": "lured"
    },
    "spook": {
        "past": "spooked",
        "gerund": "spooking",
        "present_3s": "spooks",
        "present_non_3s": "spook",
        "participle": "spooked"
    },
    "dismay": {
        "past": "dismayed",
        "gerund": "dismaying",
        "present_3s": "dismays",
        "present_non_3s": "dismay",
        "participle": "dismayed"
    },
    "resent": {
        "past": "resented",
        "gerund": "resenting",
        "present_3s": "resents",
        "present_non_3s": "resent",
        "participle": "resented"
    },
    "orchestrate": {
        "past": "orchestrated",
        "gerund": "orchestrating",
        "present_3s": "orchestrates",
        "present_non_3s": "orchestrate",
        "participle": "orchestrated"
    },
    "hunker": {
        "past": "hunkered",
        "gerund": "hunkering",
        "present_3s": "hunkers",
        "present_non_3s": "hunker",
        "participle": "hunkered"
    },
    "gore": {
        "past": "gored",
        "gerund": "goring",
        "present_3s": "gores",
        "present_non_3s": "gore",
        "participle": "gored"
    },
    "mint": {
        "past": "minted",
        "gerund": "minting",
        "present_3s": "mints",
        "present_non_3s": "mint",
        "participle": "minted"
    },
    "panic": {
        "past": "panicked",
        "gerund": "panicking",
        "present_3s": "panics",
        "present_non_3s": "panic",
        "participle": "panicked"
    },
    "chase": {
        "past": "chased",
        "gerund": "chasing",
        "present_3s": "chases",
        "present_non_3s": "chase",
        "participle": "chased"
    },
    "destroy": {
        "past": "destroyed",
        "gerund": "destroying",
        "present_3s": "destroys",
        "present_non_3s": "destroy",
        "participle": "destroyed"
    },
    "jihad": {
        "past": "jihad",
        "gerund": "jihading",
        "present_3s": "jihads",
        "present_non_3s": "jihad",
        "participle": "jihaded"
    },
    "surround": {
        "past": "surrounded",
        "gerund": "surrounding",
        "present_3s": "surrounds",
        "present_non_3s": "surround",
        "participle": "surrounded"
    },
    "evoke": {
        "past": "evoked",
        "gerund": "evoking",
        "present_3s": "evokes",
        "present_non_3s": "evoke",
        "participle": "evoked"
    },
    "decrease": {
        "past": "decreased",
        "gerund": "decreasing",
        "present_3s": "decreases",
        "present_non_3s": "decrease",
        "participle": "decreased"
    },
    "please": {
        "past": "pleased",
        "gerund": "pleasing",
        "present_3s": "pleases",
        "present_non_3s": "please",
        "participle": "pleased"
    },
    "tolerate": {
        "past": "tolerated",
        "gerund": "tolerating",
        "present_3s": "tolerates",
        "present_non_3s": "tolerate",
        "participle": "tolerated"
    },
    "annualize": {
        "past": "annualized",
        "gerund": "annualizing",
        "present_3s": "annualizes",
        "present_non_3s": "annualize",
        "participle": "annualized"
    },
    "interest": {
        "past": "interested",
        "gerund": "interesting",
        "present_3s": "interests",
        "present_non_3s": "interest",
        "participle": "interested"
    },
    "scream": {
        "past": "screamed",
        "gerund": "screaming",
        "present_3s": "screams",
        "present_non_3s": "scream",
        "participle": "screamed"
    },
    "hail": {
        "past": "hailed",
        "gerund": "hailing",
        "present_3s": "hails",
        "present_non_3s": "hail",
        "participle": "hailed"
    },
    "woo": {
        "past": "wooed",
        "gerund": "wooing",
        "present_3s": "woos",
        "present_non_3s": "woo",
        "participle": "wooed"
    },
    "abolish": {
        "past": "abolished",
        "gerund": "abolishing",
        "present_3s": "abolishes",
        "present_non_3s": "abolish",
        "participle": "abolished"
    },
    "champion": {
        "past": "championed",
        "gerund": "championing",
        "present_3s": "champions",
        "present_non_3s": "champion",
        "participle": "championed"
    },
    "devour": {
        "past": "devoured",
        "gerund": "devouring",
        "present_3s": "devours",
        "present_non_3s": "devour",
        "participle": "devoured"
    },
    "grapple": {
        "past": "grappled",
        "gerund": "grappling",
        "present_3s": "grapples",
        "present_non_3s": "grapple",
        "participle": "grappled"
    },
    "legislate": {
        "past": "legislated",
        "gerund": "legislating",
        "present_3s": "legislates",
        "present_non_3s": "legislate",
        "participle": "legislated"
    },
    "matter": {
        "past": "mattered",
        "gerund": "mattering",
        "present_3s": "matters",
        "present_non_3s": "matter",
        "participle": "mattered"
    },
    "affect": {
        "past": "affected",
        "gerund": "affecting",
        "present_3s": "affects",
        "present_non_3s": "affect",
        "participle": "affected"
    },
    "augment": {
        "past": "augmented",
        "gerund": "augmenting",
        "present_3s": "augments",
        "present_non_3s": "augment",
        "participle": "augmented"
    },
    "appropriate": {
        "past": "appropriated",
        "gerund": "appropriating",
        "present_3s": "appropriates",
        "present_non_3s": "appropriate",
        "participle": "appropriated"
    },
    "notify": {
        "past": "notified",
        "gerund": "notifying",
        "present_3s": "notifies",
        "present_non_3s": "notify",
        "participle": "notified"
    },
    "stifle": {
        "past": "stifled",
        "gerund": "stifling",
        "present_3s": "stifles",
        "present_non_3s": "stifle",
        "participle": "stifled"
    },
    "sanction": {
        "past": "sanctioned",
        "gerund": "sanctioning",
        "present_3s": "sanctions",
        "present_non_3s": "sanction",
        "participle": "sanctioned"
    },
    "inhibit": {
        "past": "inhibited",
        "gerund": "inhibiting",
        "present_3s": "inhibits",
        "present_non_3s": "inhibit",
        "participle": "inhibited"
    },
    "document": {
        "past": "documented",
        "gerund": "documenting",
        "present_3s": "documents",
        "present_non_3s": "document",
        "participle": "documented"
    },
    "fetch": {
        "past": "fetched",
        "gerund": "fetching",
        "present_3s": "fetches",
        "present_non_3s": "fetch",
        "participle": "fetched"
    },
    "dial": {
        "past": "dialed",
        "gerund": "dialing",
        "present_3s": "dialing",
        "present_non_3s": "dial",
        "participle": "dialed"
    },
    "eye": {
        "past": "eyed",
        "gerund": "eyeing",
        "present_3s": "eyes",
        "present_non_3s": "eye",
        "participle": "eyed"
    },
    "migrate": {
        "past": "migrated",
        "gerund": "migrating",
        "present_3s": "migrates",
        "present_non_3s": "migrate",
        "participle": "migrated"
    },
    "shrink": {
        "past": "shrunk",
        "gerund": "shrinking",
        "present_3s": "shrinks",
        "present_non_3s": "shrink",
        "participle": "shrank"
    },
    "cloth": {
        "past": "clothed",
        "gerund": "clothing",
        "present_3s": "clothes",
        "present_non_3s": "cloth",
        "participle": "clothed"
    },
    "doubt": {
        "past": "doubted",
        "gerund": "doubting",
        "present_3s": "doubts",
        "present_non_3s": "doubt",
        "participle": "doubted"
    },
    "echo": {
        "past": "echoed",
        "gerund": "echoing",
        "present_3s": "echos",
        "present_non_3s": "echo",
        "participle": "echoed"
    },
    "halt": {
        "past": "halted",
        "gerund": "halting",
        "present_3s": "halts",
        "present_non_3s": "halt",
        "participle": "halted"
    },
    "figure": {
        "past": "figured",
        "gerund": "figuring",
        "present_3s": "figures",
        "present_non_3s": "figure",
        "participle": "figured"
    },
    "overvalue": {
        "past": "overvalued",
        "gerund": "overvaluing",
        "present_3s": "overvalues",
        "present_non_3s": "overvalue",
        "participle": "overvalued"
    },
    "denounce": {
        "past": "denounced",
        "gerund": "denouncing",
        "present_3s": "denounces",
        "present_non_3s": "denounce",
        "participle": "denounced"
    },
    "factor": {
        "past": "factored",
        "gerund": "factoring",
        "present_3s": "factors",
        "present_non_3s": "factor",
        "participle": "factored"
    },
    "recoup": {
        "past": "recouped",
        "gerund": "recouping",
        "present_3s": "recoups",
        "present_non_3s": "recoup",
        "participle": "recouped"
    },
    "weather": {
        "past": "weathered",
        "gerund": "weathering",
        "present_3s": "weathers",
        "present_non_3s": "weather",
        "participle": "weathered"
    },
    "hunt": {
        "past": "hunted",
        "gerund": "hunting",
        "present_3s": "hunts",
        "present_non_3s": "hunt",
        "participle": "hunted"
    },
    "cool": {
        "past": "cooled",
        "gerund": "cooling",
        "present_3s": "cools",
        "present_non_3s": "cool",
        "participle": "cooled"
    },
    "overcome": {
        "past": "overcame",
        "gerund": "overcoming",
        "present_3s": "overcomes",
        "present_non_3s": "overcome",
        "participle": "overcome"
    },
    "caution": {
        "past": "cautioned",
        "gerund": "cautioning",
        "present_3s": "cautions",
        "present_non_3s": "caution",
        "participle": "cautioned"
    },
    "publicize": {
        "past": "publicized",
        "gerund": "publicizing",
        "present_3s": "publicizes",
        "present_non_3s": "publicize",
        "participle": "publicized"
    },
    "pin": {
        "past": "pined",
        "gerund": "pining",
        "present_3s": "pins",
        "present_non_3s": "pin",
        "participle": "pined"
    },
    "rate": {
        "past": "rated",
        "gerund": "rating",
        "present_3s": "rates",
        "present_non_3s": "rate",
        "participle": "rated"
    },
    "sink": {
        "past": "sank",
        "gerund": "sinking",
        "present_3s": "sinks",
        "present_non_3s": "sink",
        "participle": "sank"
    },
    "dig": {
        "past": "diged",
        "gerund": "diging",
        "present_3s": "digs",
        "present_non_3s": "dig",
        "participle": "diged"
    },
    "afford": {
        "past": "afforded",
        "gerund": "affording",
        "present_3s": "affords",
        "present_non_3s": "afford",
        "participle": "afforded"
    },
    "redistribute": {
        "past": "redistributed",
        "gerund": "redistributing",
        "present_3s": "redistributes",
        "present_non_3s": "redistribute",
        "participle": "redistributed"
    },
    "erect": {
        "past": "erected",
        "gerund": "erecting",
        "present_3s": "erects",
        "present_non_3s": "erect",
        "participle": "erected"
    },
    "structure": {
        "past": "structured",
        "gerund": "structuring",
        "present_3s": "structures",
        "present_non_3s": "structure",
        "participle": "structured"
    },
    "downgrade": {
        "past": "downgraded",
        "gerund": "downgrading",
        "present_3s": "downgrades",
        "present_non_3s": "downgrade",
        "participle": "downgraded"
    },
    "arrange": {
        "past": "arranged",
        "gerund": "arranging",
        "present_3s": "arranges",
        "present_non_3s": "arrange",
        "participle": "arranged"
    },
    "overstate": {
        "past": "overstated",
        "gerund": "overstating",
        "present_3s": "overstates",
        "present_non_3s": "overstate",
        "participle": "overstated"
    },
    "circulate": {
        "past": "circulated",
        "gerund": "circulating",
        "present_3s": "circulates",
        "present_non_3s": "circulate",
        "participle": "circulated"
    },
    "down": {
        "past": "downed",
        "gerund": "downing",
        "present_3s": "downs",
        "present_non_3s": "down",
        "participle": "down"
    },
    "eclipse": {
        "past": "eclipsed",
        "gerund": "eclipsing",
        "present_3s": "eclipses",
        "present_non_3s": "eclipse",
        "participle": "eclipsed"
    },
    "debate": {
        "past": "debated",
        "gerund": "debating",
        "present_3s": "debates",
        "present_non_3s": "debate",
        "participle": "debated"
    },
    "assess": {
        "past": "assessed",
        "gerund": "assessing",
        "present_3s": "assesses",
        "present_non_3s": "assess",
        "participle": "assessed"
    },
    "duck": {
        "past": "ducked",
        "gerund": "ducking",
        "present_3s": "ducks",
        "present_non_3s": "duck",
        "participle": "ducked"
    },
    "reason": {
        "past": "reasoned",
        "gerund": "reasoning",
        "present_3s": "reasons",
        "present_non_3s": "reason",
        "participle": "reasoned"
    },
    "twist": {
        "past": "twisted",
        "gerund": "twisting",
        "present_3s": "twists",
        "present_non_3s": "twist",
        "participle": "twisted"
    },
    "reverse": {
        "past": "reversed",
        "gerund": "reversing",
        "present_3s": "reverses",
        "present_non_3s": "reverse",
        "participle": "reversed"
    },
    "chill": {
        "past": "chilled",
        "gerund": "chilling",
        "present_3s": "chills",
        "present_non_3s": "chill",
        "participle": "chilled"
    },
    "accompany": {
        "past": "accompanied",
        "gerund": "accompanying",
        "present_3s": "accompanies",
        "present_non_3s": "accompany",
        "participle": "accompanied"
    },
    "trash": {
        "past": "trashed",
        "gerund": "trashing",
        "present_3s": "trashes",
        "present_non_3s": "trash",
        "participle": "trashed"
    },
    "wreck": {
        "past": "wrecked",
        "gerund": "wrecking",
        "present_3s": "wrecks",
        "present_non_3s": "wreck",
        "participle": "wrecked"
    },
    "smother": {
        "past": "smothered",
        "gerund": "smothering",
        "present_3s": "smothers",
        "present_non_3s": "smother",
        "participle": "smothered"
    },
    "edge": {
        "past": "edged",
        "gerund": "edging",
        "present_3s": "edges",
        "present_non_3s": "edge",
        "participle": "edged"
    },
    "outnumber": {
        "past": "outnumbered",
        "gerund": "outnumbering",
        "present_3s": "outnumbers",
        "present_non_3s": "outnumber",
        "participle": "outnumbered"
    },
    "stimulate": {
        "past": "stimulated",
        "gerund": "stimulating",
        "present_3s": "stimulates",
        "present_non_3s": "stimulate",
        "participle": "stimulated"
    },
    "hug": {
        "past": "hugged",
        "gerund": "hugging",
        "present_3s": "hugs",
        "present_non_3s": "hug",
        "participle": "hugged"
    },
    "shed": {
        "past": "shed",
        "gerund": "shedding",
        "present_3s": "sheds",
        "present_non_3s": "shed",
        "participle": "shed"
    },
    "disappoint": {
        "past": "disappointed",
        "gerund": "disappointing",
        "present_3s": "disappoints",
        "present_non_3s": "disappoint",
        "participle": "disappointed"
    },
    "tender": {
        "past": "tendered",
        "gerund": "tendering",
        "present_3s": "tenders",
        "present_non_3s": "tender",
        "participle": "tendered"
    },
    "shop": {
        "past": "shopped",
        "gerund": "shopping",
        "present_3s": "shops",
        "present_non_3s": "shop",
        "participle": "shopped"
    },
    "equal": {
        "past": "equaled",
        "gerund": "equalling",
        "present_3s": "equals",
        "present_non_3s": "equal",
        "participle": "equaled"
    },
    "tackle": {
        "past": "tackled",
        "gerund": "tackling",
        "present_3s": "tackles",
        "present_non_3s": "tackle",
        "participle": "tackled"
    },
    "dispose": {
        "past": "disposed",
        "gerund": "disposing",
        "present_3s": "disposes",
        "present_non_3s": "dispose",
        "participle": "disposed"
    },
    "worsen": {
        "past": "worsened",
        "gerund": "worsening",
        "present_3s": "worsens",
        "present_non_3s": "worsen",
        "participle": "worsened"
    },
    "rank": {
        "past": "ranked",
        "gerund": "ranking",
        "present_3s": "ranks",
        "present_non_3s": "rank",
        "participle": "ranked"
    },
    "blur": {
        "past": "blurred",
        "gerund": "bluring",
        "present_3s": "blurs",
        "present_non_3s": "blur",
        "participle": "blured"
    },
    "light": {
        "past": "lighted",
        "gerund": "lighting",
        "present_3s": "lights",
        "present_non_3s": "light",
        "participle": "lighted"
    },
    "relaunch": {
        "past": "relaunched",
        "gerund": "relaunching",
        "present_3s": "relaunches",
        "present_non_3s": "relaunch",
        "participle": "relaunched"
    },
    "underperform": {
        "past": "underperformed",
        "gerund": "underperforming",
        "present_3s": "underperforms",
        "present_non_3s": "underperform",
        "participle": "underperformed"
    },
    "unveil": {
        "past": "unveiled",
        "gerund": "unveiling",
        "present_3s": "unveils",
        "present_non_3s": "unveil",
        "participle": "unveiled"
    },
    "subsidize": {
        "past": "subsidized",
        "gerund": "subsidizing",
        "present_3s": "subsidizes",
        "present_non_3s": "subsidize",
        "participle": "subsidized"
    },
    "spare": {
        "past": "spared",
        "gerund": "sparing",
        "present_3s": "spares",
        "present_non_3s": "spare",
        "participle": "spared"
    },
    "appease": {
        "past": "appeased",
        "gerund": "appeasing",
        "present_3s": "appeases",
        "present_non_3s": "appease",
        "participle": "appeased"
    },
    "tinker": {
        "past": "tinkered",
        "gerund": "tinkering",
        "present_3s": "tinkers",
        "present_non_3s": "tinker",
        "participle": "tinkered"
    },
    "relocate": {
        "past": "relocated",
        "gerund": "relocating",
        "present_3s": "relocates",
        "present_non_3s": "relocate",
        "participle": "relocated"
    },
    "coordinate": {
        "past": "coordinated",
        "gerund": "coordinating",
        "present_3s": "coordinates",
        "present_non_3s": "coordinate",
        "participle": "coordinated"
    },
    "route": {
        "past": "routed",
        "gerund": "routing",
        "present_3s": "routes",
        "present_non_3s": "route",
        "participle": "routed"
    },
    "zip": {
        "past": "zipped",
        "gerund": "zipping",
        "present_3s": "zips",
        "present_non_3s": "zip",
        "participle": "zipped"
    },
    "multiply": {
        "past": "multiplied",
        "gerund": "multiplying",
        "present_3s": "multiplies",
        "present_non_3s": "multiply",
        "participle": "multiplied"
    },
    "signify": {
        "past": "signifyed",
        "gerund": "signifying",
        "present_3s": "signifies",
        "present_non_3s": "signify",
        "participle": "signifyed"
    },
    "puzzle": {
        "past": "puzzled",
        "gerund": "puzzling",
        "present_3s": "puzzles",
        "present_non_3s": "puzzle",
        "participle": "puzzled"
    },
    "tap": {
        "past": "taped",
        "gerund": "tapping",
        "present_3s": "taps",
        "present_non_3s": "tap",
        "participle": "taped"
    },
    "land": {
        "past": "landed",
        "gerund": "landing",
        "present_3s": "lands",
        "present_non_3s": "land",
        "participle": "landed"
    },
    "delist": {
        "past": "delisted",
        "gerund": "delisting",
        "present_3s": "delists",
        "present_non_3s": "delist",
        "participle": "delisted"
    },
    "oust": {
        "past": "ousted",
        "gerund": "ousting",
        "present_3s": "ousts",
        "present_non_3s": "oust",
        "participle": "ousted"
    },
    "explore": {
        "past": "explored",
        "gerund": "exploring",
        "present_3s": "explores",
        "present_non_3s": "explore",
        "participle": "explored"
    },
    "sag": {
        "past": "sagged",
        "gerund": "sagging",
        "present_3s": "sags",
        "present_non_3s": "sag",
        "participle": "sagged"
    },
    "mute": {
        "past": "muted",
        "gerund": "muting",
        "present_3s": "mutes",
        "present_non_3s": "mute",
        "participle": "muted"
    },
    "grain": {
        "past": "grained",
        "gerund": "graining",
        "present_3s": "grains",
        "present_non_3s": "grain",
        "participle": "grained"
    },
    "secede": {
        "past": "seceded",
        "gerund": "seceding",
        "present_3s": "secedes",
        "present_non_3s": "secede",
        "participle": "seceded"
    },
    "accrue": {
        "past": "accrued",
        "gerund": "accruing",
        "present_3s": "accrues",
        "present_non_3s": "accrue",
        "participle": "accrued"
    },
    "dilute": {
        "past": "diluted",
        "gerund": "diluting",
        "present_3s": "dilutes",
        "present_non_3s": "dilute",
        "participle": "diluted"
    },
    "magnify": {
        "past": "magnified",
        "gerund": "magnifying",
        "present_3s": "magnifies",
        "present_non_3s": "magnify",
        "participle": "magnified"
    },
    "reimburse": {
        "past": "reimbursed",
        "gerund": "reimbursing",
        "present_3s": "reimburses",
        "present_non_3s": "reimburse",
        "participle": "reimbursed"
    },
    "bear": {
        "past": "bore",
        "gerund": "bearing",
        "present_3s": "bears",
        "present_non_3s": "bear",
        "participle": "born"
    },
    "subdue": {
        "past": "subdued",
        "gerund": "subduing",
        "present_3s": "subdues",
        "present_non_3s": "subdue",
        "participle": "subdued"
    },
    "falter": {
        "past": "faltered",
        "gerund": "faltering",
        "present_3s": "falters",
        "present_non_3s": "falter",
        "participle": "faltered"
    },
    "await": {
        "past": "awaited",
        "gerund": "awaiting",
        "present_3s": "awaits",
        "present_non_3s": "await",
        "participle": "awaited"
    },
    "sense": {
        "past": "sensed",
        "gerund": "sensing",
        "present_3s": "senses",
        "present_non_3s": "sense",
        "participle": "sensed"
    },
    "stick": {
        "past": "stuck",
        "gerund": "sticking",
        "present_3s": "sticks",
        "present_non_3s": "stick",
        "participle": "stuck"
    },
    "restructure": {
        "past": "restructured",
        "gerund": "restructuring",
        "present_3s": "restructures",
        "present_non_3s": "restructure",
        "participle": "restructured"
    },
    "exchange": {
        "past": "exchanged",
        "gerund": "exchanging",
        "present_3s": "exchanges",
        "present_non_3s": "exchange",
        "participle": "exchanged"
    },
    "liquidate": {
        "past": "liquidated",
        "gerund": "liquidating",
        "present_3s": "liquidates",
        "present_non_3s": "liquidate",
        "participle": "liquidated"
    },
    "distribute": {
        "past": "distributed",
        "gerund": "distributing",
        "present_3s": "distributes",
        "present_non_3s": "distribute",
        "participle": "distributed"
    },
    "soften": {
        "past": "softened",
        "gerund": "softening",
        "present_3s": "softens",
        "present_non_3s": "soften",
        "participle": "softened"
    },
    "lend": {
        "past": "lent",
        "gerund": "lending",
        "present_3s": "lends",
        "present_non_3s": "lend",
        "participle": "lended"
    },
    "outbid": {
        "past": "outbided",
        "gerund": "outbiding",
        "present_3s": "outbids",
        "present_non_3s": "outbid",
        "participle": "outbided"
    },
    "derive": {
        "past": "derived",
        "gerund": "deriving",
        "present_3s": "derives",
        "present_non_3s": "derive",
        "participle": "derived"
    },
    "avert": {
        "past": "averted",
        "gerund": "averting",
        "present_3s": "averts",
        "present_non_3s": "avert",
        "participle": "averted"
    },
    "plague": {
        "past": "plagued",
        "gerund": "plaguing",
        "present_3s": "plagues",
        "present_non_3s": "plague",
        "participle": "plagued"
    },
    "reaffirm": {
        "past": "reaffirmed",
        "gerund": "reaffirming",
        "present_3s": "reaffirms",
        "present_non_3s": "reaffirm",
        "participle": "reaffirmed"
    },
    "thwart": {
        "past": "thwarted",
        "gerund": "thwarting",
        "present_3s": "thwarts",
        "present_non_3s": "thwart",
        "participle": "thwarted"
    },
    "demobilize": {
        "past": "demobilized",
        "gerund": "demobilizing",
        "present_3s": "demobilizes",
        "present_non_3s": "demobilize",
        "participle": "demobilized"
    },
    "brush": {
        "past": "brushed",
        "gerund": "brushing",
        "present_3s": "brushes",
        "present_non_3s": "brush",
        "participle": "brushed"
    },
    "flee": {
        "past": "fled",
        "gerund": "fleeing",
        "present_3s": "flees",
        "present_non_3s": "flee",
        "participle": "fled"
    },
    "neighbor": {
        "past": "neighbored",
        "gerund": "neighboring",
        "present_3s": "neighbors",
        "present_non_3s": "neighbor",
        "participle": "neighbored"
    },
    "sabotage": {
        "past": "sabotaged",
        "gerund": "sabotaging",
        "present_3s": "sabotages",
        "present_non_3s": "sabotage",
        "participle": "sabotaged"
    },
    "assassinate": {
        "past": "assassinated",
        "gerund": "assassinating",
        "present_3s": "assassinates",
        "present_non_3s": "assassinate",
        "participle": "assassinated"
    },
    "slay": {
        "past": "slayed",
        "gerund": "slaying",
        "present_3s": "slays",
        "present_non_3s": "slay",
        "participle": "slayed"
    },
    "avenge": {
        "past": "avenged",
        "gerund": "avenging",
        "present_3s": "avenges",
        "present_non_3s": "avenge",
        "participle": "avenged"
    },
    "pledge": {
        "past": "pledged",
        "gerund": "pledging",
        "present_3s": "pledges",
        "present_non_3s": "pledge",
        "participle": "pledged"
    },
    "rig": {
        "past": "rigged",
        "gerund": "rigging",
        "present_3s": "rigs",
        "present_non_3s": "rig",
        "participle": "rigged"
    },
    "subpoena": {
        "past": "subpoenaed",
        "gerund": "subpoenaing",
        "present_3s": "subpoenas",
        "present_non_3s": "subpoena",
        "participle": "subpoenaed"
    },
    "plant": {
        "past": "planted",
        "gerund": "planting",
        "present_3s": "plants",
        "present_non_3s": "plant",
        "participle": "planted"
    },
    "explode": {
        "past": "exploded",
        "gerund": "exploding",
        "present_3s": "explodes",
        "present_non_3s": "explode",
        "participle": "exploded"
    },
    "centralize": {
        "past": "centralized",
        "gerund": "centralizing",
        "present_3s": "centralizes",
        "present_non_3s": "centralize",
        "participle": "centralized"
    },
    "mull": {
        "past": "mulled",
        "gerund": "mulling",
        "present_3s": "mulls",
        "present_non_3s": "mull",
        "participle": "mulled"
    },
    "mitigate": {
        "past": "mitigated",
        "gerund": "mitigating",
        "present_3s": "mitigates",
        "present_non_3s": "mitigate",
        "participle": "mitigated"
    },
    "reserve": {
        "past": "reserved",
        "gerund": "reserving",
        "present_3s": "reserves",
        "present_non_3s": "reserve",
        "participle": "reserved"
    },
    "separate": {
        "past": "separated",
        "gerund": "separating",
        "present_3s": "separates",
        "present_non_3s": "separate",
        "participle": "separated"
    },
    "batter": {
        "past": "battered",
        "gerund": "battering",
        "present_3s": "batters",
        "present_non_3s": "batter",
        "participle": "battered"
    },
    "float": {
        "past": "floated",
        "gerund": "floating",
        "present_3s": "floats",
        "present_non_3s": "float",
        "participle": "floated"
    },
    "capitalize": {
        "past": "capitalized",
        "gerund": "capitalizing",
        "present_3s": "capitalizes",
        "present_non_3s": "capitalize",
        "participle": "capitalized"
    },
    "spin": {
        "past": "spined",
        "gerund": "spinning",
        "present_3s": "spins",
        "present_non_3s": "spin",
        "participle": "spun"
    },
    "induce": {
        "past": "induced",
        "gerund": "inducing",
        "present_3s": "induces",
        "present_non_3s": "induce",
        "participle": "induced"
    },
    "injure": {
        "past": "injured",
        "gerund": "injuring",
        "present_3s": "injures",
        "present_non_3s": "injure",
        "participle": "injured"
    },
    "trim": {
        "past": "trimmed",
        "gerund": "trimming",
        "present_3s": "trims",
        "present_non_3s": "trim",
        "participle": "trimmed"
    },
    "revolve": {
        "past": "revolved",
        "gerund": "revolving",
        "present_3s": "revolves",
        "present_non_3s": "revolve",
        "participle": "revolved"
    },
    "falsify": {
        "past": "falsified",
        "gerund": "falsifying",
        "present_3s": "falsifies",
        "present_non_3s": "falsify",
        "participle": "falsified"
    },
    "plug": {
        "past": "plugged",
        "gerund": "plugging",
        "present_3s": "plugs",
        "present_non_3s": "plug",
        "participle": "plugged"
    },
    "rebuild": {
        "past": "rebuilt",
        "gerund": "rebuilding",
        "present_3s": "rebuilds",
        "present_non_3s": "rebuild",
        "participle": "rebuilt"
    },
    "bribe": {
        "past": "bribed",
        "gerund": "bribing",
        "present_3s": "bribes",
        "present_non_3s": "bribe",
        "participle": "bribed"
    },
    "fashion": {
        "past": "fashioned",
        "gerund": "fashioning",
        "present_3s": "fashions",
        "present_non_3s": "fashion",
        "participle": "fashioned"
    },
    "befall": {
        "past": "befell",
        "gerund": "befalling",
        "present_3s": "befell",
        "present_non_3s": "befall",
        "participle": "befell"
    },
    "grip": {
        "past": "griped",
        "gerund": "gripping",
        "present_3s": "grips",
        "present_non_3s": "grip",
        "participle": "griped"
    },
    "wrestle": {
        "past": "wrestled",
        "gerund": "wrestling",
        "present_3s": "wrestles",
        "present_non_3s": "wrestle",
        "participle": "wrestled"
    },
    "dole": {
        "past": "doled",
        "gerund": "doling",
        "present_3s": "doles",
        "present_non_3s": "dole",
        "participle": "doled"
    },
    "scoop": {
        "past": "scooped",
        "gerund": "scooping",
        "present_3s": "scoops",
        "present_non_3s": "scoop",
        "participle": "scooped"
    },
    "best": {
        "past": "bested",
        "gerund": "besting",
        "present_3s": "bests",
        "present_non_3s": "best",
        "participle": "bested"
    },
    "broker": {
        "past": "brokered",
        "gerund": "brokering",
        "present_3s": "brokers",
        "present_non_3s": "broker",
        "participle": "brokered"
    },
    "finalize": {
        "past": "finalized",
        "gerund": "finalizing",
        "present_3s": "finalizes",
        "present_non_3s": "finalize",
        "participle": "finalized"
    },
    "lease": {
        "past": "leased",
        "gerund": "leasing",
        "present_3s": "leases",
        "present_non_3s": "lease",
        "participle": "leased"
    },
    "inject": {
        "past": "injected",
        "gerund": "injecting",
        "present_3s": "injects",
        "present_non_3s": "inject",
        "participle": "injected"
    },
    "subscribe": {
        "past": "subscribed",
        "gerund": "subscribing",
        "present_3s": "subscribes",
        "present_non_3s": "subscribe",
        "participle": "subscribed"
    },
    "sputter": {
        "past": "sputtered",
        "gerund": "sputtering",
        "present_3s": "sputters",
        "present_non_3s": "sputter",
        "participle": "sputtered"
    },
    "harvest": {
        "past": "harvested",
        "gerund": "harvesting",
        "present_3s": "harvests",
        "present_non_3s": "harvest",
        "participle": "harvested"
    },
    "flow": {
        "past": "flowed",
        "gerund": "flowing",
        "present_3s": "flows",
        "present_non_3s": "flow",
        "participle": "flowed"
    },
    "rain": {
        "past": "rained",
        "gerund": "raining",
        "present_3s": "rains",
        "present_non_3s": "rain",
        "participle": "rained"
    },
    "alleviate": {
        "past": "alleviated",
        "gerund": "alleviating",
        "present_3s": "alleviates",
        "present_non_3s": "alleviate",
        "participle": "alleviated"
    },
    "deplete": {
        "past": "depleted",
        "gerund": "depleting",
        "present_3s": "depletes",
        "present_non_3s": "deplete",
        "participle": "depleted"
    },
    "gather": {
        "past": "gathered",
        "gerund": "gathering",
        "present_3s": "gathers",
        "present_non_3s": "gather",
        "participle": "gathered"
    },
    "compress": {
        "past": "compressed",
        "gerund": "compressing",
        "present_3s": "compresses",
        "present_non_3s": "compress",
        "participle": "compressed"
    },
    "influence": {
        "past": "influenced",
        "gerund": "influencing",
        "present_3s": "influences",
        "present_non_3s": "influence",
        "participle": "influenced"
    },
    "strike": {
        "past": "struck",
        "gerund": "striking",
        "present_3s": "strikes",
        "present_non_3s": "strike",
        "participle": "struck"
    },
    "precede": {
        "past": "preceded",
        "gerund": "preceding",
        "present_3s": "precedes",
        "present_non_3s": "precede",
        "participle": "preceded"
    },
    "ride": {
        "past": "rode",
        "gerund": "riding",
        "present_3s": "rides",
        "present_non_3s": "ride",
        "participle": "rode"
    },
    "plummet": {
        "past": "plummeted",
        "gerund": "plummeting",
        "present_3s": "plummets",
        "present_non_3s": "plummet",
        "participle": "plummeted"
    },
    "galvanize": {
        "past": "galvanized",
        "gerund": "galvanizing",
        "present_3s": "galvanizes",
        "present_non_3s": "galvanize",
        "participle": "galvanized"
    },
    "narrow": {
        "past": "narrowed",
        "gerund": "narrowing",
        "present_3s": "narrows",
        "present_non_3s": "narrow",
        "participle": "narrowed"
    },
    "solicit": {
        "past": "solicited",
        "gerund": "soliciting",
        "present_3s": "solicits",
        "present_non_3s": "solicit",
        "participle": "solicited"
    },
    "scuttle": {
        "past": "scuttled",
        "gerund": "scuttling",
        "present_3s": "scuttles",
        "present_non_3s": "scuttle",
        "participle": "scuttled"
    },
    "share": {
        "past": "shared",
        "gerund": "sharing",
        "present_3s": "shares",
        "present_non_3s": "share",
        "participle": "shared"
    },
    "ferment": {
        "past": "fermented",
        "participle": "fermented",
        "present_3s": "ferments",
        "present_non_3s": "ferment",
        "gerund": "fermenting"
    },
    "twitch": {
        "past": "twitched",
        "participle": "twitched",
        "present_3s": "twitches",
        "present_non_3s": "twitch",
        "gerund": "twitching"
    },
    "drive": {
        "past": "drove",
        "participle": "driven",
        "present_3s": "drives",
        "present_non_3s": "drive",
        "gerund": "driving"
    },
    "mangle": {
        "past": "mangled",
        "participle": "mangled",
        "present_3s": "mangles",
        "present_non_3s": "mangle",
        "gerund": "mangling"
    },
    "blast": {
        "past": "blasted",
        "participle": "blasted",
        "present_3s": "blasts",
        "present_non_3s": "blast",
        "gerund": "blasting"
    },
    "pleat": {
        "past": "pleated",
        "participle": "pleated",
        "present_3s": "pleats",
        "present_non_3s": "pleat",
        "gerund": "pleating"
    },
    "thrill": {
        "past": "thrilled",
        "participle": "thrilled",
        "present_3s": "thrills",
        "present_non_3s": "thrill",
        "gerund": "thrilling"
    },
    "puncture": {
        "past": "punctured",
        "participle": "punctured",
        "present_3s": "punctures",
        "present_non_3s": "puncture",
        "gerund": "puncturing"
    },
    "rabbet": {
        "past": "rabbeted",
        "participle": "rabbeted",
        "present_3s": "rabbets",
        "present_non_3s": "rabbet",
        "gerund": "rabbeting"
    },
    "hobble": {
        "past": "hobbled",
        "participle": "hobbled",
        "present_3s": "hobbles",
        "present_non_3s": "hobble",
        "gerund": "hobbling"
    },
    "cream": {
        "past": "creamed",
        "participle": "creamed",
        "present_3s": "creams",
        "present_non_3s": "cream",
        "gerund": "creaming"
    },
    "filter": {
        "past": "filtered",
        "participle": "filtered",
        "present_3s": "filters",
        "present_non_3s": "filter",
        "gerund": "filtering"
    },
    "dribble": {
        "past": "dribbled",
        "participle": "dribbled",
        "present_3s": "dribbles",
        "present_non_3s": "dribble",
        "gerund": "dribbling"
    },
    "riddle": {
        "past": "riddled",
        "participle": "riddled",
        "present_3s": "riddles",
        "present_non_3s": "riddle",
        "gerund": "riddling"
    },
    "gloat": {
        "past": "gloated",
        "participle": "gloated",
        "present_3s": "gloats",
        "present_non_3s": "gloat",
        "gerund": "gloating"
    },
    "trench": {
        "past": "trenched",
        "participle": "trenched",
        "present_3s": "trenches",
        "present_non_3s": "trench",
        "gerund": "trenching"
    },
    "lipstick": {
        "past": "lipsticked",
        "participle": "lipsticked",
        "present_3s": "lipsticks",
        "present_non_3s": "lipstick",
        "gerund": "lipsticking"
    },
    "cloak": {
        "past": "cloaked",
        "participle": "cloaked",
        "present_3s": "cloaks",
        "present_non_3s": "cloak",
        "gerund": "cloaking"
    },
    "crackle": {
        "past": "crackled",
        "participle": "crackled",
        "present_3s": "crackles",
        "present_non_3s": "crackle",
        "gerund": "crackling"
    },
    "disgust": {
        "past": "disgusted",
        "participle": "disgusted",
        "present_3s": "disgusts",
        "present_non_3s": "disgust",
        "gerund": "disgusting"
    },
    "trump": {
        "past": "trumped",
        "participle": "trumped",
        "present_3s": "trumps",
        "present_non_3s": "trump",
        "gerund": "trumping"
    },
    "compound": {
        "past": "compounded",
        "participle": "compounded",
        "present_3s": "compounds",
        "present_non_3s": "compound",
        "gerund": "compounding"
    },
    "compact": {
        "past": "compacted",
        "participle": "compacted",
        "present_3s": "compacts",
        "present_non_3s": "compact",
        "gerund": "compacting"
    },
    "carpet": {
        "past": "carpeted",
        "participle": "carpeted",
        "present_3s": "carpets",
        "present_non_3s": "carpet",
        "gerund": "carpeting"
    },
    "slump": {
        "past": "slumped",
        "participle": "slumped",
        "present_3s": "slumps",
        "present_non_3s": "slump",
        "gerund": "slumping"
    },
    "disgrace": {
        "past": "disgraced",
        "participle": "disgraced",
        "present_3s": "disgraces",
        "present_non_3s": "disgrace",
        "gerund": "disgracing"
    },
    "mortise": {
        "past": "mortised",
        "participle": "mortised",
        "present_3s": "mortises",
        "present_non_3s": "mortise",
        "gerund": "mortising"
    },
    "worship": {
        "past": "worshiped",
        "participle": "worshiped",
        "present_3s": "worships",
        "present_non_3s": "worship",
        "gerund": "worshiping"
    },
    "squall": {
        "past": "squalled",
        "participle": "squalled",
        "present_3s": "squalls",
        "present_non_3s": "squall",
        "gerund": "squalling"
    },
    "shame": {
        "past": "shamed",
        "participle": "shamed",
        "present_3s": "shames",
        "present_non_3s": "shame",
        "gerund": "shaming"
    },
    "barge": {
        "past": "barged",
        "participle": "barged",
        "present_3s": "barges",
        "present_non_3s": "barge",
        "gerund": "barging"
    },
    "sluice": {
        "past": "sluiced",
        "participle": "sluiced",
        "present_3s": "sluices",
        "present_non_3s": "sluice",
        "gerund": "sluicing"
    },
    "grudge": {
        "past": "grudged",
        "participle": "grudged",
        "present_3s": "grudges",
        "present_non_3s": "grudge",
        "gerund": "grudging"
    },
    "rivet": {
        "past": "riveted",
        "participle": "riveted",
        "present_3s": "rivets",
        "present_non_3s": "rivet",
        "gerund": "riveting"
    },
    "cradle": {
        "past": "cradled",
        "participle": "cradled",
        "present_3s": "cradles",
        "present_non_3s": "cradle",
        "gerund": "cradling"
    },
    "gibbet": {
        "past": "gibbeted",
        "participle": "gibbeted",
        "present_3s": "gibbets",
        "present_non_3s": "gibbet",
        "gerund": "gibbeting"
    },
    "cloud": {
        "past": "clouded",
        "participle": "clouded",
        "present_3s": "clouds",
        "present_non_3s": "cloud",
        "gerund": "clouding"
    },
    "furrow": {
        "past": "furrowed",
        "participle": "furrowed",
        "present_3s": "furrows",
        "present_non_3s": "furrow",
        "gerund": "furrowing"
    },
    "clasp": {
        "past": "clasped",
        "participle": "clasped",
        "present_3s": "clasps",
        "present_non_3s": "clasp",
        "gerund": "clasping"
    },
    "frazzle": {
        "past": "frazzled",
        "participle": "frazzled",
        "present_3s": "frazzles",
        "present_non_3s": "frazzle",
        "gerund": "frazzling"
    },
    "twine": {
        "past": "twined",
        "participle": "twined",
        "present_3s": "twines",
        "present_non_3s": "twine",
        "gerund": "twining"
    },
    "founder": {
        "past": "foundered",
        "participle": "foundered",
        "present_3s": "founders",
        "present_non_3s": "founder",
        "gerund": "foundering"
    },
    "bruise": {
        "past": "bruised",
        "participle": "bruised",
        "present_3s": "bruises",
        "present_non_3s": "bruise",
        "gerund": "bruising"
    },
    "grizzle": {
        "past": "grizzled",
        "participle": "grizzled",
        "present_3s": "grizzles",
        "present_non_3s": "grizzle",
        "gerund": "grizzling"
    },
    "overhang": {
        "past": "overhung",
        "participle": "overhung",
        "present_3s": "overhangs",
        "present_non_3s": "overhang",
        "gerund": "overhanging"
    },
    "freewheel": {
        "past": "freewheeled",
        "participle": "freewheeled",
        "present_3s": "freewheels",
        "present_non_3s": "freewheel",
        "gerund": "freewheeling"
    },
    "quilt": {
        "past": "quilted",
        "participle": "quilted",
        "present_3s": "quilts",
        "present_non_3s": "quilt",
        "gerund": "quilting"
    },
    "duplicate": {
        "past": "duplicated",
        "participle": "duplicated",
        "present_3s": "duplicates",
        "present_non_3s": "duplicate",
        "gerund": "duplicating"
    },
    "snaffle": {
        "past": "snaffled",
        "participle": "snaffled",
        "present_3s": "snaffles",
        "present_non_3s": "snaffle",
        "gerund": "snaffling"
    },
    "incline": {
        "past": "inclined",
        "participle": "inclined",
        "present_3s": "inclines",
        "present_non_3s": "incline",
        "gerund": "inclining"
    },
    "wrench": {
        "past": "wrenched",
        "participle": "wrenched",
        "present_3s": "wrenchs",
        "present_non_3s": "wrench",
        "gerund": "wrenching"
    },
    "overlay": {
        "past": "overlaid",
        "participle": "overlaid",
        "present_3s": "overlays",
        "present_non_3s": "overlay",
        "gerund": "overlaying"
    },
    "tamper": {
        "past": "tampered",
        "participle": "tampered",
        "present_3s": "tampers",
        "present_non_3s": "tamper",
        "gerund": "tampering"
    },
    "cramp": {
        "past": "cramped",
        "participle": "cramped",
        "present_3s": "cramps",
        "present_non_3s": "cramp",
        "gerund": "cramping"
    },
    "ornament": {
        "past": "ornamented",
        "participle": "ornamented",
        "present_3s": "ornaments",
        "present_non_3s": "ornament",
        "gerund": "ornamenting"
    },
    "churn": {
        "past": "churned",
        "participle": "churned",
        "present_3s": "churns",
        "present_non_3s": "churn",
        "gerund": "churning"
    },
    "bridle": {
        "past": "bridled",
        "participle": "bridled",
        "present_3s": "bridles",
        "present_non_3s": "bridle",
        "gerund": "bridling"
    },
    "repose": {
        "past": "reposed",
        "participle": "reposed",
        "present_3s": "reposes",
        "present_non_3s": "repose",
        "gerund": "reposing"
    },
    "buckle": {
        "past": "buckled",
        "participle": "buckled",
        "present_3s": "buckles",
        "present_non_3s": "buckle",
        "gerund": "buckling"
    },
    "scupper": {
        "past": "scuppered",
        "participle": "scuppered",
        "present_3s": "scuppers",
        "present_non_3s": "scupper",
        "gerund": "scuppering"
    },
    "braid": {
        "past": "braided",
        "participle": "braided",
        "present_3s": "braids",
        "present_non_3s": "braid",
        "gerund": "braiding"
    },
    "graze": {
        "past": "grazed",
        "participle": "grazed",
        "present_3s": "grazes",
        "present_non_3s": "graze",
        "gerund": "grazing"
    },
    "chafe": {
        "past": "chafed",
        "participle": "chafed",
        "present_3s": "chafes",
        "present_non_3s": "chafe",
        "gerund": "chafing"
    },
    "dishonor": {
        "past": "dishonored",
        "participle": "dishonored",
        "present_3s": "dishonors",
        "present_non_3s": "dishonor",
        "gerund": "dishonoring"
    },
    "plume": {
        "past": "plumed",
        "participle": "plumed",
        "present_3s": "plumes",
        "present_non_3s": "plume",
        "gerund": "pluming"
    },
    "thunder": {
        "past": "thundered",
        "participle": "thundered",
        "present_3s": "thunders",
        "present_non_3s": "thunder",
        "gerund": "thundering"
    },
    "singe": {
        "past": "singed",
        "participle": "singed",
        "present_3s": "singes",
        "present_non_3s": "singe",
        "gerund": "singing"
    },
    "slack": {
        "past": "slacked",
        "participle": "slacked",
        "present_3s": "slacks",
        "present_non_3s": "slack",
        "gerund": "slacking"
    },
    "knuckle": {
        "past": "knuckled",
        "participle": "knuckled",
        "present_3s": "knuckles",
        "present_non_3s": "knuckle",
        "gerund": "knuckling"
    },
    "grate": {
        "past": "grated",
        "participle": "grated",
        "present_3s": "grates",
        "present_non_3s": "grate",
        "gerund": "grating"
    },
    "prick": {
        "past": "pricked",
        "participle": "pricked",
        "present_3s": "pricks",
        "present_non_3s": "prick",
        "gerund": "pricking"
    },
    "whisk": {
        "past": "whisked",
        "participle": "whisked",
        "present_3s": "whisks",
        "present_non_3s": "whisk",
        "gerund": "whisking"
    },
    "telescope": {
        "past": "telescoped",
        "participle": "telescoped",
        "present_3s": "telescopes",
        "present_non_3s": "telescope",
        "gerund": "telescoping"
    },
    "transit": {
        "past": "transited",
        "participle": "transited",
        "present_3s": "transits",
        "present_non_3s": "transit",
        "gerund": "transiting"
    },
    "splice": {
        "past": "spliced",
        "participle": "spliced",
        "present_3s": "splices",
        "present_non_3s": "splice",
        "gerund": "splicing"
    },
    "chisel": {
        "past": "chiseled",
        "participle": "chiseled",
        "present_3s": "chisels",
        "present_non_3s": "chisel",
        "gerund": "chiseling"
    },
    "baffle": {
        "past": "baffled",
        "participle": "baffled",
        "present_3s": "baffles",
        "present_non_3s": "baffle",
        "gerund": "baffling"
    },
    "tinsel": {
        "past": "tinseled",
        "participle": "tinseled",
        "present_3s": "tinsels",
        "present_non_3s": "tinsel",
        "gerund": "tinseling"
    },
    "squelch": {
        "past": "squelched",
        "participle": "squelched",
        "present_3s": "squelches",
        "present_non_3s": "squelch",
        "gerund": "squelching"
    },
    "rifle": {
        "past": "rifled",
        "participle": "rifled",
        "present_3s": "rifles",
        "present_non_3s": "rifle",
        "gerund": "rifling"
    },
    "flame": {
        "past": "flamed",
        "participle": "flamed",
        "present_3s": "flames",
        "present_non_3s": "flame",
        "gerund": "flaming"
    },
    "ruffle": {
        "past": "ruffled",
        "participle": "ruffled",
        "present_3s": "ruffles",
        "present_non_3s": "ruffle",
        "gerund": "ruffling"
    },
    "splat": {
        "past": "splat",
        "participle": "splat",
        "present_3s": "splats",
        "present_non_3s": "splat",
        "gerund": "splatting"
    },
    "barricade": {
        "past": "barricaded",
        "participle": "barricaded",
        "present_3s": "barricades",
        "present_non_3s": "barricade",
        "gerund": "barricading"
    },
    "crush": {
        "past": "crushed",
        "participle": "crushed",
        "present_3s": "crushs",
        "present_non_3s": "crush",
        "gerund": "crushing"
    },
    "twinge": {
        "past": "twinged",
        "participle": "twinged",
        "present_3s": "twinges",
        "present_non_3s": "twinge",
        "gerund": "twinging"
    },
    "finger": {
        "past": "fingered",
        "participle": "fingered",
        "present_3s": "fingers",
        "present_non_3s": "finger",
        "gerund": "fingering"
    },
    "throttle": {
        "past": "throttled",
        "participle": "throttled",
        "present_3s": "throttles",
        "present_non_3s": "throttle",
        "gerund": "throttling"
    },
    "storm": {
        "past": "stormed",
        "participle": "stormed",
        "present_3s": "storms",
        "present_non_3s": "storm",
        "gerund": "storming"
    },
    "scalp": {
        "past": "scalped",
        "participle": "scalped",
        "present_3s": "scalps",
        "present_non_3s": "scalp",
        "gerund": "scalping"
    },
    "throb": {
        "past": "throbbed",
        "participle": "throbbed",
        "present_3s": "throbs",
        "present_non_3s": "throb",
        "gerund": "throbbing"
    },
    "baste": {
        "past": "basted",
        "participle": "basted",
        "present_3s": "bastes",
        "present_non_3s": "baste",
        "gerund": "basting"
    },
    "cantilever": {
        "past": "cantilevered",
        "participle": "cantilevered",
        "present_3s": "cantilevers",
        "present_non_3s": "cantilever",
        "gerund": "cantilevering"
    },
    "tread": {
        "past": "trod",
        "participle": "trod",
        "present_3s": "treads",
        "present_non_3s": "tread",
        "gerund": "treading"
    },
    "putter": {
        "past": "puttered",
        "participle": "puttered",
        "present_3s": "putters",
        "present_non_3s": "putter",
        "gerund": "puttering"
    },
    "shipwreck": {
        "past": "shipwrecked",
        "participle": "shipwrecked",
        "present_3s": "shipwrecks",
        "present_non_3s": "shipwreck",
        "gerund": "shipwrecking"
    },
    "truckle": {
        "past": "truckled",
        "participle": "truckled",
        "present_3s": "truckles",
        "present_non_3s": "truckle",
        "gerund": "truckling"
    },
    "transplant": {
        "past": "transplanted",
        "participle": "transplanted",
        "present_3s": "transplants",
        "present_non_3s": "transplant",
        "gerund": "transplanting"
    },
    "flutter": {
        "past": "fluttered",
        "participle": "fluttered",
        "present_3s": "flutters",
        "present_non_3s": "flutter",
        "gerund": "fluttering"
    },
    "hoist": {
        "past": "hoisted",
        "participle": "hoisted",
        "present_3s": "hoists",
        "present_non_3s": "hoist",
        "gerund": "hoisting"
    },
    "thread": {
        "past": "threaded",
        "participle": "threaded",
        "present_3s": "threads",
        "present_non_3s": "thread",
        "gerund": "threading"
    },
    "blockade": {
        "past": "blockaded",
        "participle": "blockaded",
        "present_3s": "blockades",
        "present_non_3s": "blockade",
        "gerund": "blockading"
    },
    "bloat": {
        "past": "bloated",
        "participle": "bloated",
        "present_3s": "bloats",
        "present_non_3s": "bloat",
        "gerund": "bloating"
    },
    "leach": {
        "past": "leached",
        "participle": "leached",
        "present_3s": "leachs",
        "present_non_3s": "leach",
        "gerund": "leaching"
    },
    "fiddle": {
        "past": "fiddled",
        "participle": "fiddled",
        "present_3s": "fiddles",
        "present_non_3s": "fiddle",
        "gerund": "fiddling"
    },
    "hunger": {
        "past": "hungered",
        "participle": "hungered",
        "present_3s": "hungers",
        "present_non_3s": "hunger",
        "gerund": "hungering"
    },
    "thrust": {
        "past": "thrust",
        "participle": "thrust",
        "present_3s": "thrusts",
        "present_non_3s": "thrust",
        "gerund": "thrusting"
    },
    "splash": {
        "past": "splashed",
        "participle": "splashed",
        "present_3s": "splashs",
        "present_non_3s": "splash",
        "gerund": "splashing"
    },
    "paddle": {
        "past": "paddled",
        "participle": "paddled",
        "present_3s": "paddles",
        "present_non_3s": "paddle",
        "gerund": "paddling"
    },
    "scarf": {
        "past": "scarfed",
        "participle": "scarfed",
        "present_3s": "scarfs",
        "present_non_3s": "scarf",
        "gerund": "scarfing"
    },
    "harbor": {
        "past": "harbored",
        "participle": "harbored",
        "present_3s": "harbors",
        "present_non_3s": "harbor",
        "gerund": "harboring"
    },
    "chart": {
        "past": "charted",
        "participle": "charted",
        "present_3s": "charts",
        "present_non_3s": "chart",
        "gerund": "charting"
    },
    "aquaplane": {
        "past": "aquaplaned",
        "participle": "aquaplaned",
        "present_3s": "aquaplanes",
        "present_non_3s": "aquaplane",
        "gerund": "aquaplaning"
    },
    "upstage": {
        "past": "upstaged",
        "participle": "upstaged",
        "present_3s": "upstages",
        "present_non_3s": "upstage",
        "gerund": "upstaging"
    },
    "sledge": {
        "past": "sledged",
        "participle": "sledged",
        "present_3s": "sledges",
        "present_non_3s": "sledge",
        "gerund": "sledging"
    },
    "uplift": {
        "past": "uplifted",
        "participle": "uplifted",
        "present_3s": "uplifts",
        "present_non_3s": "uplift",
        "gerund": "uplifting"
    },
    "spout": {
        "past": "spouted",
        "participle": "spouted",
        "present_3s": "spouts",
        "present_non_3s": "spout",
        "gerund": "spouting"
    },
    "overload": {
        "past": "overloaded",
        "participle": "overloaded",
        "present_3s": "overloads",
        "present_non_3s": "overload",
        "gerund": "overloading"
    },
    "dibble": {
        "past": "dibbled",
        "participle": "dibbled",
        "present_3s": "dibbles",
        "present_non_3s": "dibble",
        "gerund": "dibbling"
    },
    "shack": {
        "past": "shacked",
        "participle": "shacked",
        "present_3s": "shacks",
        "present_non_3s": "shack",
        "gerund": "shacking"
    },
    "heckle": {
        "past": "heckled",
        "participle": "heckled",
        "present_3s": "heckles",
        "present_non_3s": "heckle",
        "gerund": "heckling"
    },
    "sandbag": {
        "past": "sandbagged",
        "participle": "sandbagged",
        "present_3s": "sandbags",
        "present_non_3s": "sandbag",
        "gerund": "sandbagging"
    },
    "crunch": {
        "past": "crunched",
        "participle": "crunched",
        "present_3s": "crunchs",
        "present_non_3s": "crunch",
        "gerund": "crunching"
    },
    "crochet": {
        "past": "crocheted",
        "participle": "crocheted",
        "present_3s": "crochets",
        "present_non_3s": "crochet",
        "gerund": "crocheting"
    },
    "interrupt": {
        "past": "interrupted",
        "participle": "interrupted",
        "present_3s": "interrupts",
        "present_non_3s": "interrupt",
        "gerund": "interrupting"
    },
    "semaphore": {
        "past": "semaphored",
        "participle": "semaphored",
        "present_3s": "semaphores",
        "present_non_3s": "semaphore",
        "gerund": "semaphoring"
    },
    "rebate": {
        "past": "rebated",
        "participle": "rebated",
        "present_3s": "rebates",
        "present_non_3s": "rebate",
        "gerund": "rebating"
    },
    "delight": {
        "past": "delighted",
        "participle": "delighted",
        "present_3s": "delights",
        "present_non_3s": "delight",
        "gerund": "delighting"
    },
    "barrack": {
        "past": "barracked",
        "participle": "barracked",
        "present_3s": "barracks",
        "present_non_3s": "barrack",
        "gerund": "barracking"
    },
    "welter": {
        "past": "weltered",
        "participle": "weltered",
        "present_3s": "welters",
        "present_non_3s": "welter",
        "gerund": "weltering"
    },
    "drizzle": {
        "past": "drizzled",
        "participle": "drizzled",
        "present_3s": "drizzles",
        "present_non_3s": "drizzle",
        "gerund": "drizzling"
    },
    "plaster": {
        "past": "plastered",
        "participle": "plastered",
        "present_3s": "plasters",
        "present_non_3s": "plaster",
        "gerund": "plastering"
    },
    "pother": {
        "past": "pothered",
        "participle": "pothered",
        "present_3s": "pothers",
        "present_non_3s": "pother",
        "gerund": "pothering"
    },
    "garner": {
        "past": "garnered",
        "participle": "garnered",
        "present_3s": "garners",
        "present_non_3s": "garner",
        "gerund": "garnering"
    },
    "trumpet": {
        "past": "trumpeted",
        "participle": "trumpeted",
        "present_3s": "trumpets",
        "present_non_3s": "trumpet",
        "gerund": "trumpeting"
    },
    "sprinkle": {
        "past": "sprinkled",
        "participle": "sprinkled",
        "present_3s": "sprinkles",
        "present_non_3s": "sprinkle",
        "gerund": "sprinkling"
    },
    "crease": {
        "past": "creased",
        "participle": "creased",
        "present_3s": "creases",
        "present_non_3s": "crease",
        "gerund": "creasing"
    },
    "splay": {
        "past": "splayed",
        "participle": "splayed",
        "present_3s": "splays",
        "present_non_3s": "splay",
        "gerund": "splaying"
    },
    "forge": {
        "past": "forged",
        "participle": "forged",
        "present_3s": "forges",
        "present_non_3s": "forge",
        "gerund": "forging"
    },
    "pyramid": {
        "past": "pyramided",
        "participle": "pyramided",
        "present_3s": "pyramids",
        "present_non_3s": "pyramid",
        "gerund": "pyramiding"
    },
    "build": {
        "past": "built",
        "participle": "built",
        "present_3s": "builds",
        "present_non_3s": "build",
        "gerund": "building"
    },
    "scald": {
        "past": "scalded",
        "participle": "scalded",
        "present_3s": "scalds",
        "present_non_3s": "scald",
        "gerund": "scalding"
    },
    "photograph": {
        "past": "photographed",
        "participle": "photographed",
        "present_3s": "photographs",
        "present_non_3s": "photograph",
        "gerund": "photographing"
    },
    "cloister": {
        "past": "cloistered",
        "participle": "cloistered",
        "present_3s": "cloisters",
        "present_non_3s": "cloister",
        "gerund": "cloistering"
    },
    "honeycomb": {
        "past": "honeycombed",
        "participle": "honeycombed",
        "present_3s": "honeycombs",
        "present_non_3s": "honeycomb",
        "gerund": "honeycombing"
    },
    "bombard": {
        "past": "bombarded",
        "participle": "bombarded",
        "present_3s": "bombards",
        "present_non_3s": "bombard",
        "gerund": "bombarding"
    },
    "limber": {
        "past": "limbered",
        "participle": "limbered",
        "present_3s": "limbers",
        "present_non_3s": "limber",
        "gerund": "limbering"
    },
    "freckle": {
        "past": "freckled",
        "participle": "freckled",
        "present_3s": "freckles",
        "present_non_3s": "freckle",
        "gerund": "freckling"
    },
    "dither": {
        "past": "dithered",
        "participle": "dithered",
        "present_3s": "dithers",
        "present_non_3s": "dither",
        "gerund": "dithering"
    },
    "clarion": {
        "past": "clarioned",
        "participle": "clarioned",
        "present_3s": "clarions",
        "present_non_3s": "clarion",
        "gerund": "clarioning"
    },
    "drape": {
        "past": "draped",
        "participle": "draped",
        "present_3s": "drapes",
        "present_non_3s": "drape",
        "gerund": "draping"
    },
    "squint": {
        "past": "squinted",
        "participle": "squinted",
        "present_3s": "squints",
        "present_non_3s": "squint",
        "gerund": "squinting"
    },
    "triumph": {
        "past": "triumphed",
        "participle": "triumphed",
        "present_3s": "triumphs",
        "present_non_3s": "triumph",
        "gerund": "triumphing"
    },
    "harbour": {
        "past": "harboured",
        "participle": "harboured",
        "present_3s": "harbours",
        "present_non_3s": "harbour",
        "gerund": "harbouring"
    },
    "ditch": {
        "past": "ditched",
        "participle": "ditched",
        "present_3s": "ditches",
        "present_non_3s": "ditch",
        "gerund": "ditching"
    },
    "interlock": {
        "past": "interlocked",
        "participle": "interlocked",
        "present_3s": "interlocks",
        "present_non_3s": "interlock",
        "gerund": "interlocking"
    },
    "empty": {
        "past": "emptied",
        "participle": "emptied",
        "present_3s": "empties",
        "present_non_3s": "empty",
        "gerund": "emptying"
    },
    "poise": {
        "past": "poised",
        "participle": "poised",
        "present_3s": "poises",
        "present_non_3s": "poise",
        "gerund": "poising"
    },
    "cobble": {
        "past": "cobbled",
        "participle": "cobbled",
        "present_3s": "cobbles",
        "present_non_3s": "cobble",
        "gerund": "cobbling"
    },
    "squinch": {
        "past": "squinched",
        "participle": "squinched",
        "present_3s": "squinches",
        "present_non_3s": "squinch",
        "gerund": "squinching"
    },
    "ejaculate": {
        "past": "ejaculated",
        "participle": "ejaculated",
        "present_3s": "ejaculates",
        "present_non_3s": "ejaculate",
        "gerund": "ejaculating"
    },
    "treadle": {
        "past": "treadled",
        "participle": "treadled",
        "present_3s": "treadles",
        "present_non_3s": "treadle",
        "gerund": "treadling"
    },
    "retread": {
        "past": "retreaded",
        "participle": "retreaded",
        "present_3s": "retreads",
        "present_non_3s": "retread",
        "gerund": "retreading"
    },
    "railroad": {
        "past": "railroaded",
        "participle": "railroaded",
        "present_3s": "railroads",
        "present_non_3s": "railroad",
        "gerund": "railroading"
    },
    "fagot": {
        "past": "fagoted",
        "participle": "fagoted",
        "present_3s": "fagots",
        "present_non_3s": "fagot",
        "gerund": "fagoting"
    },
    "fracture": {
        "past": "fractured",
        "participle": "fractured",
        "present_3s": "fractures",
        "present_non_3s": "fracture",
        "gerund": "fracturing"
    },
    "plumb": {
        "past": "plumbed",
        "participle": "plumbed",
        "present_3s": "plumbs",
        "present_non_3s": "plumb",
        "gerund": "plumbing"
    },
    "laminate": {
        "past": "laminated",
        "participle": "laminated",
        "present_3s": "laminates",
        "present_non_3s": "laminate",
        "gerund": "laminating"
    },
    "clinch": {
        "past": "clinched",
        "participle": "clinched",
        "present_3s": "clinchs",
        "present_non_3s": "clinch",
        "gerund": "clinching"
    },
    "tomahawk": {
        "past": "tomahawked",
        "participle": "tomahawked",
        "present_3s": "tomahawks",
        "present_non_3s": "tomahawk",
        "gerund": "tomahawking"
    },
    "bandage": {
        "past": "bandaged",
        "participle": "bandaged",
        "present_3s": "bandages",
        "present_non_3s": "bandage",
        "gerund": "bandaging"
    },
    "temper": {
        "past": "tempered",
        "participle": "tempered",
        "present_3s": "tempers",
        "present_non_3s": "temper",
        "gerund": "tempering"
    },
    "ready": {
        "past": "readied",
        "participle": "readied",
        "present_3s": "readies",
        "present_non_3s": "ready",
        "gerund": "readying"
    },
    "choke": {
        "past": "choked",
        "participle": "choked",
        "present_3s": "chokes",
        "present_non_3s": "choke",
        "gerund": "choking"
    },
    "shift": {
        "past": "shifted",
        "participle": "shifted",
        "present_3s": "shifts",
        "present_non_3s": "shift",
        "gerund": "shifting"
    },
    "shear": {
        "past": "sheared",
        "participle": "sheared",
        "present_3s": "shears",
        "present_non_3s": "shear",
        "gerund": "shearing"
    },
    "bristle": {
        "past": "bristled",
        "participle": "bristled",
        "present_3s": "bristles",
        "present_non_3s": "bristle",
        "gerund": "bristling"
    },
    "scorch": {
        "past": "scorched",
        "participle": "scorched",
        "present_3s": "scorches",
        "present_non_3s": "scorch",
        "gerund": "scorching"
    },
    "spangle": {
        "past": "spangled",
        "participle": "spangled",
        "present_3s": "spangles",
        "present_non_3s": "spangle",
        "gerund": "spangling"
    },
}