<template>
 <v-app>
    <v-card height="3000">
    <div class="userhome-dashboard">
            <h1>Material Picks</h1>
              <v-file-input
                    label="If you have a good photo...please upload!"
                    filled
                    prepend-icon="mdi-camera"
                ></v-file-input>
            <v-card>
            <v-tabs background-color="white" color="deep-purple accent-4" right>
            <v-tab>Show All</v-tab>
            <v-tab>Nature</v-tab>
            <v-tab>Season</v-tab>
            <v-tab>Public</v-tab>
            <v-tab>Sky</v-tab>
            <v-tab>Animals</v-tab>

            <v-tab-item v-for="n in 6" :key="n">
                <v-container fluid>
                    <v-row>
                        <v-col v-for="i in 21" :key="i" cols="4" md="4">
                            <v-img :src="`https://picsum.photos/500/300?image=${i * n * 5 + 20}`" :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 20}`" aspect-ratio="1">
                            <v-row class="img-card" align="end" justify="space-around">
                                    <v-icon color="blue lighten-5">mdi-heart-outline</v-icon>
                                    <v-icon color="blue lighten-5">mdi-access-point</v-icon>
                                    <v-icon color="blue lighten-5">mdi-arrow-collapse-down</v-icon>
                            </v-row>
                            </v-img>
                        </v-col>

                    </v-row>
                </v-container>
            </v-tab-item>
            </v-tabs>
        </v-card>
    </div>
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
          { title: 'Uploaded Photos', icon: 'mdi-image' },
          { title: 'Help', icon: 'mdi-help-box' },
          { title: 'Signout', icon: 'mdi-account-arrow-right-outline' }
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
        color:grey ;
        font-weight: bold;
        font-size: 50px;
    }

    .userhome-dashboard {
        margin-top: 20px;
        margin-left: 300px;
        margin-right: 40px;
    }

    .img-card {
        margin-top: 300px;
    }

</style>