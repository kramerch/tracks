import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TracksNavigationProp } from '../../data/types';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const SignUpScreen: React.FC<TracksNavigationProp> = ({ navigation }) => {
    const { state, signUp } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <View style={styles.container}>
                <Spacer><Text h3>Sign Up for Tracker</Text></Spacer>
                <Input
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    autoCorrect={false} />
                <Spacer />
                <Input
                    secureTextEntry
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    autoCorrect={false} />
                {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
                <Spacer>
                    <Button 
                        title="Sign Up"
                        onPress={() => signUp({ email, password })} />
                </Spacer>
            </View>
            <View style={styles.spacingBottom} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 8,
        justifyContent: 'center'
    },
    spacingBottom: {
        flex: 2
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15
    }
});

export default SignUpScreen;