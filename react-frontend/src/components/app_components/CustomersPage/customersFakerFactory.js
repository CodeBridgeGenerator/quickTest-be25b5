
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
firstName: faker.datatype.number(""),
lastName: faker.datatype.number(""),
email: faker.datatype.number(""),
phoneNumber: faker.datatype.number(""),
address: faker.datatype.number(""),
joinDate: faker.datatype.number(""),
loyaltyPoints: faker.datatype.number(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
