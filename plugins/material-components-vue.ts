import Vue from 'vue';
import LayoutGrid from 'material-components-vue/dist/layout-grid';
import Card from 'material-components-vue/dist/card';
import Button from 'material-components-vue/dist/button';
import Select from 'material-components-vue/dist/select';
import Menu from 'material-components-vue/dist/menu';
import List from 'material-components-vue/dist/list';
import IconButton from 'material-components-vue/dist/icon-button';
import Icon from 'material-components-vue/dist/icon';
import Snackbar from 'material-components-vue/dist/snackbar';

import CardPrimary from '~/components/card/CardPrimary.vue';
import CardSecondary from '~/components/card/CardSecondary.vue';

Vue.use(LayoutGrid);
Vue.use(Card);
Vue.use(Button);
Vue.use(Select);
Vue.use(List);
Vue.use(Menu);
Vue.use(IconButton);
Vue.use(Icon);
Vue.use(Snackbar);

Vue.component('m-card-primary', CardPrimary);
Vue.component('m-card-secondary', CardSecondary);
