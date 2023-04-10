import { ReactNode, useState } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup, Card, CardHeader, CardBody, Heading, InputRightElement, Button, Switch, HStack } from '@chakra-ui/react';
import { TbEye, TbEyeOff } from 'react-icons/tb';

const Password = ({ password, mode, register, errors }) => {
    const [updatePassword, setUpdatePassword] = useState(false);
    const [show, setShow] = useState(false);

    function handleChange() {
        setUpdatePassword(state => !state);
    }

    function handleShow() {
        setShow(state => !state);
    }

    return (
        <Card variant="outline" size="sm">
            <CardHeader borderBottomWidth={1} borderColor="gray.100">
                <HStack justifyContent="space-between" alignItems="center">
                    <Heading size="sm">Password</Heading>
                    <Switch isChecked={updatePassword} onChange={handleChange} size="sm" fontSize={13} isDisabled={mode !== 'edit'}>
                        Change the password
                    </Switch>
                </HStack>
            </CardHeader>
            <CardBody>
                {
                    updatePassword ? (
                        <>
                            <FormControl isInvalid={!!errors?.password} isRequired mb={15}>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        id="password"
                                        name="password"
                                        ref={password}
                                        type={show ? 'text' : 'password'}
                                        autoComplete="off"
                                        {...register('password', {
                                            required: 'Please provide the password',
                                            pattern: { value: /(?=(?:.*\d){1,})/g, message: 'Please add at least one number in the password' }
                                        })}
                                    />
                                    <InputRightElement width="3rem">
                                        <Button h="1.75rem" size="sm" onClick={handleShow}>
                                            {show ? <TbEyeOff /> : <TbEye />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage fontSize="xs">{(errors.password ? errors.password.message : null) as unknown as ReactNode}</FormErrorMessage>
                            </FormControl>
                
                            <FormControl isInvalid={!!errors?.confirm_password} isRequired>
                                <FormLabel htmlFor="confirm_password">Confirm password</FormLabel>
                                <Input
                                    id="confirm_password"
                                    name="confirm_password"
                                    type="password"
                                    autoComplete="off"
                                    {...register('confirm_password', {
                                        required: 'Please confirm your password',
                                        validate: (value) => password !== value ? 'The two passwords are not matched' : null
                                    })}
                                />
                                <FormErrorMessage fontSize="xs">{(errors.confirm_password ? errors.confirm_password.message : null) as unknown as ReactNode}</FormErrorMessage>
                            </FormControl>
                        </>
                    ) : <span>Click on 'Change the password' to show inputs</span>
                }
            </CardBody>
        </Card>
    );
};

export default Password;
