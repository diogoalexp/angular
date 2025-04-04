import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit{
  userId = input.required<string>();
  private usersService = inject(UsersService);

  private activatedRoute = inject(ActivatedRoute); //old way to retrive route params
  private destroyRef = inject(DestroyRef);
  ngOnInit(): void {
      console.log(this.activatedRoute.snapshot); //snapshot gives actual values rather that observables
      const subscription = this.activatedRoute.paramMap.subscribe({
        next: paramMap => console.log(this.usersService.users.find(u => u.id === paramMap.get('userId'))?.name)
      });

      this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  userName = computed(() => this.usersService.users.find(u => u.id === this.userId())?.name)
}
