<template>
    <figure class="image is-128x128">
        <img src="https://bulma.io/images/placeholders/256x256.png">
        <p>{{list.data}}</p>
    </figure>
</template>


<script>
import { getSongList } from '@/api/songList'

export default ({
    name: 'SongListShare',
    data() {
      return {
        list: {
        }
      }
    },
    createed() {
        this.fetgetSongList()
    },
    methods: {
       async fetgetSongList() {
         getSongList().then((value) =>{
         const {data} = value
         this.list = data;
         alert(data)
      })
    }
    }
})
</script>
