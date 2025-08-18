export const SEEDS = {
    subjects: [
        {
            term: "THE_SUN",
            reinforces: ["FIRE", "LIGHT"],
            conflicts: ["SHADOWS", "THE_VOID"]
        },
        {
            term: "FIRE",
            reinforces: ["THE_SUN", "ASH"],
            conflicts: ["WATER", "SILENCE"]
        },
        {
            term: "THE_VOID",
            reinforces: ["SHADOWS", "DUST", "CHAOS", "HIDES"],
            conflicts: ["THE_RULE", "THE_NAME", "TRUTH"]
        },
        {
            term: "TOUCH",
            reinforces: ["THE_BODY", "SKIN"],
            conflicts: ["SILENCE", "THE_VOID"]
        },
        {
            term: "WORDS",
            reinforces: ["THE_NAME", "TRUTH", "SPEAKS"],
            conflicts: ["SILENCE", "THE_RULE", "HIDES"]
        },
        {
            term: "THE_MOON",
            reinforces: ["SHADOWS", "DREAMS"],
            conflicts: ["THE_SUN", "LIGHT"]
        },
        {
            term: "GLASS",
            reinforces: ["THE_MIRROR", "LIGHT"],
            conflicts: ["DUST", "ASH"]
        },
        {
            term: "SILENCE",
            reinforces: ["THE_VOID", "DREAMS"],
            conflicts: ["WORDS", "SPEAKS", "SHOUTS"]
        },
        {
            term: "SHADOWS",
            reinforces: ["THE_MOON", "THE_VOID"],
            conflicts: ["THE_SUN", "THE_EYE"]
        },
        {
            term: "ECHOES",
            reinforces: ["SILENCE", "MEMORY"],
            conflicts: ["TRUTH", "CONTROL"]
        },
        {
            term: "BLOOD",
            reinforces: ["THE_BODY", "CONTROL"],
            conflicts: ["LIGHT", "THE_MIRROR"]
        },
        {
            term: "THE_MIRROR",
            reinforces: ["GLASS", "THE_SELF"],
            conflicts: ["DUST", "THE_OTHER"]
        },
        {
            term: "TIME",
            reinforces: ["MEMORY", "PATTERNS"],
            conflicts: ["THE_RULE", "THE_END"]
        },
        {
            term: "THE_WIND",
            reinforces: ["THE_VOID", "ECHOES", "FREEDOM"],
            conflicts: ["CONTROL", "THE_BODY"]
        },
        {
            term: "DREAMS",
            reinforces: ["THE_MOON", "THE_SELF", "FREEDOM"],
            conflicts: ["THE_RULE", "REALITY"]
        },
        {
            term: "THE_EYE",
            reinforces: ["LIGHT", "TRUTH"],
            conflicts: ["SHADOWS", "FEAR"]
        },
        {
            term: "BONES",
            reinforces: ["THE_BODY", "ASH"],
            conflicts: ["TOUCH", "WATER"]
        },
        {
            term: "THE_NAME",
            reinforces: ["WORDS", "CONTROL"],
            conflicts: ["THE_VOID", "DUST"]
        },
        {
            term: "ASH",
            reinforces: ["FIRE", "BONES"],
            conflicts: ["WATER", "SKIN"]
        },
        {
            term: "WATER",
            reinforces: ["THE_WIND", "DREAMS"],
            conflicts: ["FIRE", "ASH"]
        },
        {
            term: "CHAOS",
            reinforces: ["DISRUPTS", "THE_VOID", "DESTROYS"],
            conflicts: ["THE_RULE", "CONTROL"]
        },
        {
            term: "FREEDOM",
            reinforces: ["THE_WIND", "DREAMS"],
            conflicts: ["CONTROL", "THE_RULE"]
        }
    ],

    verbs: [
        {
            term: "SEEKS",
            reinforces: ["FOLLOWS", "EMBRACES"],
            conflicts: ["FORGETS", "FADES"]
        },
        {
            term: "DEVOURS",
            reinforces: ["DISRUPTS", "BLEEDS"],
            conflicts: ["SHELTERS", "CONTAINS"]
        },
        {
            term: "WHISPERS",
            reinforces: ["LISTENS", "REMEMBERS"],
            conflicts: ["SHOUTS", "FORGETS"]
        },
        {
            term: "CREATES",
            reinforces: ["OPENS", "CONTAINS"],
            conflicts: ["DESTROYS", "DISRUPTS"]
        },
        {
            term: "CONTAINS",
            reinforces: ["CONTROL", "SHELTERS"],
            conflicts: ["REVEALS", "DISRUPTS", "FREEDOM"]
        },
        {
            term: "REVEALS",
            reinforces: ["TRUTH", "THE_EYE"],
            conflicts: ["CONTAINS", "HIDES"]
        },
        {
            term: "REMEMBERS",
            reinforces: ["MEMORY", "PATTERNS"],
            conflicts: ["FORGETS", "FADES"]
        },
        {
            term: "FOLLOWS",
            reinforces: ["SEEKS", "REPEATS"],
            conflicts: ["DISRUPTS", "TWISTS"]
        },
        {
            term: "FORGETS",
            reinforces: ["THE_VOID", "DUST"],
            conflicts: ["REMEMBERS", "TRUTH"]
        },
        {
            term: "TWISTS",
            reinforces: ["MIRRORS", "REPEATS"],
            conflicts: ["CONTAINS", "THE_RULE"]
        },
        {
            term: "REPEATS",
            reinforces: ["PATTERNS", "TIME"],
            conflicts: ["DISRUPTS", "FADES"]
        },
        {
            term: "CARRIES",
            reinforces: ["CONTROL", "THE_BODY"],
            conflicts: ["FADES", "FORGETS"]
        },
        {
            term: "DISRUPTS",
            reinforces: ["CHAOS", "DEVOURS"],
            conflicts: ["REPEATS", "CONTAINS"]
        },
        {
            term: "OPENS",
            reinforces: ["REVEALS", "DREAMS"],
            conflicts: ["CONTAINS", "CLOSES"]
        },
        {
            term: "BLEEDS",
            reinforces: ["BLOOD", "ASH"],
            conflicts: ["SHELTERS", "CARRIES"]
        },
        {
            term: "MIRRORS",
            reinforces: ["GLASS", "THE_SELF"],
            conflicts: ["THE_OTHER", "TWISTS"]
        },
        {
            term: "SHELTERS",
            reinforces: ["CONTAINS", "THE_BODY"],
            conflicts: ["DEVOURS", "DESTROYS"]
        },
        {
            term: "LISTENS",
            reinforces: ["WHISPERS", "SILENCE"],
            conflicts: ["SPEAKS", "REPEATS"]
        },
        {
            term: "FADES",
            reinforces: ["THE_VOID", "ASH"],
            conflicts: ["SEEKS", "REMEMBERS"]
        },
        {
            term: "EMBRACES",
            reinforces: ["SEEKS", "TOUCH"],
            conflicts: ["FORGETS", "TWISTS"]
        },
        {
            term: "SPEAKS",
            reinforces: ["WORDS", "THE_NAME"],
            conflicts: ["SILENCE", "LISTENS"]
        },
        {
            term: "CLOSES",
            reinforces: ["CONTAINS", "THE_RULE"],
            conflicts: ["OPENS", "REVEALS"]
        },
        {
            term: "HIDES",
            reinforces: ["THE_VOID", "DUST"],
            conflicts: ["REVEALS", "TRUTH"]
        },
        {
            term: "DESTROYS",
            reinforces: ["DEVOURS", "DISRUPTS", "CHAOS"],
            conflicts: ["CREATES", "SHELTERS"]
        },
        {
            term: "SHOUTS",
            reinforces: ["THE_NAME", "POWER"],
            conflicts: ["WHISPERS", "SILENCE"]
        }
    ],

    objects: [
        {
            term: "TRUTH",
            reinforces: ["THE_EYE", "THE_NAME"],
            conflicts: ["FORGETS", "THE_VOID", "HIDES"]
        },
        {
            term: "FEAR",
            reinforces: ["CONTROL", "BLOOD"],
            conflicts: ["HOPE", "LIGHT"]
        },
        {
            term: "NAMES",
            reinforces: ["WORDS", "THE_NAME"],
            conflicts: ["DUST", "FORGETS"]
        },
        {
            term: "REALITY",
            reinforces: ["THE_RULE", "CONTROL"],
            conflicts: ["DREAMS", "THE_VOID"]
        },
        {
            term: "POWER",
            reinforces: ["CONTROL", "THE_RULE"],
            conflicts: ["THE_VOID", "FREEDOM"]
        },
        {
            term: "SILENCE",
            reinforces: ["THE_VOID", "LISTENS"],
            conflicts: ["WORDS", "TRUTH", "SPEAKS", "SHOUTS"]
        },
        {
            term: "THE_BODY",
            reinforces: ["TOUCH", "SKIN"],
            conflicts: ["THE_VOID", "ASH"]
        },
        {
            term: "THE_SELF",
            reinforces: ["THE_MIRROR", "DREAMS"],
            conflicts: ["THE_OTHER", "CONTROL"]
        },
        {
            term: "HOPE",
            reinforces: ["LIGHT", "DREAMS"],
            conflicts: ["FEAR", "THE_END"]
        },
        {
            term: "ECHOES",
            reinforces: ["MEMORY", "SILENCE"],
            conflicts: ["CONTROL", "THE_RULE"]
        },
        {
            term: "REGRET",
            reinforces: ["MEMORY", "DUST"],
            conflicts: ["HOPE", "LIGHT"]
        },
        {
            term: "CONTROL",
            reinforces: ["POWER", "THE_RULE"],
            conflicts: ["THE_WIND", "FREEDOM", "CHAOS"]
        },
        {
            term: "THE_END",
            reinforces: ["ASH", "SILENCE"],
            conflicts: ["DREAMS", "TIME"]
        },
        {
            term: "PATTERNS",
            reinforces: ["REPEATS", "TIME"],
            conflicts: ["DISRUPTS", "CHAOS"]
        },
        {
            term: "THE_OTHER",
            reinforces: ["SHADOWS", "MIRRORS"],
            conflicts: ["THE_SELF", "THE_NAME"]
        },
        {
            term: "DUST",
            reinforces: ["ASH", "THE_VOID"],
            conflicts: ["NAMES", "THE_MIRROR"]
        },
        {
            term: "SKIN",
            reinforces: ["TOUCH", "THE_BODY"],
            conflicts: ["ASH", "BONES"]
        },
        {
            term: "LIGHT",
            reinforces: ["THE_SUN", "THE_EYE"],
            conflicts: ["SHADOWS", "FEAR"]
        },
        {
            term: "MEMORY",
            reinforces: ["REMEMBERS", "TIME"],
            conflicts: ["FORGETS", "THE_VOID"]
        },
        {
            term: "THE_RULE",
            reinforces: ["CONTROL", "POWER"],
            conflicts: ["DISRUPTS", "THE_VOID", "FREEDOM"]
        },
        {
            term: "CHAOS",
            reinforces: ["DISRUPTS", "DEVOURS"],
            conflicts: ["PATTERNS", "CONTROL"]
        },
        {
            term: "FREEDOM",
            reinforces: ["DREAMS", "THE_WIND"],
            conflicts: ["CONTROL", "THE_RULE"]
        }
    ]
};
