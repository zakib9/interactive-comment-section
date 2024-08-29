<script setup>
import FormSectionView from '@/components/FormSectionView.vue';
import CommentSectionView from '@/components/CommentSectionView.vue';
import DeleteModalView from '@/components/DeleteModalView.vue';
import usersData from '../data.json'
import { ref } from 'vue';

  const usersArray = ref([])
  const commentsArray = ref([])
  let deletePopUp = ref(null)
  let replyId = ref(null)
  let commentId = ref(null)
  let accept = ref(null)


  // transaction of JSON data file to an array for smooth manipulation
  function usersDataFetch(){
      usersArray.value.push({
        "image": usersData.currentUser.image,
        "username": usersData.currentUser.username
      })
      for (let index = 0; index < usersData.comments.length; index++) {
        commentsArray.value.push({
            "id" : index,
            "replies": usersData.comments[index].replies,
            "createdAt": usersData.comments[index].createdAt,
            "score": usersData.comments[index].score,
            "content": usersData.comments[index].content,
            "user": usersData.comments[index].user
      }) 
    }
     
  }
  usersDataFetch()

  function onSend(comment){
    commentsArray.value.push({
        "id" : commentsArray.value.length,
        "replies": [],
        "createdAt": "Now",
        "score": 0,
        "content": comment,
        "user": usersData.currentUser
    })
    
  }
  function onDelete(id){
    commentId.value = id
    replyId.value = null
    deletePopUp.value = true
  }
  function OnDelete(id){
    replyId.value = id[0]
    commentId.value = id[1] 
    deletePopUp.value = true
  }
  function OnReply(operation){
      if (operation[1]) {
        for (let index = 0; index < commentsArray.value.length; index++) 
      {
        if(commentsArray.value[index].id == operation[2])
         {
          commentsArray.value[index].replies.push({
            "id" : commentsArray.value[index].replies.length,
            "createdAt": "Now",
            "score": 0,
            "content": operation[1],
            "user": usersData.currentUser
          })
         }
      }
      }
  }
  function onUpdate(comment){
      for (let index = 0; index < commentsArray.value.length; index++)
      {
        if(commentsArray.value[index].id == comment[2])
        commentsArray.value[index].content = comment[1]
      }
    }
    function OnUpdate(updatedReply){
      for (let index = 0; index < commentsArray.value.length; index++) 
      for (let i = 0; i < commentsArray.value[index].replies.length; i++){
        if(commentsArray.value[index].id == updatedReply[3])
         if(commentsArray.value[index].replies[i].id == updatedReply[2])
         {
          commentsArray.value[index].replies[i].content = updatedReply[1]
         }
      }
    }

  function onScoreIncrementation(id){
    for (let index = 0; index < commentsArray.value.length; index++) {
         if(commentsArray.value[index].id == id)
         commentsArray.value[index].score++
    }
  }
  function onScoreDecrementation(id){
    for (let index = 0; index < commentsArray.value.length; index++) {
         if(commentsArray.value[index].id == id)
         if(commentsArray.value[index].score > 0)
         commentsArray.value[index].score--
    }
  }
  function onReplyScoreIncrementation(id){
    for (let index = 0; index < commentsArray.value.length; index++) 
      for (let i = 0; i < commentsArray.value[index].replies.length; i++)
         if(commentsArray.value[index].id == id[1])
         if(commentsArray.value[index].replies[i].id == id[0]){
          console.log(commentsArray.value[index].replies[i].score)
          commentsArray.value[index].replies[i].score++
         } 
  }
  function onReplyScoreDecrementation(id){
    for (let index = 0; index < commentsArray.value.length; index++) 
      for (let i = 0; i < commentsArray.value[index].replies.length; i++){
        if(commentsArray.value[index].id == id[1])
         if(commentsArray.value[index].replies[i].id == id[0])
         if(commentsArray.value[index].replies[i].score > 0){
          console.log(commentsArray.value[index].replies[i].score)
          commentsArray.value[index].replies[i].score--
         }
      }   
    }
  function onCloseModal(accept){
    if(accept)
    {
      if (replyId.value != null) {
      for (let index = 0; index < commentsArray.value.length; index++) 
      for (let i = 0; i < commentsArray.value[index].replies.length; i++){
        if(commentsArray.value[index].id == commentId.value)
         if(commentsArray.value[index].replies[i].id == replyId.value)
          commentsArray.value[index].replies.splice(i, 1)
      }
    }else{
      for (let index = 0; index < commentsArray.value.length; index++) {
         if(commentsArray.value[index].id == commentId.value)
            commentsArray.value.splice(index, 1)
         
          }
    }
  }
  deletePopUp.value = false
}
</script>

<template>
<div class="w-full h-screen flex  bg-secondary justify-center items-end">
  <div class="flex flex-col h-screen  overflow-y-scroll no-scrollbar bg-secondary lg:w-1/2 md:w-full py-10">
    <div v-for="comment in commentsArray" :key="comment.id">
      <CommentSectionView  
      :comment="comment"
      @delete="onDelete"
      @deleteReply="OnDelete" 
      @reply="OnReply"
      @replyto="OnReply"
      @update="onUpdate"
      @updateReply="OnUpdate"
      @scoreIncrementation="onScoreIncrementation(comment.id)"
      @scoreDecrementation="onScoreDecrementation(comment.id)"
      @replyScoreIncrementation="onReplyScoreIncrementation"
      @replyScoreDecrementation="onReplyScoreDecrementation"/>
  </div>
      <FormSectionView 
      :users="usersData" 
      @send="onSend" />
  </div >
    <DeleteModalView 
      :modalActive="deletePopUp" 
      :accept="accept"
      @closeModal="onCloseModal"/>
</div>
</template>
