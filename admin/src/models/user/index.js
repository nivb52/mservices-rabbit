import dbConnection from '../../server/db'

export const create = async function(user_data) {
    const db = await dbConnection;
    return db.user.create({
        data: {
            firstName: user_data.firstName,
            lastName: user_data.lastName,
            email: user_data.email,
        }
    });
}