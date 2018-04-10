Feature: User registration validation

    As a visitor of the Application
    I want to create an account
    So that I can use app functionalities

    rules:
        - email is required
        - email must be valid
        - email must not already be used
        - password is required 
        - password must be minimum 6 characters alphanumeric
        - gender must be 'male' or 'female'
        - comment must be a String

    @user_registration_valid
    Scenario Outline: User registration: valid
        Given I'am a visitor of the application
        When I write me@mail.com as email
        When I write a1b2c3 as password
        When I write Jon Doe as name
        When I write JonDoe2000 as nickname
        When I write <gender> as gender
        When I write Hello world as comment
        When I submit the user registration form
        Then the form is valid

        Examples:
            | gender |
            | male   |
            | female |

    @user_registration_invalid_missing_email
    Scenario: User registration: invalid missing email
        Given I'am a visitor of the application
        When I write a1b2c3 as password
        When I write Jon Doe as name
        When I write JonDoe2000 as nickname
        When I write male as gender
        When I submit the user registration form
        Then the form is invalid
        Then I receive the error user_registration_missing_email

    @user_registration_invalid_invalid_email
    Scenario: User registration: invalid invalid email
        Given I'am a visitor of the application
        When I write me@mail as email
        When I write a1b2c3 as password
        When I write Jon Doe as name
        When I write JonDoe2000 as nickname
        When I write male as gender
        When I submit the user registration form
        Then the form is invalid
        Then I receive the error user_registration_invalid_email

    @user_registration_existing_email
    Scenario: User registration: invalid invalid existing email
        Given I'am a visitor of the application
        When I write existing@mail.com as email
        When I write a1b2c3 as password
        When I write Jon Doe as name
        When I write JonDoe2000 as nickname
        When I write male as gender
        When I submit the user registration form
        Then the form is invalid
        Then I receive the error user_registration_existing_email

    @user_registration_unknown_gender
    Scenario: User registration: invalid invalid unknown gender
        Given I'am a visitor of the application
        When I write me@mail.com as email
        When I write a1b2c3 as password
        When I write Jon Doe as name
        When I write JonDoe2000 as nickname
        When I write crazy as gender
        When I submit the user registration form
        Then the form is invalid
        Then I receive the error user_registration_unknown_gender

    @user_registration_invalid_comment_type
    Scenario: User registration: invalid comment type
        Given I'am a visitor of the application
        When I write me@mail.com as email
        When I write a1b2c3 as password
        When I write Jon Doe as name
        When I write JonDoe2000 as nickname
        When I write male as gender
        When I write an invalid comment type
        When I submit the user registration form
        Then the form is invalid
        Then I receive the error user_registration_invalid_type_comment