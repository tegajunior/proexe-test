import { uiActions } from './ui-store';
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
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Pending',
        message: 'Please wait...'
      }))
      const userData = await fetchRequest();
      if (!userData) return;
      const newArr = userData.map(item => item.id);
      const nextId = Math.max(...newArr) + 1;
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Completed',
          message: 'Users Retrieved',
        })
      );
      dispatch(
        userActions.replaceUsers({
          items: userData || [],
          nextId
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Completed',
          message: error.message,
        })
      );
    }
  };
};

// export const senduserData = (data) => {
//   return async (dispatch) => {
//     dispatch(
//       uiActions.showNotification({
//         status: 'pending',
//         title: 'Sending...',
//         message: 'Sending cart data',
//       })
//     );

//     const sendRequest = async () => {
//       const res = await fetch(
//         'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data',
//         {
//           method: 'POST',
//           body: JSON.stringify({ data }),
//         }
//       );

//       if (!res.ok) {
//         throw new Error('Something went wrong');
//       }
//     };

//     try {
//       await sendRequest();
//       dispatch(
//         uiActions.showNotification({
//           status: 'success',
//           title: 'Sent',
//           message: 'Sent cart data successfully',
//         })
//       );
//     } catch (error) {
//       dispatch(
//         uiActions.showNotification({
//           status: 'error',
//           title: 'Failure',
//           message: 'Sending cart data failed',
//         })
//       );
//     }
//   };
// };
