export const installationFields = [
    {
        key: 'email',
        placeholder: 'Email Address',
        validation: {
            required: 'Please provide your email address',
            pattern: 'Please provide a valid email address',
        },
    },
    {
        key: 'first_name',
        placeholder: 'First Name',
        validation: { required: 'Please provide your first name' },
    },
    {
        key: 'last_name',
        placeholder: 'Last Name',
        validation: { required: 'Please provide your last name' },
    },
    {
        key: 'password',
        placeholder: 'Password',
        validation: {
            required: 'Please provide your password',
            pattern: 'Please add at least one number in your password',
        },
    },
    {
        key: 'confirm_password',
        placeholder: 'Confirm password',
        validation: {
            required: 'Please confirm your password',
            confirm: 'The two passwords are not matched',
        },
    },
];
