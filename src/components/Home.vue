<template>
  <div class="home">
    <div class="buttons">
      <button @click="showRegistrationForm">Регистрация</button>
      <button @click="showLoginForm">Вход</button>
    </div>

    <div class="registration-form" v-if="registrationFormVisible">
      <h2>Регистрация</h2>
      <form @submit.prevent="submitRegistrationForm">
        <input type="text" v-model="registrationData.username" placeholder="Имя пользователя" />
        <input type="email" v-model="registrationData.email" placeholder="Email" />
        <input type="password" v-model="registrationData.password" placeholder="Пароль" />
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>

    <div class="login-form" v-if="loginFormVisible">
      <h2>Вход</h2>
      <form @submit.prevent="submitLoginForm">
        <input type="email" v-model="loginData.email" placeholder="Email" />
        <input type="password" v-model="loginData.password" placeholder="Пароль" />
        <button type="submit">Войти</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default {
  name: 'Home',
  setup() {
    const router = useRouter();
    const authInstance = getAuth();
    const registrationFormVisible = ref(false);
    const loginFormVisible = ref(false);

    const registrationData = reactive({
      username: '',
      email: '',
      password: '',
    });

    const loginData = reactive({
      email: '',
      password: '',
    });

    const showRegistrationForm = () => {
      registrationFormVisible.value = true;
      loginFormVisible.value = false;
    };

    const showLoginForm = () => {
      registrationFormVisible.value = false;
      loginFormVisible.value = true;
    };

    const submitRegistrationForm = async () => {
      try {
        const { email, password } = registrationData;

        const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
        console.log('Пользователь создан:', userCredential.user);

        registrationData.username = '';
        registrationData.email = '';
        registrationData.password = '';

        router.push({ path: '/chat' });
      } catch (error) {
        console.error('Ошибка при создании пользователя:', error);
      }
    };

    const submitLoginForm = async () => {
      try {
        const { email, password } = loginData;

        const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
        console.log('Пользователь вошел:', userCredential.user);

        loginData.email = '';
        loginData.password = '';

        router.push('/chat');
      } catch (error) {
        console.error('Ошибка при входе пользователя:', error);
      }
    };

    return {
      registrationFormVisible,
      loginFormVisible,
      registrationData,
      loginData,
      showRegistrationForm,
      showLoginForm,
      submitRegistrationForm,
      submitLoginForm,
    };
  },
};
</script>



<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.buttons {
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 550px;

  button {
    margin: 10px;
    width: 200px;
  }
}

.registration-form {
  position: absolute;
  display: flex;
  flex-direction: column;
  height: 500px;

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

.login-form {
  position: absolute;
  display: flex;
  flex-direction: column;
  height: 500px;

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
