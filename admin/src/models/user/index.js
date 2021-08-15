import dbConnection from '../../server/db'

export const create = async function(userData) {
    const db = await dbConnection;
    return db.user.create({
        data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
        }
    });
}

export const updateById = async function (id, newData) {
    if (newData.email) {
        throw new Error('this field cannot be edited')
    }
    const parsedId = Number.parseInt(id)
    if (!parsedId) throw new Error('not valid')
    const db = await dbConnection;
    return db.user.update({
        where: {
            id: parsedId,
        },
        data: {
            firstName: newData.firstName,
            lastName: newData.lastName,
        }
    });
}


export const deleteById = async function (id) {
    const parsedId = Number.parseInt(id)
    if (!parsedId) throw new Error('not valid')
    const db = await dbConnection;
    return db.user.delete({
        where: {
            id: parsedId,
        },
    });
}

export const deleteByEmail = async function (email) {
    const db = await dbConnection;
    return db.user.delete({
        where: {
            email: email,
        },
    });
}

export const findById = async function (id) {
    const parsedId = Number.parseInt(id)
    if (!parsedId) throw new Error('not valid')
    const db = await dbConnection;
    return db.user.findUnique({
        where: {
            id: parsedId,
        },
    });
}

export const findOne = async function ({ where, orderBy = {} },  isUnique = true) {
    const db = await dbConnection;
    const searchData = { where: { where }, orderBy: { ...orderBy, id: 'asc' } }
     if (isUnique) {
        return db.user.findUnique({
            searchData,
        });
      } else {
        return db.user.findFirst({
            searchData,
        });
    }
};
export const findMany = async function ({ where, orderBy = {} }, limit = 10) {
    const db = await dbConnection;
    const searchData = { where: { where }, orderBy: { ...orderBy, id: 'asc' } , limit: { limit }}
        return db.user.findMany({
            searchData,
        });
};
 export const update = async function (where, newData) {
     if (newData.email) {
         throw new Error('this field cannot be edited')
     }
     const db = await dbConnection;
     return db.user.update({
         where: {
             where,
         },
         data: {
             firstName: newData.firstName,
             lastName: newData.lastName,
         }
     });
 }

 export const upsert = async function (where, newData) {
     const db = await dbConnection;
     return db.user.upsert({
         where: {
             where,
         },
         update: {
             firstName: newData.firstName,
             lastName: newData.lastName,
         },
         create: {
             firstName: newData.firstName,
             lastName: newData.lastName,
             email: newData.email,
         }
     });
 };
