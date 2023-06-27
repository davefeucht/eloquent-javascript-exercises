const utils = require('./utils');

class VillageState {
    constructor(place, parcels, roadGraph) {
        this.place = place;
        this.parcels = parcels;
        this.roadGraph = roadGraph;
    }

    move(destination) {
        if (!this.roadGraph.get(this.place).includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels.map(parcel => {
                if (parcel.place !== this.place) {
                    return parcel;
                }
                return {place: destination, address: parcel.address};
            }).filter(parcel => parcel.place !== parcel.address);

            return new VillageState(destination, parcels, this.roadGraph);
        }
    }

    random(parcelCount = 5) {
        const parcels = [];
        for (let i = 0; i < parcelCount; i++) {
            const address = utils.randomPick(Array.from(this.roadGraph.keys()));
            let place;
            do {
                place = utils.randomPick(Array.from(this.roadGraph.keys()));
            } while (place === address);

            parcels.push({place, address});
        }
        return new VillageState("Post Office", parcels, this.roadGraph);
    }
};

module.exports = {
    VillageState
};
