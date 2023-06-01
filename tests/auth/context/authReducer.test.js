import { types, authReducer } from '../../../src/auth';

describe('Testing authReducer', () => { 
  
  const myUser = {
    name: 'Maycol',
    id: 123
  };

  const initialState = {
    logged: false
  };

  test('should return the default state', () => { 
    
    const state = authReducer(initialState, {});
    expect( state ).toEqual(initialState)

  });

  test('should login and set the user sent in the payload', () => { 
    
    const action = {
      type: types.login,
      payload: myUser
    };
    
    const { logged, user } = authReducer(initialState, action);

    expect( logged ).toBeTruthy()
    expect( user ).toBe(myUser)
  });

  test('should logout and remove the user sent in the payload', () => { 
    
    const action = {
      type: types.logout,
      payload: myUser
    };
    
    const { logged, user } = authReducer(initialState, action);
    expect( logged ).toBeFalsy()
    
  });
});