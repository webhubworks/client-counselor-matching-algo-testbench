import {defineStore} from 'pinia'
import Client from "./Client.js";
import Counselor from "./Counselor.js";

export const useStore = defineStore('store', {
    state: () => ({
        clients: [],
        counselors: [
            new Counselor(1, 10, 1),
            new Counselor(2, 20, 2),
            new Counselor(3, 15, 1),
            new Counselor(4, 10, 3),
            new Counselor(5, 30, 2),
            new Counselor(6, 10, 3),
            new Counselor(7, 10, 1),
            new Counselor(8, 20, 2),
            new Counselor(9, 5, 2),
            new Counselor(10, 10, 2),
        ],
        priorities: [{
            id: 1,
            name: 'High',
            value: 0.6,
        }, {
            id: 2,
            name: 'Medium',
            value: 0.25,
        }, {
            id: 3,
            name: 'Low',
            value: 0.15,
        }]
    }),
    getters: {
        sortedCounselors: (state) => state.counselors.sort((a, b) => b.priority.value - a.priority.value)
    },
    actions: {
        generateClient() {
            try {
                this.clients.push(new Client(
                    this.clients.length + 1,
                    this.getCounselorForClient().id
                ))
            } catch (e) {
                alert(e.message);
            }
        },
        getCounselorForClient() {
            const availableCounselors = this.counselors
                .filter(counselor => counselor.isAvailable);

            if (availableCounselors.length === 0) {
                throw new Error('No counselors available');
            }

            if (availableCounselors.length === 1) {
                return availableCounselors[0];
            }

            let counselorPot = [];
            availableCounselors.forEach(counselor => {
                const counselorLotCount = Math.round(counselor.relativePriority * 100);
                counselorPot.push(...Array(counselorLotCount).fill(counselor.id));
            });

            const theChosenOne = counselorPot[Math.floor(Math.random() * counselorPot.length)];

            return availableCounselors.find(counselor => counselor.id === theChosenOne);
        }
    },
})
