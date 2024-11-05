import {useStore} from "./store.js";

export default class Counselor {
    constructor(id, maxCapacity, priorityId) {
        this.id = id;
        this.maxCapacity = maxCapacity;
        this.priorityId = priorityId;
    }

    get clientCount() {
        return useStore().clients.filter(client => client.counselorId === this.id).length;
    }

    get relativeCapacity() {
        return 1 - this.clientCount / this.maxCapacity;
    }

    get priority() {
        return useStore().priorities.find(priority => priority.id === this.priorityId);
    }

    get relativePriority() {
        return this.priority.value * this.relativeCapacity;
    }

    get relativePriorityRounded() {
        return Math.round(this.relativePriority * 100) / 100;
    }

    get isAvailable() {
        return this.clientCount < this.maxCapacity;
    }
}
