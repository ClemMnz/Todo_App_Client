import {
    ADD_PERSON,
    GET_ALL_PERSONS,
    UPDATE_PERSON,
    DELETE_ALL_PERSONS,
    DELETE_PERSON,
  } from "../actions/types";
  
  const initialState = [];
  
  export default (persons = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case ADD_PERSON:
        return [...persons, payload];
      case GET_ALL_PERSONS:
        return payload;
      case UPDATE_PERSON:
        return persons.map((person) => {
          if (person.id === payload.id) {
            return {
              ...person,
              ...payload,
            };
          }
          return person;
        });
      case DELETE_PERSON:
         return persons.filter(({ id }) => id !== payload.id);
      case DELETE_ALL_PERSONS:
        return [];
      default:
        return persons;
    }
  };
  