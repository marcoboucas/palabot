<template>
  <div class="chatMessage">
    <div class="message" :class="!message.isMe ? 'left' : 'right'">
      <div class="content">{{ message.content }}</div>
      <div class="author">{{ message.author }}</div>
    </div>
  </div>
</template>

<script lang="ts" src="./ChatMessage.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./ChatMessage.css"></style>
