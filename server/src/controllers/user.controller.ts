import {
  Request,
  Response,
} from "express";

import prisma from "../lib/prisma";

export const getUsers = async (
  req: Request,
  res: Response
) => {
  const users =
    await prisma.user.findMany();

  res.json(users);
};

export const createUser = async (
  req: Request,
  res: Response
) => {
  const {
    name,
    email,
    password,
  } = req.body;

  const user =
    await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

  res.json(user);
};

export const getUserById = async (
  req: Request,
  res: Response
) => {
  const id = Number(
    req.params.id
  );

  const user =
    await prisma.user.findUnique({
      where: {
        id,
      },
    });

  res.json(user);
};

export const updateUser = async (
  req: Request,
  res: Response
) => {
  const id = Number(
    req.params.id
  );

  const {
    name,
    email,
    password,
  } = req.body;

  const updatedUser =
    await prisma.user.update({
      where: {
        id,
      },

      data: {
        name,
        email,
        password,
      },
    });

  res.json(updatedUser);
};

export const deleteUser = async (
  req: Request,
  res: Response
) => {
  const id = Number(
    req.params.id
  );

  await prisma.user.delete({
    where: {
      id,
    },
  });

  res.json({
    message:
      "User deleted successfully",
  });
};