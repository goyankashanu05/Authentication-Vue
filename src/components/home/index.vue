<template>
  <div>
    <loading v-if="loading" />
    <div v-if="isAuthenticated" class="home">
      <div class="width-50">
        <user-card v-for="(user, index) in filteredUsers" :key="index" :user="user" />
      </div>
      <div class="width-50 filter">
        <div v-for="filter in filters" :key="filter" class="filter">
          <input type="checkbox" :value=filter v-model="appliedFilters">
          <label :for=filter>{{filter}}</label>
        </div>
      </div>
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
}
.width-50 {
  width: 50%;
}
.filter {
  padding: 1em;
  margin-block-start: 0.67em;
}
</style>

<script>
import userCard from "./userCard.vue";
import { mapGetters, mapState } from "vuex";
import Login from "components/login";

const LESS_AGE_FILTER = "Age greater than equal to 20"
const GREATER_AGE_FILTER = "Age less than 30"
const NAME_LENGTH_FILTER = "Length of full name greater than equal to 10"

export default {
  components: {
    Login,
    userCard
  },
  name: "home",
  data() {
    return {
      appliedFilters: [],
      filters: [
        LESS_AGE_FILTER,
        GREATER_AGE_FILTER,
        NAME_LENGTH_FILTER
      ]
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "authStatus", "getUsers"]),
    ...mapState({ users: state => state.user.users }),
    loading: function() {
      return this.authStatus === "loading" && !this.isAuthenticated;
    },
    filteredUsers: function() {
      let filteredUsers = this.users.filter( user => {
        if(this.appliedFilters.includes(LESS_AGE_FILTER)){
          return user.age >= 20
        } else {
          return true
        }
      })

      filteredUsers = filteredUsers.filter( user => {
        if(this.appliedFilters.includes(GREATER_AGE_FILTER)){
          return user.age < 30
        } else {
          return true
        }
      })

      filteredUsers = filteredUsers.filter( user => {
        if(this.appliedFilters.includes(NAME_LENGTH_FILTER)){
          return (user.firstName + user.lastName).length >= 9
        } else {
          return true
        }
      })
      return filteredUsers
    }
  }
};
</script>
