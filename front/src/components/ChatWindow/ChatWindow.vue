<template>
  <div class="chatWindow">
    <div
      class="chatBox"
      v-for="message in orderedMessages"
      v-bind:key="message.id"
    >
      <ChatMessage :message="message" />
    </div>
  </div>
</template>

<script lang="ts" src="./ChatWindow.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./ChatWindow.css"></style>
