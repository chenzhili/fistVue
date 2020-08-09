import Vue from 'vue';
import './element-variables.scss'
import {
    /* Pagination,
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    
    
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    
    
    
    ButtonGroup,
    
    
    TimeSelect,
    TimePicker,
    Popover,
    Tooltip,
    Breadcrumb,
    BreadcrumbItem,
    
    Tabs,
    TabPane,
    Tag,
    Tree,
    Alert,
    Slider,
    Icon,
    Row,
    Col,
    Upload,
    Progress,
    Spinner,
    Badge,
    Card,
    Rate,
    Steps,
    Step,
    Carousel,
    CarouselItem,
    Collapse,
    CollapseItem,
    Cascader,
    ColorPicker,
    Transfer,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Timeline,
    TimelineItem,
    
    Divider,
    Image,
    Calendar,
    Backtop,
    PageHeader,
    CascaderPanel,
     */
    Button,
    Notification,
    MessageBox,
    Loading,
    Message,
    Table,
    TableColumn,
    Link,
    Input,
    Form,
    FormItem,
    DatePicker,
    InputNumber,
    Select,
    Option,
    OptionGroup,
} from 'element-ui';

/* Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);


Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);



Vue.use(ButtonGroup);


Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);

Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Alert);
Vue.use(Slider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Spinner);
Vue.use(Badge);
Vue.use(Card);
Vue.use(Rate);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Cascader);
Vue.use(ColorPicker);
Vue.use(Transfer);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Timeline);
Vue.use(TimelineItem);

Vue.use(Divider);
Vue.use(Image);
Vue.use(Calendar);
Vue.use(Backtop);
Vue.use(PageHeader);
Vue.use(CascaderPanel); */
console.log('执行');
Vue.use(Button);
Vue.use(Loading.directive);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Link);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(DatePicker);
Vue.use(InputNumber);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);

function MessApi() { }
MessApi.install = () => {
    Vue._message = Message;

    Object.defineProperties(Vue.prototype, {
        $loading: {
            get() {
                return Loading.service;
            }
        },
        $msgbox: {
            get() {
                return MessageBox;
            }
        },
        $alert: {
            get() {
                return MessageBox.alert;
            }
        },
        $confirm: {
            get() {
                return MessageBox.confirm;
            }
        },
        $prompt: {
            get() {
                return MessageBox.prompt;
            }
        },
        $notify: {
            get() {
                return Notification;
            }
        },
        $message: {
            get() {
                return Message;
            }
        },
    })
}
Vue.use(MessApi);

