<template>
  <div id="footer">
    <form class="h-100" v-on:submit="sendMessage">
      <div class="input-group mb-3 h-100">
        <input
          type="text"
          id="input"
          class="form-control h-100"
          placeholder="Your message"
          aria-label="Your message"
          aria-describedby="basic-addon2"
        />
        <!--
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button">
            Send
          </button>
        </div>
        -->
      </div>
    </form>
  </div>
</template>

<script lang="ts" src="./Footer.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Footer.css"></style>
