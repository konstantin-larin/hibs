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
                if (max < part.hits) {
                    max = part.hits;
                }
            }
        }
        return max;
    }

    getHitsSum() {
        let sum = 0;
        for (let part of this.parts) {
            if (part instanceof Train) {
                sum += part.hits;
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

    constructor({name, min, max, value, addValue = ''} = {}) {
        this.name = name;
        this.min = min;
        this.max = max;
        this.value = value;
        this.addValue = addValue;
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
        this.hits = part.hits ?? new RangeValue({
            name: "Количество ударов",
            min: 100,
            max: 10000,
            value: 500,
            addValue: 'уд.'
        });
        this.hand = part.hand ?? new ListValue({
            name: "Руку",
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
                {value: "L9", label: "L9"},
                {value: "R1", label: "R1"},
                {value: "R2", label: "R2"},
                {value: "R3", label: "R3"},
                {value: "R4", label: "R4"},
                {value: "R5", label: "R5"},
                {value: "R6", label: "R6"},
                {value: "R7", label: "R7"},
                {value: "R8", label: "R8"},
                {value: "R9", label: "R9"},
            ],
        })
        this.ringBefore = part.ringBefore ?? new RangeValue({
            name: "Кольцо до",
            addValue: "",
            value: 30,
            min: 10,
            max: 100,
        })
        this.ringAfter = part.ringAfter ?? new RangeValue({
            name: "Кольцо после",
            value: 20,
            min: 10,
            max: 100,
        })

        this.swing = part.swing ?? new RangeValue({
            name: "Замах",
            value: 16,
            min: 1,
            max: 20,
        })
        this.speed = part.speed ?? new ConstantValue({
            name: "Скорость",
            value: (MAX_SPEED + MIN_SPEED) / 2,
        })

        this.delay = part.delay ?? new RangeValue({
            name: "Задержка",
            addValue: "сек.",
            min: 0,
            value: 1.5,
            max: 10,
        });
    }
}

export class BaseTrain extends Train {
    static name = 'Базовая';
    static keys = ["hits", "hand", "target", "ringBefore", "ringAfter", "swing", "speed", "delay"];
    _coefficient = 0.6;

    getEnergy() {
        return Math.round(this._coefficient * (this.hits.value * this.speed.value ** 2) / 2);
    }
    constructor(part = {}) {
        super(part);
    }
}

export class PowerTrain extends Train {
    static name = 'Силовая';
    static keys = ["hits", "hand", "target", "ringBefore", "ringAfter", "swing", "speed", "delay"];
    _coefficient = 0.4;

    getEnergy() {
        return Math.round(this._coefficient * (this.hits.value * this.speed.value ** 2) / 2);
    }

    constructor(part = {}) {
        super(part);
    }
}

export class ControlSpeedTrain extends Part {
    constructor(part = {}) {
        super(part);
    }
}

export class FTP extends Part {
    constructor(part = {}) {
        super(part);
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


export const PARTS_TYPES = [BaseTrain, PowerTrain, Pause];