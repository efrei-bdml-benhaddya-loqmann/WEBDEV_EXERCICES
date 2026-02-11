class Car {
    id = null
    model = {
        "name": "",
        "brand": "",
        "modeleId": null,
        "serialNumber": null,
        "topSpeed": null
    }
    owner = {
        "firstName": "",
        "lastName": "",
        "age": null
    }

    constructor(id, modelName, ownerFirstName, ownerLastName, age = 0, topSpeed = 0, brand = "", modeleId = null, serialNumber = null) {
        this.id = id
        this.model.name = modelName
        this.owner.firstName = ownerFirstName
        this.owner.lastName = ownerLastName
        this.owner.age = age
        this.model.topSpeed = topSpeed
        this.model.brand = brand
        this.model.modeleId = modeleId
        this.model.serialNumber = serialNumber
    }

    printEssentialCarInfos() {
        console.log(`
            Id de la voiture : ${this.id},
            Modèle de la voiture : ${this.model.name}
            Propriétaire : ${this.owner.firstName} ${this.owner.lastName}
            Age du propriétaire : ${this.owner.age}
            `)
    }

    static sayHello() {
        console.log("Hello! I am from the Car class !")
    }
}

export default Car