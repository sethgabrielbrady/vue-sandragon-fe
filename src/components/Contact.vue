<template>
  <div class="w-2/3 m-auto py-40 text-center">
    <form class="bg-blue-100 p-10 mb-4 shadow rounded w-2/3 m-auto">
      <div class="text-center mb-8">
        <b>Contact us</b><br>
        We want to hear from you! Leave us a brief message and the best way to contact you and
        we will get back to you as soon as possible.
      </div>
      <div class="mb-2 w-2/3">
        <input type="title" class="input border rounded p-2 w-full" id="title" ref="title" placeholder="Email">
      </div>
      <div class="mb-2 w-full">
        <textarea type="textarea" class="input border rounded p-2 w-full" id="body" placeholder="Message" />
      </div>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded">Submit</button>
    </form>
  </div>
</template>