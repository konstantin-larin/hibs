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
            if(part instanceof Train){
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
            if(part instanceof Train){
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
    list = [];

    constructor({name, list, currentIndex = 0}) {
        this.name = name;
        this.list = list;
        this.current = this.list[currentIndex];
    }
}

export class RangeValue {
    min = 0;
    max = 100;

    constructor({name, min, max, value} = {}) {
        this.name = name;
        this.min = min;
        this.max = max;
        this.value = value;
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
        for (let key of Object.keys(part)) {
            const insertedValue = part[key];
            const obj = this["_" + key];
            if (!obj) continue;

            if (obj instanceof ListValue) {
                if (obj.list.includes(insertedValue)) {
                    obj.value = insertedValue;
                } else throw new Error("такого значения нет");
            }

            if (obj instanceof RangeValue) {
                if (insertedValue < obj.min || insertedValue > obj.max) throw new Error("вышел за пределы");
                obj.value = insertedValue;
            }
        }
    }

    getParam(key) {
        return this['_' + key];
    }
}

export class Train extends Part{}

export class BaseTrain extends Train {
    static type = 'Базовая';
    static keys = ["hits", "hand", "target", "ringBefore", "ringAfter", "swing", "speed", "delay"];
    _coefficient = 0.6;
    hits = new RangeValue({name: "Количество ударов", min: 100, max: 10000, value: 100});
    hand = new ListValue({name: "Рука", list: ['Правая', "Левая"], currentIndex: 0});
    target = new ListValue({
        name: "Мишень",
        list: ["L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8", "L9", "0", "R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9",],
        currentIndex: 0
    })
    ringBefore = new RangeValue({
        name: "Кольцо до",
        value: 30,
        min: 10,
        max: 100,
    })
    ringAfter = new RangeValue({
        name: "Кольцо после",
        value: 20,
        min: 10,
        max: 100,
    })

    swing = new RangeValue({
        name: "Замах",
        value: 16,
        min: 1,
        max: 20,
    })
    speed = new ConstantValue({
        name: "Скорость",
        value: (MAX_SPEED + MIN_SPEED) / 2,
    })

    delay = new RangeValue({
        name: "Задержка",
        min: 0,
        value: 1.5,
        max: 10,
    })

    getEnergy() {
        return Math.round(this._coefficient * (this.hits.value * this.speed.value ** 2) / 2);
    }
}

export class PowerTrain extends Part {
    static type = 'Силовая';
    static keys = ["hits", "hand", "target", "ringBefore", "ringAfter", "swing", "speed", "delay"];
    _coefficient = 0.4;
    hits = new RangeValue({name: "Количество ударов", min: 100, max: 10000, value: 100});
    hand = new ListValue({name: "Рука", list: ['Правая', "Левая"], currentIndex: 0});
    target = new ListValue({
        name: "Мишень",
        list: ["L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8", "L9", "0", "R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9",],
        currentIndex: 0
    })
    ringBefore = new RangeValue({
        name: "Кольцо до",
        value: 30,
        min: 10,
        max: 100,
    })
    ringAfter = new RangeValue({
        name: "Кольцо после",
        value: 20,
        min: 10,
        max: 100,
    })

    swing = new RangeValue({
        name: "Замах",
        value: 16,
        min: 1,
        max: 20,
    })
    speed = new ConstantValue({
        name: "Скорость",
        value: (MAX_SPEED + MIN_SPEED) / 2,
    })

    delay = new RangeValue({
        name: "Задержка",
        min: 0,
        value: 1.5,
        max: 10,
    })

    getEnergy() {
        return Math.round(this._coefficient * (this.hits.value * this.speed.value ** 2) / 2);
    }
}

export class ControlSpeedTrain extends Part {

}

export class FTP extends Part {

}

export class Pause extends Part {
    pause = new RangeValue({name: "Время", value: 10, min: 1, max: 20});
}


export const PARTS = [BaseTrain, PowerTrain, Pause];