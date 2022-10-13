<template>
    <el-dialog
      v-model="dialog"
      title="Warning"
      width="30%"
      align-center
    >
      <span>Open the dialog from the center from the screen</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="ChangeDialog" >Cancel</el-button>
          <el-button type="primary" @click="ChangeDialog"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </template>
  <script setup>
  import { ref } from 'vue'
  
  const dialog = ref(false)

  const ChangeDialog = () => {
    dialog.value = !dialog.value
  }
  </script>
  <style scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
  </style>
  