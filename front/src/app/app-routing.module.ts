import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AplicacionComponent } from './aplicacion/aplicacion.component';
import { SesionGuard } from './guards/session.guard';
const routes: Routes = [
	{
		path: 'app',
		component: AplicacionComponent,
		children: [
			{
				path: 'home',
				loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
				canActivate: [SesionGuard]
			},
			{
				path: 'contact',
				loadChildren: () => import ('./contacto/contacto.module').then(m => m.ContactoModule),
				canActivate: [SesionGuard]
			},
			{
				path: 'list',
				loadChildren: () => import ('./lista/lista.module').then(m => m.ListaModule),
				canActivate: [SesionGuard]
			},
			{
				path: 'details',
				loadChildren: () => import ('./details/details.module').then(m => m.DetailsModule),
				canActivate: [SesionGuard]
			}

		]
	},


	{
		path: '',
		loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
	},
	{
		path: '**',
		loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})


export class AppRoutingModule { }
