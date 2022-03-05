import { userActions } from './user-store';

export const fetchUserData = () => {
  return async (dispatch) => {
    const fetchRequest = async () => {
      const res = await fetch(
        'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data'
      );

      if (!res.ok) {
        throw new Error('Something went wrong');
      }

      const data = res.json();

      return data;
    };

    try {
      const userData = await fetchRequest();
      if (!userData) return;
      const newArr = userData.map(item => item.id);
      const nextId = Math.max(...newArr) + 1;
      dispatch(
        userActions.replaceUsers({
          items: userData || [],
          nextId
        })
      );
    } catch (error) {
    }
  };
};

