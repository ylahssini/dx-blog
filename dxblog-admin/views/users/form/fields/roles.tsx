import { useFieldArray } from 'react-hook-form';
import { CheckboxGroup, Checkbox, Card, Box, CardHeader, CardBody, Heading, HStack } from '@chakra-ui/react';
import upperFirst from 'lodash/upperFirst';
import { USER_PERMISSIONS } from '@/utils/constants';

const Roles = ({ control }) => {
    const { fields, remove, append, update } = useFieldArray({ name: 'roles', control });

    function handleChange(section) {
        return (value) => {
            const field: Record<string, any> = fields.find((f: Record<string, any>) => f.section === section);
            const index = fields.findIndex((f: Record<string, any>) => f.section === section);

            if (value.length === 0) {
                remove(index);
                return false;
            }

            if (!field) {
                const permissions = value.includes('read') ? value : ['read', ...value];
                append({ section, permissions });
                return false;
            }

            if (field) {
                if (!value.includes('read')) {
                    remove(index);
                    return false;
                }

                update(index, { section, permissions: value });
                return false;
            }

            return true;
        };
    }

    return (
        <Card variant="outline" size="sm">
            <CardHeader borderBottomWidth={1} borderColor="gray.100">
                <Heading size="sm">Select multiple permissions</Heading>
            </CardHeader>
            <CardBody>
                <HStack wrap="wrap" gap="7px">
                    {
                        Object.entries(USER_PERMISSIONS).map(([section, permissions]) => {
                            const field: Record<string, any> = fields.find((f: Record<string, any>) => f.section === section);

                            return (
                                <Box key={section} w="calc(24% - 7px)">
                                    <CheckboxGroup onChange={handleChange(section)} value={field?.permissions || []}>
                                        <h4>{upperFirst(section)}</h4>
                                        <Checkbox value="read">Read</Checkbox>
                                        {permissions.map((permission) => <Checkbox key={permission} value={permission}>{upperFirst(permission)}</Checkbox>)}
                                    </CheckboxGroup>
                                </Box>
                            );
                        })
                    }
                    
                </HStack>
            </CardBody>
        </Card>
    );
};

export default Roles;
