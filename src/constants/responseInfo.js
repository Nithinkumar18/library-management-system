const info = {
    SERVICE: "NALANDA_Library-Management-System",
    USER_SERVICE: "User-Service",
    BOOK_SERVICE: "Book-Service",
    BORROW_SERVICE: "Borrow-Service",
    USER_REGESTRATION_SUCCESS: "User Regestration successfull",
    BOOK_REGESTRATION_SUCCESS: "Book published successfully",
    BOOK_REGESTRATION_FAIL: "Unable to publish book ",
    USER_REGESTRATION_FAIL: "user regestration failed",
    USER_NOT_FOUND: "user not found with given userid",
    USER_UPDATE_SUCCESS: "user profile updation success",
    USER_UPDATE_FAIL: "user profile update failed",
    USER_DEACTIVATION_SUCCESS: "user deactivation success",
    ACCESS_DENIED: "You do not have the required permissions to perform this action; please contact administrator for assistance if you believe this is an error",
    ERR_USER_DATA: "error fetching user data",
    ERROR_VALIDATING_ROLE: "Role validation failed due to issue at server Please try again after some time",
    ROLE_VALIDATION: "user role validation success",
    ROLE_VALIDATION_FAIL: "user role validation failed",
    TOKEN_UNDEFINED: "Authentication token missing or improperly formatted. Please log in and try again.",
    TOKEN_EXPIRED: "Your authentication token has expired or is malformed. Please log in again to continue.",
    TOKEN_GENERATED: "login token generated",
    INVALID_USER_CREDENTIALS:"Please provide valid  user details like  email,password",
    ERR_LOGIN: "User login failed",
    BOOK_COLLECTION_SUCCESS: "Books fetched successfully",
    BOOK_COLLECTION_FAIL: "Unable to fetch books.we are working on it",
    BOOK_UPDATE_SUCCESS: "Book details has been updated successfully!",
    BOOK_UPDATE_FAILED: "Unable to update book details",
    BOOK_UNSYNCED: "Book has been deleted permanently from the repository",
    BOOK_UNSYNCED_FAIL: "Unable to delete book from the repository",
    BOOK_BORROW: "You have successfully borrowed the book",
    BOOK_RETURN: "You have successfully returned the book",
    BOOK_BORROW_FAIL:"Book you are trying to borrow doesnt have enough copies. It will be available soon",
    BORROW_ACTION: "borrow",
    RETURN_ACTION: "return"



}
module.exports = info;