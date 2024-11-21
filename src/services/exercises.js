// это data-классы
//вообще по хорошему все надо на TS перевести, но пока не будем, ждем бэк

export class Exercise {
    constructor({
                    id = +new Date(),
                    name = '',
                    shortName = '',
                    description = '',
                    parts = []
                } = {}) {
        this.id = id;
        this.name = name;
        this.shortName = shortName;
        this.description = description;
        this.parts = [...parts];

    }

    getMaxHits() {
        let max = 0;
        for (let part of this.parts) {
            if (part instanceof Train) {
                if (max < part.hits.value) {
                    max = part.hits.value;
                }
            }
        }
        return max;
    }

    getHitsSum() {
        let sum = 0;
        for (let part of this.parts) {
            if (part instanceof Train) {
                sum += part.hits.value;
            }
        }

        return sum;
    }

    getMaxEnergy() {
        let max = 0;
        for (let part of this.parts) {
            if (part instanceof Train) {
                const energy = part.getEnergy();
                if (max < energy) {
                    max = energy;
                }
            }
        }
        return max;
    }
}


const MAX_HITS = 10000;
const MIN_SPEED = 3;
const MAX_SPEED = 40;


// ЗНАЧЕНИЯ
export class ListValue {

    constructor({name, items = [{label: "", value: 1}], currentItem}) {
        this.name = name;
        this.items = items;
        this.currentItem = currentItem ?? items[0];
    }
}

export class RangeValue {
    min = 0;
    max = 100;

    constructor({name, min, max, value, addValue = '', decimals = 0} = {}) {
        this.name = name;
        this.min = min;
        this.max = max;
        this.value = value;
        this.addValue = addValue;
        this.decimals = decimals;
    }
}

export class ConstantValue {
    constructor({name, value}) {
        this.name = name;
        this.value = value;
    }
}

// ТИПЫ

export class Part {
    constructor(part = {}) {
        this.id = part.id ?? +new Date(); //чтобы не терялся идентификатор
    }

    getParam(key) {
        return this[key];
    }
}

export class Train extends Part {
    constructor(part = {}) {
        super(part);
        this.hand = part.hand ?? new ListValue({
            name: "Рука",
            items: [{label: "Правая", value: "RIGHT"}, {label: "Левая", value: "LEFT"}],
        });
        this.target = part.target ?? new ListValue({
            name: "Мишень",
            items: [
                {value: "L1", label: "L1"},
                {value: "L2", label: "L2"},
                {value: "L3", label: "L3"},
                {value: "L4", label: "L4"},
                {value: "L5", label: "L5"},
                {value: "L6", label: "L6"},
                {value: "L7", label: "L7"},
                {value: "L8", label: "L8"},
                {value: "R1", label: "R1"},
                {value: "R2", label: "R2"},
                {value: "R3", label: "R3"},
                {value: "R4", label: "R4"},
                {value: "R5", label: "R5"},
                {value: "R6", label: "R6"},
                {value: "R7", label: "R7"},
                {value: "R8", label: "R8"},
            ],
        })
        this.ringBefore = part.ringBefore ?? new ListValue({
            name: "Кольцо до",
            items: [
                {
                    label: "О20",
                    value: "О20",
                },
                {
                    label: "О30",
                    value: "О30",
                },
                {
                    label: "U20",
                    value: "U20",
                },
                {
                    label: "U30",
                    value: "U30",
                },
                {
                    label: "^20",
                    value: "^20",
                },
                {
                    label: "^30",
                    value: "^30",
                },
                {
                    label: "_20",
                    value: "_20",
                },
                {
                    label: "_30",
                    value: "_30",
                },
                {
                    label: "20",
                    value: "20",
                },
                {
                    label: "30",
                    value: "30",
                },
            ]
        })
        this.ringAfter = part.ringAfter ?? new ListValue({
            name: "Кольцо после",
            items: [
                {
                    label: "О20",
                    value: "О20",
                },
                {
                    label: "О30",
                    value: "О30",
                },
                {
                    label: "U20",
                    value: "U20",
                },
                {
                    label: "U30",
                    value: "U30",
                },
                {
                    label: "^20",
                    value: "^20",
                },
                {
                    label: "^30",
                    value: "^30",
                },
                {
                    label: "_20",
                    value: "_20",
                },
                {
                    label: "_30",
                    value: "_30",
                },
                {
                    label: "20",
                    value: "20",
                },
                {
                    label: "30",
                    value: "30",
                },
            ]
        })

        this.swing = part.swing ?? new ListValue({
            name: "Замах",
            items: [
                {
                    label: 5,
                    value: 5,
                },
                {
                    label: 10,
                    value: 10,
                },
                {
                    label: 20,
                    value: 20,
                },
                {
                    label: 25,
                    value: 25,
                },
                {
                    label: 30,
                    value: 30,
                },
                {
                    label: 35,
                    value: 35,
                },
                {
                    label: 40,
                    value: 40,
                },
                {
                    label: 45,
                    value: 45,
                },
                {
                    label: 50,
                    value: 50,
                },
            ]
        })
    }
}

