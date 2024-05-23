/* eslint-disable react/prop-types */


const Notification = ({ successMessage,errorMessage }) => {
  if (successMessage === null && errorMessage === null) {
    return null
  }
  return (
    <div>
      {successMessage && <div className="successMessage">
        {successMessage}
      </div>}
     { errorMessage&&<div className="errorMessage">
        {errorMessage}
      </div>}
         </div>

  );
}

export default Notification;
