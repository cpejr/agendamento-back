//const connection = require('../database/connection');
const FirebaseModel = require("../models/FirebaseModel");
const uuid = require("uuid");
const User = require("../models/userSchema");
const { deleteById } = require("../validators/UserValidator");

module.exports = {
  async find(request, response) {
    try {
      const user = await User.get(request.params.id);

      return response.status(200).json({ user });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ message: "Error while trying to validate credentials" });
    }
  },

  async findByFirebase(request, response) {
    try {
      const user = await User.scan({
        firebaseUid: request.params.firebaseUid,
      }).exec();

      return response.status(200).json({ user });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ message: "Error while trying to validate credentials" });
    }
  },

  async index(request, response) {
    try {
      const user = await User.scan().exec();

      return response.status(200).json({ user });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ message: "Error while trying to validate credentials" });
    }
  },

  async create(request, response) {
    let user;
    let check;
    try {
      const {
        zipcode,
        password,
        birthdate,
        phonenumber,
        complement,
        cpf,
        cnpj,
        firebaseUid = "temp",
        address,
        id = uuid.v1(),
        email,
        name,
        type,
      } = request.body;

      if (type === "PJ") {
        const condition1 = await User.scan({
          cnpj: cnpj,
        }).exec();

        const condition3 = await User.scan({
          email: email,
        }).exec();

        if (condition1.count === 0 || condition3.count === 0) {
          user = await User.create({
            id,
            firebaseUid,
            zipcode,
            password,
            birthdate,
            phonenumber,
            complement,
            cnpj,
            address,
            id,
            email,
            name,
            type,
          });

          check = true;
        }
      } else {
        const condition2 = await User.scan({
          cpf: cpf,
        }).exec();

        const condition3 = await User.scan({
          email: email,
        }).exec();

        // A condição acima scaneou se o cpf já estava sendo utilizado no BD, abaixo utiliza-se o if para validar
        // A tabela PRECISA estar criada!
        if (condition2.count === 0 || condition3.count === 0) {
          user = await User.create({
            id,
            firebaseUid,
            zipcode,
            password,
            birthdate,
            phonenumber,
            complement,
            cpf,
            address,
            id,
            email,
            name,
            type,
          });

          check = true;
        }
      }

      if (check) {
        let firebaseId;
        firebaseId = await FirebaseModel.createNewUser(
          user.email,
          user.password
        );

        user = await User.update(
          { id },
          {
            firebaseUid: firebaseId,
          }
        );

        delete user.password;
        return response.status(200).json({ notification: "User created!" });
      } else {
        return response
          .status(400)
          .json({ notification: "CPF already in use" });

        console.log("User creation failed: CPF already in use");
      }

      //await connection('users').insert(user);
    } catch (err) {
      if (err.message)
        return response.status(400).json({ notification: err.message });

      console.log("User creation failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to register user",
      });
    }
  },

  // Atualizar usuário
  async update(request, response) {
    try {
      const { id } = request.params;

      const {
        name,
        birthdate,
        address,
        phonenumber,
        zipcode,
        active,
      } = request.body;

      const updatedUser = await User.update(
        { id },
        {
          name,
          birthdate,
          address,
          phonenumber,
          zipcode,
          active,
        }
      );

      return response.status(200).json({ updatedUser });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ message: "Error while trying to update user." });
    }
  },

  //  Deletar usuário
  async deleteById(request, response) {
    try {

      // acha os dados do usuario que se deseja deletar
      const userToDelete = await User.query({ id: request.params.id }).exec();

      // deleta do firebase
      // await FirebaseModel.deleteUser(userToDelete[0].firebaseUid).catch(err => {
      //   if (err) {
      //     console.log(err);

      //     return response
      //       .status(404)
      //       .json({ notification: "Error when attempting to delete from Firebase." });
      //   };
      // });
      // await FirebaseModel.deleteUser("ez4IWUKvJpeRMl0tjwXSRVOu2vb2");

      // deleta do banco
      User.delete(request.params.id);

      return response
        .status(200)
        .json({ notification: "Sucessfully deleted item" });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ notification: "Error while trying to delete user" });
    }
  },

};
