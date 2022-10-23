export const port = process.env.PORT ||9090;
export const host = `http://localhost:${port}/`;

export const connectedUser = {
    data:{
        first_name: 'Joe',
        last_name: 'Doe',
        email: 'joedoe@test.com',
        role: 'admin',
        status: true,
    },
    isLogged: true,
};

export const headers = { authorization: 'Bearer F0rC3_Th3_E2E_T35t' };
