<template>
  <div>
    <loading v-if="loading" />
    <div v-if="isAuthenticated">
      <user-card v-for="(user, index) in users" :key="index" :user="user" />
    </div>
    <div v-if="!isAuthenticated && authStatus !== 'loading'">
      <h1>Welcome to Apertum Online !</h1>
      <p>
        Global Online Technology Experts. Entertainment with Efficiency. Apertum Online is a solutions provider for global emerging markets
      </p>
      <login />
    </div>
  </div>
</template>

<style>
.home {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>

<script>
import userCard from "./userCard.vue";
import { mapGetters, mapState } from "vuex";
import Login from "components/login";

export default {
  components: {
    Login,
    userCard
  },
  name: "home",
  computed: {
    ...mapGetters(["isAuthenticated", "authStatus", "getUsers"]),
    ...mapState({ users: state => state.user.users }),
    loading: function() {
      return this.authStatus === "loading" && !this.isAuthenticated;
    }
  }
};
</script>
