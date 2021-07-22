import { Migration } from '@mikro-orm/migrations';

export class Migration20210722213449 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `base_model` (`id` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `base_model` add primary key `base_model_pkey`(`id`);');

    this.addSql('create table `shop` (`id` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `name` varchar(255) not null, `copies` int(11) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `shop` add primary key `shop_pkey`(`id`);');

    this.addSql('create table `author` (`id` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `name` varchar(255) not null, `age` int(11) null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `author` add primary key `author_pkey`(`id`);');
    this.addSql('alter table `author` add unique `author_name_unique`(`name`);');

    this.addSql('create table `book` (`id` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `title` varchar(255) not null, `pages` int(11) not null, `year` int(11) null, `rating` int(11) null, `author_id` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `book` add primary key `book_pkey`(`id`);');
    this.addSql('alter table `book` add unique `book_title_unique`(`title`);');
    this.addSql('alter table `book` add index `book_author_id_index`(`author_id`);');

    this.addSql('create table `book_shops` (`book_id` varchar(255) not null, `shop_id` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `book_shops` add index `book_shops_book_id_index`(`book_id`);');
    this.addSql('alter table `book_shops` add index `book_shops_shop_id_index`(`shop_id`);');
    this.addSql('alter table `book_shops` add primary key `book_shops_pkey`(`book_id`, `shop_id`);');

    this.addSql('alter table `book` add constraint `book_author_id_foreign` foreign key (`author_id`) references `author` (`id`) on update cascade on delete cascade;');

    this.addSql('alter table `book_shops` add constraint `book_shops_book_id_foreign` foreign key (`book_id`) references `book` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `book_shops` add constraint `book_shops_shop_id_foreign` foreign key (`shop_id`) references `shop` (`id`) on update cascade on delete cascade;');
  }

}
