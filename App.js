import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import lightLantern from './assets/icons/eco-light.png';
import offLantern from './assets/icons/eco-light-off.png';
import logoDioWhite from './assets/icons/logo-dio-white.png';
import logoDio from './assets/icons/logo-dio.png';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

export default function App() {
  const [toggle, setToggle] = useState(false);

  function handleChangeToggle() {
    setToggle(!toggle);
  }

  useEffect(() => {
    // Liga flash do celular
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    // quando o celular for chacoalhado, mudaremos o toggle
    const subscription = RNShake.addListener(() => {
      setToggle(!toggle);
    });

    // Essa função vai ser chamada quando o componente for desmontado
    return () => subscription.remove();
  });

  return (
    <View style={toggle ? style.containerLight : style.containerBlack}>
      <TouchableOpacity onPress={handleChangeToggle}>
        <Image
          style={toggle ? style.lightingOn : style.lightingOff}
          source={toggle ? lightLantern : offLantern}
        />

        <Image style={style.dioLogo} source={toggle ? logoDio : logoDioWhite} />
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  containerBlack: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
});
