<template>
 <v-app>
    <v-card
      height="1000"
      class="overflow-hidden"
    >
      <v-navigation-drawer
        v-model="drawer"
        :color="color"
        :expand-on-hover="expandOnHover"
        :mini-variant="miniVariant"
        :right="right"
        :permanent="permanent"
        :src="bg"
        absolute
        dark
      >
        <v-list
          dense
          nav
          class="py-0"
        >
          <v-list-item two-line :class="miniVariant && 'px-0'">
            <v-list-item-avatar>
              <img src="../assets/me.jpg">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ name }}</v-list-item-title>
              <v-list-item-subtitle>id: {{ uid }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <v-card>test</v-card>
</v-app>
</template>
<script>
    import firebase from 'firebase'

    export default {
    name: 'Userhome',
    data () {
        return {
        drawer: true,
        name: firebase.auth().currentUser.email,
        uid: firebase.auth().currentUser.uid,
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Photos', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
        color: 'primary',
        colors: [
          'primary',
          'blue',
          'success',
          'red',
          'teal',
        ],
        right: false,
        permanent: true,
        miniVariant: false,
        expandOnHover: false,
        background: false,
      }
    },
    computed: {
      bg () {
        return this.background ? '../assets/me.jpg' : undefined
      }
    },
    methods: {
        signOut: function () {
        firebase.auth().signOut().then(() => {
            this.$router.push('/signin')
        })
        }
    }
    }
    // 画像の参照
    // const storage = firebase.storage();
    // const storageRef = storage.ref();
    // const usericon = storageRef.child('images/space.jpg');
</script>
<style>
    h1 {
        color:black;
        font-weight: bold;
        font-size: 50px;
    }

</style>