import { faker } from '@faker-js/faker';
import { groupBy } from "lodash";
import React from "react";

const randomHeight = () => Math.floor(Math.random() * 30 + 24);

const generateRandomItems = (count: any) => {
  return Array.from({ length: count }).map((_, i) => ({
    text: `Item ${i + 1}`,
    height: randomHeight(),
    longText: faker.lorem.paragraphs(1)
  }));
};

const generated: Array<{
    index: number;
    bgColor: string;
    name: string;
    initials: string;
    jobTitle: string;
    description: string;
    longText: string;
}> = [] ;

export function toggleBg(index: number) {
  return index % 2 ? "#f5f5f5" : "green";
}

export function user(index = 0) {
  let firstName = faker.name.firstName();
  let lastName = faker.name.lastName();

  return {
    index: index + 1,
    bgColor: toggleBg(index),
    name: `${firstName} ${lastName}`,
    initials: `${firstName.substr(0, 1)}${lastName.substr(0, 1)}`,
    jobTitle: faker.name.jobTitle(),
    description: faker.lorem.sentence(10),
    longText: faker.lorem.paragraphs(1)
  };
}

export const getUser = (index: number) => {
  if (!generated[index]) {
    generated[index] = user(index);
  }

  return generated[index];
};

const userSorter = (a: any, b: any) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

export function generateUsers(length: any, startIndex = 0) {
  return Array.from({ length }).map((_, i) => getUser(i + startIndex));
}

export function generateGroupedUsers(length: any) {
  const users = Array.from({ length })
    .map((_, i) => getUser(i))
    .sort(userSorter);
  const groupedUsers = groupBy(users, (user) => user.name[0]);
  const groupCounts = Object.values(groupedUsers).map((users) => users.length);
  const groups = Object.keys(groupedUsers);

  return { users, groupCounts, groups };
}

export const avatar = () =>
  React.createElement(
    "div",
    {
      style: {
        backgroundColor: "blue",
        borderRadius: "50%",
        width: 50,
        height: 50,
        paddingTop: 15,
        paddingLeft: 15,
        color: "white",
        boxSizing: "border-box"
      }
    },
    "AB"
  );

export const avatarPlaceholder = (text = " ") =>
  React.createElement(
    "div",
    {
      style: {
        backgroundColor: "#eef2f4",
        borderRadius: "50%",
        width: 50,
        height: 50
      }
    },
    text
  );

const range = (len: any) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33
        ? "complicated"
        : "single"
  };
};

export function makeData(...lens: any[]) {
  const makeDataLevel: any = (depth = 0) => {
    const len = lens[depth];
    return range(len).map(() => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
      };
    });
  };

  return makeDataLevel();
}
