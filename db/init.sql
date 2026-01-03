create table if not exists settings (
    id int primary key,
    work_minutes int not null,
    break_minutes int not null,
    task_name text
);

insert into settings (id, work_minutes, break_minutes, task_name)
values (1, 25, 5, '-')
on conflict (id) do nothing;

create table if not exists stats (
    id int primary key,
    completed int not null,
    total_minutes int not null
);

insert into stats (id, completed, total_minutes)
values (1, 0, 0)
on conflict (id) do nothing;