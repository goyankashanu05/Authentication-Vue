<template>
  <div class="user-card">
    <h1>{{ user.accountId }}</h1>
    <p>Age: {{ user.age }}</p>
    <p>First Name: {{ user.firstName }}</p>
    <p>Last Name: {{ user.lastName }}</p>
  </div>
</template>

<style scoped>
.user-card {
  padding: 1em;
  width: 350px;
}
</style>
<script>
export default {
  name: "userCard",
  props: { user: Object }
};
</script>
