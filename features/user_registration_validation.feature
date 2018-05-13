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
        - age is required if gender is 'male'
        - location latitude must be a number
        - location longitude must be a number
        - location country must be a string

    @user_registration_valid
    Scenario Outline: User registration: valid
        Given I'am a visitor of the application
        When I complete the user registration form
        When I write <gender> as gender
        When I submit the user registration form
        Then the form is valid

        Examples:
            | gender |
            | male   |
            | female |

    @user_registration_invalid_missing_email
    Scenario: User registration: invalid missing email
        Given I'am a visitor of the application
        When I complete the user registration form
        When I forgot the email field
        When I submit the user registration form
        Then the form is invalid
        Then I receive the error user_registration_missing_email

    @user_registration_invalid_invalid_email
    Scenario: User registration: invalid invalid email
        Given I'am a visitor of the application
        When I complete the user registration form
        When I write me@mail as email
        When I submit the user registration form
        Then the form is invalid
        Then I receive the error user_registration_invalid_email

    @user_registration_existing_email
    Scenario: User registration: invalid invalid existing email
        Given I'am a visitor of the application
        When I complete the user registration form
        When I write existing@mail.com as email
        When I submit the user registration form
        Then the form is invalid
        Then I receive the error user_registration_existing_email

    @user_registration_unknown_gender
    Scenario: User registration: invalid invalid unknown gender
        Given I'am a visitor of the application
        When I complete the user registration form
        When I write crazy as gender
        When I submit the user registration form
        Then the form is invalid
        Then I receive the error user_registration_unknown_gender

    @user_registration_invalid_comment_type
    Scenario: User registration: invalid comment type
        Given I'am a visitor of the application
        When I complete the user registration form
        When I write an invalid comment type
        When I submit the user registration form
        Then the form is invalid
        Then I receive the error user_registration_invalid_type_comment

    @user_registration_invalid_missing_age
    Scenario: User registration: invalid missing age for male
        Given I'am a visitor of the application
        When I complete the user registration form
        When I forgot the age field
        When I submit the user registration form
        Then the form is invalid
        Then I receive the error user_registration_missing_age

    @user_registration_valid_no_age_for_female
    Scenario: User registration: valid no age for female
        Given I'am a visitor of the application
        When I complete the user registration form
        When I forgot the age field
        When I write female as gender
        When I submit the user registration form
        Then the form is valid

    @user_registration_invalid_latitude_type
    Scenario: User registration: invalid latitude type
        Given I'am a visitor of the application
        When I complete the user registration form
        When I write an invalid latitude type
        When I submit the user registration form
        Then the form is invalid
        Then I receive the error user_registration_invalid_type_latitude

    @user_registration_invalid_missing_latitude
    Scenario: User registration: invalid missing latitude
        Given I'am a visitor of the application
        When I complete the user registration form
        When I forgot the latitude field of location
        When I submit the user registration form
        Then the form is invalid
        Then I receive the error user_registration_missing_latitude

    @user_registration_invalid_missing_longitude
    Scenario: User registration: invalid missing longitude
        Given I'am a visitor of the application
        When I complete the user registration form
        When I forgot the longitude field of location
        When I submit the user registration form
        Then the form is invalid
        Then I receive the error user_registration_missing_longitude
    
    @user_registration_invalid_multiple_errors
    Scenario: User registration: invalid invalid email
        Given I'am a visitor of the application
        When I complete the user registration form
        When I write an invalid email type
        When I forgot the age field
        When I forgot the latitude field of location
        When I submit the user registration form
        Then the form is invalid
        Then I receive the several errors