export class BaseTrain extends Train {
    static name = 'Базовая';
    static keys = ["hits", "hand", "target", "ringBefore", "ringAfter", "swing", "speed", "delay"];
    _coefficient = 0.6;

    getEnergy() {
        return Math.round(this._coefficient * (this.hits.value) / 2);
    }
    constructor(part = {}) {
        super(part);
        this.hits = part.hits ?? new RangeValue({
            name: "Количество ударов",
            min: 100,
            max: 10000,
            value: 500,
            addValue: 'уд.'
        });


        this.speed = part.speed ?? new ConstantValue({
            name: "Скорость",
            value: 20,
        })

        this.delay = part.delay ?? new RangeValue({
            name: "Задержка",
            addValue: "сек.",
            min: 0,
            value: 1.5,
            max: 3,
            decimals: 1,
        });
    }
}

export class PowerTrain extends BaseTrain {
    static name = 'Силовая';
    static keys = ["hits", "hand", "target", "ringBefore", "ringAfter", "swing", "speed", "delay"];
    _coefficient =1;

    constructor(part = {}) {
        super(part);
    }
}

export class ControlSpeedTrain extends Train {
    static name = "Контроль скорости";
    static keys =
        ["hits", "hand", "target", "ringBefore", "ringAfter", "swing", "step", "startSpeed", "endSpeed", "delay"];

    _coefficient = 0.4;

    getEnergy() {
        return Math.round(this._coefficient * (this.hits.value) / 2);
    }
    constructor(part = {}) {
        super(part);
        this.hits = part.hits ?? new RangeValue({
            name: "Количество ударов",
            min: 100,
            max: 10000,
            value: 500,
            addValue: 'уд.'
        });

        this.step = part.step ?? new RangeValue({
            name: "Шаг изменения скорости",
            min: MIN_SPEED,
            max: MAX_SPEED,
            value: MIN_SPEED,
        });

        this.startSpeed = part.startSpeed ?? new ConstantValue({
            name: "Начальная скорость",
            value: MIN_SPEED,
        })

        this.endSpeed = part.endSpeed ?? new ConstantValue({
            name: "Конечная скорость",
            value: 18,
        })

        this.delay = part.delay ?? new RangeValue({
            name: "Задержка",
            addValue: "сек.",
            min: 0,
            value: 1.5,
            max: 3,
            decimals: 1,
        });
    }
}

export class FTP300 extends Train {
    static name = "FTP 300";
    static keys = ['hits','time', "hand", "target", "ringBefore", "ringAfter", "swing", "speed",  'delay']
    _coefficient = 0.5;

    getEnergy() {
        return Math.round(this._coefficient * (this.hits.value) / 2);
    }
    constructor(part = {}) {
        super(part);
        this.hits = new ConstantValue({name: "Количество ударов", value: MAX_HITS})
        this.time = new ConstantValue({name: "Время", value: "300 сек."});
        this.speed = new ConstantValue({name: "Скорость", value: 12})
        this.delay = new ConstantValue({name: "Задержка", value: "0 сек."});
    }
}

export class FTP3Min extends Train{
    static name = "FTP 3 min";
    static keys = ['hits','time', "hand", "target", "ringBefore", "ringAfter", "swing",  "speed", 'delay'];
    _coefficient = 0.5;

    getEnergy() {
        return Math.round(this._coefficient * (this.hits.value) / 2);
    }
    constructor(part = {}) {
        super(part);
        this.hits = new ConstantValue({name: "Количество ударов", value: MAX_HITS})
        this.time = new ConstantValue({name: "Время", value: "3 мин."});
        this.speed = new ConstantValue({name: "Скорость", value: 12})
        this.delay = new ConstantValue({name: "Задержка", value: "0 сек."});

    }
}
export class Pause extends Part {
    static name = 'Пауза';
    static keys = ['pause'];
    constructor(part = {}) {
        super(part);
        this.pause = part.pause ?? new RangeValue({
            name: "Время",
            value: 10,
            min: 1,
            max: 20,
            addValue: "сек.",
        });
    }
}


export const PARTS_TYPES = [BaseTrain, PowerTrain, ControlSpeedTrain, FTP3Min, FTP300, Pause];